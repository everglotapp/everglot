import { getCurrentUser } from "../users"
import { endGroupActivity, getGroupActivity } from "./utils"
import {
    GroupActivity,
    GroupActivityKind,
    WouldYouRatherState,
} from "../../../types/activities"
import type {
    ChineseWouldYouRatherQuestion,
    EnglishWouldYouRatherQuestion,
    GermanWouldYouRatherQuestion,
    Group,
} from "../../../types/generated/graphql"
import {
    WouldYouRatherLocale,
    WOULD_YOU_RATHER_LOCALES,
} from "../../../constants"
import type { Server as SocketIO } from "socket.io"

import { db } from "../../db"

import log from "../../../logger"
import { bots } from ".."
import type { ChatUser } from "../../../types/chat"
import { getGroupLanguageByUuid } from "../../groups"

const chlog = log.child({
    namespace: "would-you-rather",
})

export const games: Record<string, WouldYouRatherGame> = {} as const
let endActivityTimeout: NodeJS.Timeout | null = null

type WouldYouRatherQuestion =
    | EnglishWouldYouRatherQuestion
    | GermanWouldYouRatherQuestion
    | ChineseWouldYouRatherQuestion

async function getRandomQuestion(
    language: WouldYouRatherLocale
): Promise<Pick<
    WouldYouRatherQuestion,
    "uuid" | "question" | "answers"
> | null> {
    const res = await db?.query<
        Pick<WouldYouRatherQuestion, "uuid" | "question" | "answers">
    >(
        `
    select uuid, question, answers from(
        select * from app_public.would_you_rather_questions_${language}
        where true
        order by random()
    ) wd limit 1
    `,
        []
    )
    if (!res || res.rowCount !== 1) {
        chlog
            .child({ language })
            .error(
                "Failed to fetch a random Would You Rather question from database"
            )
        return null
    }
    return res.rows[0]
}

export class WouldYouRatherGame {
    #language: WouldYouRatherLocale
    endTime: Date | undefined
    question:
        | Pick<WouldYouRatherQuestion, "uuid" | "question" | "answers">
        | undefined
    #picks: Record<string, number> = {}

    constructor(language: WouldYouRatherLocale) {
        this.#language = language
    }

    async start(): Promise<boolean> {
        const question = await getRandomQuestion(this.#language)
        if (!question) {
            return false
        }
        this.question = question
        this.endTime = new Date(Date.now() + 30000)
        return true
    }

    get over(): boolean {
        return new Date() > this.endTime!
    }

    pickAnswer(userUuid: string, answerIndex: number): string | null {
        chlog
            .child({
                userUuid,
                answerIndex,
                question: this.question,
                picks: this.#picks,
                answers: this.question?.answers || "unknown",
            })
            .trace("User tried to pick an answer")
        if (!this.question) {
            return null
        }
        if (answerIndex < 0 || answerIndex >= this.question.answers.length) {
            return null
        }
        if (this.#picks.hasOwnProperty(userUuid)) {
            return null
        }
        this.#picks[userUuid] = answerIndex
        return this.question.answers[answerIndex]
    }

    get publicState(): WouldYouRatherState {
        return {
            endTime: this.endTime?.toISOString() || null,
            question: this.question ? this.question.question : null,
            answers: this.question
                ? this.question.answers.map((answer) => answer!)
                : null,
        }
    }
}

export async function handleUserConnected(
    io: SocketIO,
    socket: EverglotChatSocket
) {
    socket.on(
        "groupActivity.wouldYouRatherAnswer",
        async ({ answerIndex }: { answerIndex: number }) => {
            const chatUser = getCurrentUser(socket)
            if (!chatUser) {
                chlog
                    .child({ socketId: socket.id, answerIndex })
                    .debug(
                        "User trying to pick an answer in Would You Rather not found"
                    )
                return
            }
            const activity = getGroupActivity(chatUser.groupUuid)
            if (!activity) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        answerIndex,
                    })
                    .debug(
                        "User tried to pick an answer in Would You Rather but no activity is running for their group"
                    )
                return
            }
            if (activity.kind !== GroupActivityKind.WouldYouRather) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        answerIndex,
                    })
                    .debug(
                        "User tried to pick an answer in Would You Rather but current group activity is not Would You Rather"
                    )
                return
            }
            const game = games[chatUser.groupUuid]!
            if (game.over) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        questionUuid: game.question?.uuid || null,
                        answerIndex,
                    })
                    .debug(
                        "User tried to pick an answer in Would You Rather but game is over"
                    )
                return
            }
            const answer = game.pickAnswer(chatUser.user.uuid, answerIndex)
            if (!answer) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        questionUuid: game.question?.uuid || null,
                        answerIndex,
                    })
                    .debug(
                        "User tried to pick an answer in Would You Rather but answer was invalid"
                    )
                return
            }
            // Tell group users about the guess and whether it was successful.
            io.to(chatUser.groupUuid).emit(
                "groupActivity.wouldYouRatherAnswer",
                {
                    answerIndex,
                    userUuid: chatUser.user.uuid,
                }
            )

            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                    userUuid: chatUser.user.uuid,
                    questionUuid: game.question?.uuid || null,
                    answerIndex,
                })
                .debug("User picked an answer in Would You Rather")
            const bot = bots[chatUser.groupUuid]
            if (!bot) {
                return
            }
            await bot.send("would-you-rather-answer-picked", {
                username: chatUser.user.username || "?",
                answer,
            })
        }
    )
}

export async function handleStarted(
    io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    const game = games[groupUuid]
    if (endActivityTimeout) {
        clearTimeout(endActivityTimeout)
        endActivityTimeout = setTimeout(() => {
            delete games[groupUuid]
            const endedActivity = endGroupActivity(groupUuid)
            if (
                endedActivity &&
                endedActivity.kind === GroupActivityKind.WouldYouRather
            ) {
                if (games.hasOwnProperty(groupUuid)) {
                    delete games[groupUuid]
                }
            }
            io.to(groupUuid).emit("groupActivity", getGroupActivity(groupUuid))
        }, game.endTime?.getTime()! - Date.now())
    }
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("would-you-rather-started", {
            username: chatUser.user.username || "?",
            question: game.question!.question,
        })
    }
}

export async function handleEnded(
    _io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("would-you-rather-ended", {
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
    if (!WOULD_YOU_RATHER_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support Would You Rather")
        return null
    }
    const game = (games[groupUuid] ||= new WouldYouRatherGame(
        alpha2 as WouldYouRatherLocale
    ))
    if (!(await game.start())) {
        end(groupUuid)
        return null
    }
    return {
        kind: GroupActivityKind.WouldYouRather,
        state: game.publicState,
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
