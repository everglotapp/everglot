import { validate as uuidValidate } from "uuid"

import { serverError, unprocessableEntity } from "../../../../helpers"

import log from "../../../../logger"

import type { Request, Response } from "express"
import {
    getPostGameByUuid,
    createPostGameAnswer,
    currentUserHasAnsweredOrRevealedPostGame,
} from "../../../../server/posts"
import {
    PostGame,
    PostGameRange,
    PostGameType,
} from "../../../../types/generated/graphql"
import type { PostGameAnswerPayload } from "../../../../types/posts"

const chlog = log.child({
    namespace: "posts-uuid-answers-create",
})

const MAX_CLOZE_ANSWER_LENGTH = 128

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        chlog.child({ userId }).error("userId unexpectedly falsy")
        throw new Error(
            "No user ID set for protected route. Are we really protected?"
        )
    }
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ userId, uuid }).debug("Invalid UUID")
        next()
        return
    }

    const answers = req.body["answers"]
    if (!Array.isArray(answers)) {
        chlog.child({ userId, uuid, answers }).debug("Answers is not an array")
        unprocessableEntity(res, "Invalid answers, must be an array")
        return
    }
    for (const answer of answers as unknown[]) {
        if (
            typeof answer !== "object" ||
            !(answer as object).hasOwnProperty("rangeUuid") ||
            typeof (answer as PostGameAnswerPayload).rangeUuid !== "string" ||
            !uuidValidate((answer as PostGameAnswerPayload).rangeUuid)
        ) {
            chlog
                .child({
                    userId,
                    uuid,
                    answers,
                })
                .debug(
                    "Invalid answer, needs to be an object with a valid range UUID"
                )
            unprocessableEntity(res, "Invalid answer")
            return
        }
    }

    const game = await getPostGameByUuid(uuid)
    if (!game || !game.post) {
        chlog.child({ userId, uuid }).debug("Did not find post game by UUID")
        next()
        return
    }
    if (game.post.authorId === userId) {
        chlog
            .child({ userId, uuid, game })
            .debug("User tried to answer their own post game")
        unprocessableEntity(res, "You cannot answer your own game")
        return
    }
    if (await currentUserHasAnsweredOrRevealedPostGame({ gameId: game.id })) {
        chlog
            .child({ userId, uuid, game })
            .debug("User has already answered or revealed game")
        unprocessableEntity(
            res,
            "You have already answered this game or revealed the answers"
        )
        return
    }
    const ranges = game.ranges.nodes?.filter(Boolean).map((node) => node!) || []
    // TODO: Limit amount of ranges
    const validRangeUuids = ranges.map((range) => range.uuid)
    for (const answer of answers as PostGameAnswerPayload[]) {
        if (!validRangeUuids.includes(answer.rangeUuid)) {
            chlog
                .child({
                    userId,
                    uuid,
                    answers,
                    validRangeUuids,
                    answer,
                    game,
                })
                .debug("Invalid answer, contains UUID of invalid range")
            unprocessableEntity(res, "Invalid answer")
            return
        }
    }

    if (!game.post.language) {
        chlog
            .child({
                userId,
                uuid,
                answers,
                validRangeUuids,
                game,
            })
            .debug("Game's post does not have a language")
        serverError(res)
        return
    }

    let createdAnswers = []
    if (answers.length === 0) {
        // Let user reveal answers for entire game and remember that in one row.
        const createdAnswer = await createPostGameAnswer({
            userId,
            rangeId: null,
            gameId: game.id,
            correct: null,
            caseOption: null,
            genderOption: null,
            clozeAnswer: null,
        })
        if (!createdAnswer) {
            serverError(res)
            // TODO: Remove previous answers
            return
        }
        createdAnswers.push(createdAnswer)
    } else {
        for (const answer of answers as PostGameAnswerPayload[]) {
            const range = ranges.find(
                (range) => range.uuid === answer.rangeUuid
            )!
            const correct = isAnswerCorrect(answer, range, game)
            const createdAnswer = await createPostGameAnswer({
                userId,
                rangeId: range.id,
                gameId: null,
                correct,
                caseOption:
                    game.gameType === PostGameType.GuessCase
                        ? answer.caseOption
                        : null,
                genderOption:
                    game.gameType === PostGameType.GuessGender
                        ? answer.genderOption
                        : null,
                clozeAnswer:
                    game.gameType === PostGameType.Cloze &&
                    typeof answer.clozeAnswer === "string" &&
                    answer.clozeAnswer.length <= MAX_CLOZE_ANSWER_LENGTH
                        ? answer.clozeAnswer
                        : null,
            })
            if (!createdAnswer) {
                serverError(res)
                // TODO: Remove previous answers
                return
            }
            createdAnswers.push(createdAnswer)
        }
    }

    log.child({ game, userId, createdAnswers }).debug(
        "Successfully saved new post game answers"
    )
    res.status(200).json({
        success: true,
    })
}

function isAnswerCorrect(
    answer: PostGameAnswerPayload,
    range: Pick<PostGameRange, "uuid" | "id" | "caseOption" | "genderOption">,
    game: Pick<PostGame, "gameType" | "correctAnswers" | "post">
): boolean | null {
    const correctAnswer = game.correctAnswers.nodes.find(
        (answer) => answer !== null && answer.rangeUuid === range.uuid
    )
    if (!correctAnswer) {
        return null
    }
    if (game.gameType === PostGameType.GuessCase) {
        return correctAnswer.caseOption === answer.caseOption
    } else if (game.gameType === PostGameType.GuessGender) {
        return correctAnswer.genderOption === answer.genderOption
    } else if (game.gameType === PostGameType.Cloze) {
        if (!game.post || !game.post.language) {
            return null
        }
        if (
            !correctAnswer.clozeAnswer ||
            !answer.clozeAnswer ||
            typeof answer.clozeAnswer !== "string"
        ) {
            return false
        }
        return (
            answer.clozeAnswer.toLocaleLowerCase(game.post.language.alpha2) ===
            correctAnswer.clozeAnswer.toLocaleLowerCase(
                game.post.language.alpha2
            )
        )
    }
    return null
}
