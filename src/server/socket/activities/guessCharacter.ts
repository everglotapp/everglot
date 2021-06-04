import {
    GuessCharacterLocale,
    GUESS_CHARACTER_LOCALES,
} from "../../../constants"
import { getCurrentUser } from "../users"
import {
    GroupActivity,
    GroupActivityKind,
    GuessCharacterState,
} from "../../../types/activities"

import { db } from "../../db"

import log from "../../../logger"
import { getGroupActivity } from "./utils"
import { isChineseCharacter } from "../../../utils"
import type {
    ChineseGuessCharacterQuestion,
    Group,
} from "../../../types/generated/graphql"
import type { Server as SocketIO } from "socket.io"
import { bots } from ".."
import type { ChatUser } from "../../../types/chat"
import { getGroupLanguageByUuid } from "../../groups"

const chlog = log.child({
    namespace: "guess-character",
})

type GuessCharacterQuestion = ChineseGuessCharacterQuestion

export const games: Record<Group["uuid"], GuessCharacterGame> = {} as const

async function getRandomCharacter(
    language: GuessCharacterLocale
): Promise<Pick<GuessCharacterQuestion, "character" | "hint"> | null> {
    const res = await db?.query<
        Pick<GuessCharacterQuestion, "character" | "hint">
    >(
        `
    select character, hint from(
        select * from app_public.guess_character_questions_${language}
        order by random()
    ) wd limit 1
    `
    )
    if (!res || res.rowCount !== 1) {
        return null
    }
    return res.rows[0]
}

const MAX_WRONG_CHARACTERS = 5

export class GuessCharacterGame {
    #language: GuessCharacterLocale
    #pickedCharacters: string[] = []
    #character: string | undefined
    #hint: string | undefined
    #wrongCharacters = 0
    #started = false

    constructor(language: GuessCharacterLocale) {
        this.#language = language
    }

    async start(): Promise<boolean> {
        const res = await getRandomCharacter(this.#language)
        if (!res) {
            return false
        }
        const { character, hint } = res
        this.#character = character
        this.#hint = hint
        this.#started = true
        return true
    }

    guessValid(guess: string): boolean {
        if (guess.length !== 1) {
            return false
        }
        return !this.characterPicked(guess) && this.characterAvailable(guess)
    }

    processGuess(guess: string): boolean {
        if (guess === this.#character!) {
            if (!this.#pickedCharacters.includes(guess)) {
                this.#pickedCharacters.push(guess)
            }
            return true
        }
        if (!this.#pickedCharacters.includes(guess)) {
            this.#pickedCharacters.push(guess)
        }
        this.#wrongCharacters += 1
        return false
    }

    characterPicked(c: string): boolean {
        return this.#pickedCharacters.includes(c)
    }

    characterAvailable(c: string): boolean {
        return isChineseCharacter(c)
    }

    get over(): boolean {
        if (!this.#started) {
            return false
        }

        if (this.#wrongCharacters > MAX_WRONG_CHARACTERS) {
            return true
        }

        if (this.#pickedCharacters.includes(this.#character!)) {
            chlog
                .child({ character: this.#character })
                .trace(
                    "Guess Character round completed successfully, the word has been guessed"
                )
            return true
        }

        return false
    }

    async nextRound(): Promise<boolean> {
        if (!this.over) {
            return false
        }
        chlog.trace("Starting new Guess Character round")
        const res = await getRandomCharacter(this.#language)
        if (!res) {
            return false
        }
        this.reset(res)
        return true
    }

    reset(q: Pick<GuessCharacterQuestion, "hint" | "character">): void {
        this.#character = q.character
        this.#hint = q.hint
        this.#pickedCharacters = []
        this.#wrongCharacters = 0
    }

    get publicState(): GuessCharacterState {
        return {
            over: this.over,
            hint: this.#hint || null,
            pickedCharacters: this.#pickedCharacters,
            solution: this.over ? this.#character || null : null,
        }
    }
}

export async function handleUserConnected(
    io: SocketIO,
    socket: EverglotChatSocket
) {
    socket.on(
        "groupActivity.guessCharacterGuess",
        async ({ guess }: { guess: string }) => {
            const chatUser = getCurrentUser(socket)
            if (!chatUser) {
                chlog
                    .child({ socketId: socket.id, guess })
                    .debug("User trying to guess in Guess Character not found")
                return
            }
            const activity = getGroupActivity(chatUser.groupUuid)
            if (!activity) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                    })
                    .debug(
                        "User attempted Guess Character guess but no activity is running for their group"
                    )
                return
            }
            if (activity.kind !== GroupActivityKind.GuessCharacter) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        guess,
                    })
                    .debug(
                        "User attempted Guess Character guess but current group activity is not Guess Character"
                    )
                return
            }
            const game = games[chatUser.groupUuid]!
            if (typeof guess !== "string") {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        guess,
                    })
                    .debug(
                        "User attempted Guess Character guess with a non-string guess"
                    )
                return
            }
            if (!game.guessValid(guess)) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        guess,
                    })
                    .debug(
                        "User attempted Guess Character guess but guess was invalid"
                    )
                return
            }
            const success = game.processGuess(guess)
            // Tell group users about the guess and whether it was successful.
            io.to(chatUser.groupUuid).emit(
                "groupActivity.guessCharacterGuess",
                {
                    guess,
                    success,
                    userUuid: chatUser.user.uuid,
                }
            )

            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                    userUuid: chatUser.user.uuid,
                    guess,
                    success,
                })
                .trace("User attempted Guess Character guess")
            // Tell group users about the new game state.
            io.to(chatUser.groupUuid).emit(
                "groupActivity",
                getGroupActivity(chatUser.groupUuid)
            )
            setTimeout(async () => {
                if (await game.nextRound()) {
                    chlog
                        .child({
                            groupUuid: chatUser.groupUuid,
                            userUuid: chatUser.user.uuid,
                        })
                        .debug("Guess Character game proceeded to next round")
                    io.to(chatUser.groupUuid).emit(
                        "groupActivity",
                        getGroupActivity(chatUser.groupUuid)
                    )
                }
            }, 6000)
        }
    )
}

export async function handleStarted(
    _io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("guess-character-started", {
            username: chatUser.user.username || "?",
        })
    }
}

export async function handleEnded(
    _io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    delete games[groupUuid]
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("guess-character-ended", {
            username: chatUser.user.username || "?",
        })
    }
}

export const getPublicState = (groupUuid: Group["uuid"]) =>
    games[groupUuid].publicState

export async function start(groupUuid: Group["uuid"]) {
    const group = await getGroupLanguageByUuid(groupUuid)
    if (!group || !group.groupByUuid?.language?.alpha2) {
        chlog
            .child({
                groupUuid,
            })
            .debug("Group not found")
        return null
    }
    const alpha2 = group.groupByUuid?.language?.alpha2
    if (!GUESS_CHARACTER_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support Guess Character")
        return null
    }
    const game = (games[groupUuid] ||= new GuessCharacterGame(
        alpha2 as GuessCharacterLocale
    ))
    if (!(await game.start())) {
        end(groupUuid)
        return null
    }
    return {
        kind: GroupActivityKind.GuessCharacter,
        state: game.publicState,
    }
}

const end = (groupUuid: Group["uuid"]) => delete games[groupUuid]

export default {
    handleStarted,
    handleEnded,
    handleUserConnected,
    getPublicState,
    start,
}
