import type { WouldYouRatherLocale } from "../../../constants"
import type { WouldYouRatherState } from "../../../types/activities"
import type {
    ChineseWouldYouRatherQuestion,
    EnglishWouldYouRatherQuestion,
    GermanWouldYouRatherQuestion,
} from "../../../types/generated/graphql"

import { db } from "../../db"

import log from "../../../logger"

const chlog = log.child({
    namespace: "would-you-rather",
})

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
