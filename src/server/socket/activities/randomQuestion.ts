import type {
    GroupActivity,
    RandomQuestionState,
} from "../../../types/activities"
import type {
    ChineseRandomQuestion,
    EnglishRandomQuestion,
    GermanRandomQuestion,
    Group,
} from "../../../types/generated/graphql"
import type {
    RandomQuestionLocale,
    WouldYouRatherLocale,
} from "../../../constants"
import type { Server as SocketIO } from "socket.io"

import { db } from "../../db"

import log from "../../../logger"
import { bots } from ".."
import type { ChatUser } from "../../../types/chat"

const chlog = log.child({
    namespace: "would-you-rather",
})

export const games: Record<Group["uuid"], RandomQuestionGame> = {} as const

type RandomQuestion =
    | EnglishRandomQuestion
    | GermanRandomQuestion
    | ChineseRandomQuestion

async function getRandomQuestion(
    language: WouldYouRatherLocale
): Promise<Pick<RandomQuestion, "uuid" | "question"> | null> {
    const res = await db?.query<Pick<RandomQuestion, "uuid" | "question">>(
        `
    select uuid, question from(
        select * from app_public.random_questions_${language}
        where true
        order by random()
    ) wd limit 1
    `,
        []
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
    const bot = bots[groupUuid]
    if (bot) {
        await bot.send("random-question-ended", {
            username: chatUser.user.username || "?",
        })
    }
}

export const getPublicState = (groupUuid: Group["uuid"]) =>
    games[groupUuid].publicState

export default {
    handleStarted,
    handleEnded,
    getPublicState,
}
