import { ALPHABET, HANGMAN_LOCALES } from "../../../constants"
import type { HangmanLocale } from "../../../constants"
import { getCurrentUser } from "../users"
import {
    GroupActivity,
    GroupActivityKind,
    HangmanState,
} from "../../../types/activities"

import { DATABASE_SCHEMA, db } from "../../db"

import log from "../../../logger"
import { getGroupActivity } from "./utils"
import type { Server as SocketIO } from "socket.io"
import { bots } from ".."
import type { ChatUser } from "../../../types/chat"
import { getGroupLanguageByUuid } from "../../groups"

const chlog = log.child({
    namespace: "hangman",
})

export const games: Record<string, HangmanGame> = {} as const

const MIN_WORD_LENGTH = 3
const MAX_WORD_LENGTH = 11
async function getRandomWord(language: HangmanLocale): Promise<string | null> {
    const res = await db?.query<{ word: string }>(
        `
    select word from(
        select * from ${DATABASE_SCHEMA}.words_${language}
        where length >= $1
        and length <= $2
        order by random()
    ) wd limit 1
    `,
        [MIN_WORD_LENGTH, MAX_WORD_LENGTH]
    )
    if (!res || res.rowCount !== 1) {
        return null
    }
    return res.rows[0].word
}

const MAX_WRONG_LETTERS = 5
const MAX_WRONG_WORDS = 0

export class HangmanGame {
    #language: HangmanLocale
    #pickedLetters: string[] = []
    #availableLetters: string[] = []
    #pickedWords: string[] = []
    #word: string | undefined
    #wrongLetters = 0
    #wrongWords = 0
    #started = false

    constructor(language: HangmanLocale) {
        this.#language = language
        this.#availableLetters = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    async start(): Promise<boolean> {
        const word = await getRandomWord(this.#language)
        if (!word) {
            return false
        }
        this.#word = word
        this.#started = true
        return true
    }

    guessValid(guess: string): boolean {
        if (guess.length > 50 || guess.length < 1) {
            return false
        }
        if (guess.length === 1) {
            return !this.letterPicked(guess) && this.letterAvailable(guess)
        }
        return guess
            .split("")
            .every((character) => ALPHABET[this.#language].includes(character))
    }

    processGuess(guess: string): boolean {
        if (guess.length === 1) {
            return this.pickLetter(guess)
        }
        const lowerGuess = guess.toLowerCase()
        if (lowerGuess === this.#word!.toLowerCase()) {
            if (!this.#pickedWords.includes(lowerGuess)) {
                this.#pickedWords.push(lowerGuess)
            }
            return true
        }
        if (!this.#pickedWords.includes(lowerGuess)) {
            this.#pickedWords.push(lowerGuess)
        }
        this.#wrongWords += 1
        return false
    }

    letterPicked(l: string): boolean {
        return this.#pickedLetters.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.#availableLetters.includes(l.toLowerCase())
    }

    pickLetter(l: string): boolean {
        if (!this.#started) {
            return false
        }
        this.#pickedLetters.push(l.toLowerCase())
        this.#availableLetters = this.#availableLetters.filter(
            (av: string) => l.toLowerCase() !== av
        )
        const included = this.#word!.includes(l.toLowerCase())
        if (included) {
            return true
        }
        this.#wrongLetters += 1
        return false
    }

    get over(): boolean {
        if (!this.#started) {
            return false
        }

        if (this.#wrongLetters > MAX_WRONG_LETTERS) {
            return true
        }

        if (this.#wrongWords > MAX_WRONG_WORDS) {
            return true
        }

        if (this.#pickedWords.includes(this.#word!.toLowerCase())) {
            chlog
                .child({ word: this.#word })
                .trace(
                    "Hangman round completed successfully, the word has been guessed"
                )
            return true
        }
        // Game is not over as long as there are missing letters in the word
        for (let i = 0; i < this.#word!.length; ++i) {
            if (!this.#pickedLetters.includes(this.#word![i].toLowerCase())) {
                return false
            }
        }
        chlog
            .child({ word: this.#word })
            .trace(
                "Hangman round completed successfully, all letters have been guessed"
            )
        return true
    }

    async nextRound(): Promise<boolean> {
        if (!this.over) {
            return false
        }
        chlog.trace("Starting new hangman round")
        const word = await getRandomWord(this.#language)
        if (!word) {
            return false
        }
        this.reset(word)
        return true
    }

    reset(newWord: string): void {
        this.#word = newWord
        this.#pickedLetters = []
        this.#pickedWords = []
        this.#availableLetters = ALPHABET[this.#language].filter(
            (l: string) => l === l.toLowerCase()
        )
        this.#wrongLetters = 0
        this.#wrongWords = 0
    }

    get publicState(): HangmanState {
        return {
            over: this.over,
            currentWord: this.currentWord,
            pickedLetters: this.#pickedLetters,
            pickedWords: this.#pickedWords,
            solution: this.over ? this.#word || null : null,
        }
    }

    get currentWord(): (string | null)[] {
        let result = []
        if (!this.#started) {
            return []
        }
        for (let i = 0; i < this.#word!.length; ++i) {
            const letter = this.#word![i]
            result.push(
                this.#pickedLetters.includes(letter.toLowerCase())
                    ? letter
                    : null
            )
        }
        return result
    }
}

export async function handleUserConnected(
    io: SocketIO,
    socket: EverglotChatSocket
) {
    socket.on(
        "groupActivity.hangmanGuess",
        async ({ guess }: { guess: string }) => {
            const chatUser = getCurrentUser(socket)
            if (!chatUser) {
                chlog
                    .child({ socketId: socket.id, guess })
                    .debug("User trying to guess in hangman not found")
                return
            }
            const {
                groupUuid,
                user: { uuid: userUuid },
            } = chatUser
            const activity = getGroupActivity(groupUuid)
            if (!activity) {
                chlog
                    .child({
                        groupUuid,
                        userUuid,
                    })
                    .debug(
                        "User attempted hangman guess but no activity is running for their group"
                    )
                return
            }
            if (activity.kind !== GroupActivityKind.Hangman) {
                chlog
                    .child({
                        groupUuid,
                        userUuid,
                        guess,
                    })
                    .debug(
                        "User attempted hangman guess but current group activity is not hangman"
                    )
                return
            }
            const game = games[groupUuid]!
            if (typeof guess !== "string") {
                chlog
                    .child({
                        groupUuid,
                        userUuid,
                        guess,
                    })
                    .debug(
                        "User attempted hangman guess with a non-string guess"
                    )
                return
            }
            if (!game.guessValid(guess)) {
                chlog
                    .child({
                        groupUuid,
                        userUuid,
                        guess,
                    })
                    .debug("User attempted hangman guess but guess was invalid")
                return
            }
            const success = game.processGuess(guess)
            await handleGuessProcessed(
                io,
                guess,
                success,
                game,
                groupUuid,
                userUuid
            )
        }
    )
}

const DELAY_NEXT_ROUND_MS = 5000
async function handleGuessProcessed(
    io: SocketIO,
    guess: string,
    success: boolean,
    game: HangmanGame,
    groupUuid: string,
    userUuid: string
) {
    // Tell group users about the guess and whether it was successful.
    io.to(groupUuid).emit("groupActivity.hangmanGuess", {
        guess,
        success,
        userUuid,
    })

    chlog
        .child({
            groupUuid,
            userUuid,
            guess,
            success,
        })
        .trace("User attempted hangman guess")
    // Tell group users about the new game state.
    io.to(groupUuid).emit("groupActivity", getGroupActivity(groupUuid))
    if (await game.nextRound()) {
        await new Promise((resolve) => setTimeout(resolve, DELAY_NEXT_ROUND_MS))
        chlog
            .child({
                groupUuid,
                userUuid,
            })
            .debug("Hangman game proceeded to next round")
        io.to(groupUuid).emit("groupActivity", getGroupActivity(groupUuid))
    }
}

export async function handleStarted(
    _io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("hangman-started", {
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
    end(groupUuid)
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("hangman-ended", {
            username: chatUser.user.username || "?",
        })
    }
}

export const getPublicState = (groupUuid: string) =>
    games[groupUuid].publicState

export async function start(groupUuid: string) {
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
    if (!HANGMAN_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support hangman")
        return null
    }
    const game = (games[groupUuid] ||= new HangmanGame(alpha2 as HangmanLocale))
    if (!(await game.start())) {
        end(groupUuid)
        return null
    }
    return {
        kind: GroupActivityKind.Hangman,
        state: game.publicState,
        groupUuid,
    }
}

const end = (groupUuid: string) => delete games[groupUuid]

export default {
    handleStarted,
    handleEnded,
    handleUserConnected,
    getPublicState,
    start,
}
