import {
    GroupActivity,
    GroupActivityKind,
    RandomQuestionState,
} from "../../../types/activities"
import type {
    ChineseRandomQuestion,
    EnglishRandomQuestion,
    GermanRandomQuestion,
} from "../../../types/generated/graphql"
import {
    RandomQuestionLocale,
    RANDOM_QUESTION_LOCALES,
    WouldYouRatherLocale,
} from "../../../constants"
import type { Server as SocketIO } from "socket.io"

import { db } from "../../db"

import log from "../../../logger"
import { bots } from ".."
import type { ChatUser } from "../../../types/chat"
import { getGroupLanguageByUuid } from "../../groups"
import { getCurrentUser } from "../users"
import { getGroupActivity } from "./utils"

const chlog = log.child({
    namespace: "would-you-rather",
})

export const games: Record<string, RandomQuestionGame> = {} as const

type RandomQuestion =
    | EnglishRandomQuestion
    | GermanRandomQuestion
    | ChineseRandomQuestion

async function getRandomQuestion(
    language: WouldYouRatherLocale,
    excludeUuids?: string[]
): Promise<Pick<RandomQuestion, "uuid" | "question"> | null> {
    const res = await db?.query<Pick<RandomQuestion, "uuid" | "question">>(
        `
    select uuid, question from(
        select * from app_public.random_questions_${language}
        where true
        and not(uuid = any($1))
        order by random()
    ) wd limit 1
    `,
        [excludeUuids || []]
    )
    if (!res || res.rowCount !== 1) {
        chlog
            .child({ language })
            .error("Failed to fetch a random question from database")
        return null
    }
    return res.rows[0]
}

export class RandomQuestionGame {
    #language: RandomQuestionLocale
    question: Pick<RandomQuestion, "uuid" | "question"> | undefined

    constructor(language: RandomQuestionLocale) {
        this.#language = language
    }

    async start(): Promise<boolean> {
        const question = await getRandomQuestion(this.#language)
        if (!question) {
            return false
        }
        this.question = question
        return true
    }

    get publicState(): RandomQuestionState {
        return {
            question: this.question ? this.question.question : null,
        }
    }

    async nextQuestion(): Promise<boolean> {
        const question = await getRandomQuestion(
            this.#language,
            this.question ? [this.question.uuid] : []
        )
        if (!question) {
            return false
        }
        this.question = question
        return true
    }
}

export async function handleUserConnected(
    io: SocketIO,
    socket: EverglotChatSocket
) {
    socket.on("groupActivity.randomQuestionNextQuestion", async () => {
        const chatUser = getCurrentUser(socket)
        if (!chatUser) {
            chlog
                .child({ socketId: socket.id })
                .debug("User trying to get next Random Question not found")
            return
        }
        const { groupUuid } = chatUser
        const activity = getGroupActivity(groupUuid)
        if (!activity) {
            chlog
                .child({
                    groupUuid,
                    userUuid: chatUser.user.uuid,
                })
                .debug(
                    "User tried to get next Random Question but no activity is running for their group"
                )
            return
        }
        if (activity.kind !== GroupActivityKind.RandomQuestion) {
            chlog
                .child({
                    groupUuid,
                    userUuid: chatUser.user.uuid,
                })
                .debug(
                    "User tried to get next Random Question but current group activity is not Random Question"
                )
            return
        }
        const game = games[groupUuid]!
        if (game) {
            if (await game.nextQuestion()) {
                const bot = bots[groupUuid]
                if (bot) {
                    await bot.send("random-question-started", {
                        username: chatUser.user.username || "?",
                        question: game.question!.question,
                    })
                }
                io.to(groupUuid).emit(
                    "groupActivity",
                    getGroupActivity(groupUuid)
                )
            }
        }
    })
}

export async function handleStarted(
    _io: SocketIO,
    chatUser: ChatUser,
    _activity: GroupActivity
) {
    const { groupUuid } = chatUser
    const game = games[groupUuid]
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("random-question-started", {
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
    end(groupUuid)
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("random-question-ended", {
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
    if (!RANDOM_QUESTION_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support Random Question activity")
        return null
    }
    const game = (games[groupUuid] ||= new RandomQuestionGame(
        alpha2 as RandomQuestionLocale
    ))
    if (!(await game.start())) {
        end(groupUuid)
        return null
    }
    return {
        kind: GroupActivityKind.RandomQuestion,
        state: game.publicState,
        groupUuid,
    }
}

const end = (groupUuid: string) => delete games[groupUuid]

export default {
    handleUserConnected,
    handleStarted,
    handleEnded,
    getPublicState,
    start,
}
