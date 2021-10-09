import { validate as uuidValidate } from "uuid"

import log from "../../logger"
import { unprocessableEntity, forbidden } from "../../helpers"

const chlog = log.child({
    namespace: "posts-create",
})

import type { Request, Response } from "express"
import {
    createPost,
    createPostGame,
    createPostGameRange,
    getPostIdByUuid,
} from "../../server/posts"
import { getLanguageIdByAlpha2 } from "../../server/locales"
import {
    AVAILABLE_POST_GAME_TYPES,
    GuessCaseLocale,
    GuessCaseRange,
    GuessGenderLocale,
    GuessGenderRange,
    GUESS_CASE_OPTIONS,
    GUESS_GENDER_OPTIONS,
    PostGameRange,
    SUPPORTED_LOCALES,
} from "../../constants"
import { getPromptIdByUuid } from "../../server/prompts"
import { getPostReplyNotification } from "../../server/notifications/posts"
import { enqueueFcmNotification } from "../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../server/notifications/params"
import { userHasCompletedProfile } from "../../server/users"
import { FcmMessageParamsDataTypeV1 } from "../../server/notifications/params/v1"

import {
    GrammaticalCase,
    GrammaticalGender,
    PostGameType,
} from "../../types/generated/graphql"

const MAX_BODY_LENGTH = 2048

const REPLY_NOTIFICATION_EXPIRY_SECONDS = 60 * 60

export async function notifyOriginalAuthorAfterReply(
    post: {
        id: number
        body: string
        createdAt: any
        uuid: any
        nodeId: string
    },
    currentUserId: number
) {
    const notificationData = await getPostReplyNotification(post.id)
    if (!notificationData) {
        chlog.child({ post }).error("No notification data for post reply")
        return
    }
    const { body, parentPost, author } = notificationData
    if (!parentPost || !parentPost.authorId || !author) {
        chlog.child({ post }).error("Missing notification data for post reply")
        return
    }
    if (parentPost.authorId === currentUserId) {
        // Don't notify if the author replies to their own post.
        return
    }
    const expiresAt = new Date(
        Date.now() + REPLY_NOTIFICATION_EXPIRY_SECONDS * 1000
    )
    const withheldUntil = null
    const username =
        author.displayName && author.displayName.length
            ? author.displayName
            : author.username
    enqueueFcmNotification(
        { userId: parentPost.authorId, groupId: null },
        expiresAt,
        withheldUntil,
        {
            message: {
                notification: {
                    title: `${
                        username && username.length ? username : "Someone"
                    } has replied to your post`,
                    body: `${body.substr(0, 64)}`,
                },
                data: {
                    type: FcmMessageParamsDataTypeV1.PostReply,
                },
            },
            version: NotificationParamsVersion.V1,
        }
    )
}

function sanitizeBody(body: string) {
    return body.trim().substr(0, MAX_BODY_LENGTH)
}

export async function post(req: Request, res: Response, _next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    if (!(await userHasCompletedProfile(userId))) {
        forbidden(res, "Please complete your profile")
        return
    }
    const unsanitizedBody = req.body["body"]
    if (!unsanitizedBody || !unsanitizedBody.length) {
        chlog.child({ userId }).debug("Empty body before sanitization")
        unprocessableEntity(res, "Body must not be empty")
        return
    }
    const body = sanitizeBody(unsanitizedBody)
    if (!body.length) {
        chlog
            .child({ userId, unsanitizedBody })
            .debug("Empty body after sanitization")
        unprocessableEntity(res, "Body must not be empty")
        return
    }
    const locale = req.body["locale"]
    if (!locale || typeof locale !== "string") {
        chlog.child({ userId, body, locale }).debug("Empty locale")
        unprocessableEntity(res, "Locale must not be empty")
        return
    }
    if (!(SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
        chlog.child({ userId, body, locale }).debug("Unsupported locale")
        unprocessableEntity(res, "Locale is not supported")
        return
    }
    const languageId = await getLanguageIdByAlpha2(locale)
    if (!languageId) {
        chlog.child({ userId, body, locale }).debug("Unknown locale")
        unprocessableEntity(res, "Locale is not supported")
        return
    }
    let parentPostId: number | null = null
    const parentPostUuid = req.body["parentPostUuid"]
    if (parentPostUuid && typeof parentPostUuid === "string") {
        const postId = await getPostIdByUuid(req.body["parentPostUuid"])
        if (!postId) {
            chlog
                .child({ userId, body, locale, parentPostUuid })
                .debug("Did not find parent post by UUID")
            unprocessableEntity(res, "Did not find parent post")
            return
        }
        parentPostId = postId
    }
    let promptId: number | null = null
    const promptUuid = req.body["promptUuid"]
    if (promptUuid && typeof promptUuid === "string") {
        promptId = await getPromptIdByUuid(req.body["promptUuid"])
        if (!promptId) {
            chlog
                .child({ userId, body, locale, promptUuid })
                .debug("Did not find prompt by UUID")
            unprocessableEntity(res, "Did not find prompt")
            return
        }
    }
    const gameType = req.body["gameType"]
    const ranges = req.body["ranges"]
    // Gamification checks, games will be inserted after the post.
    if (gameType) {
        if (
            typeof gameType !== "string" ||
            !AVAILABLE_POST_GAME_TYPES.includes(gameType as PostGameType)
        ) {
            chlog
                .child({ userId, body, locale, gameType })
                .debug(
                    "Game type is not a string or not among available game types"
                )
            unprocessableEntity(res, "Unknown gameType")
            return
        }
        // TODO: Check that game type is supported for locale
        if (ranges) {
            if (!Array.isArray(ranges)) {
                chlog
                    .child({ userId, body, locale, ranges })
                    .debug("Ranges is not an array")
                unprocessableEntity(res, "Invalid ranges, must be an array")
                return
            }
            for (const range of ranges as unknown[]) {
                if (
                    typeof range !== "object" ||
                    !(range as object).hasOwnProperty("uuid") ||
                    typeof (range as PostGameRange).uuid !== "string" ||
                    !uuidValidate((range as PostGameRange).uuid) ||
                    !(range as object).hasOwnProperty("start") ||
                    !(range as object).hasOwnProperty("end") ||
                    typeof (range as PostGameRange).start !== "number" ||
                    typeof (range as PostGameRange).end !== "number" ||
                    ((range as PostGameRange).start as number) < 0 ||
                    ((range as PostGameRange).end as number) < 0 ||
                    ((range as PostGameRange).start as number) >
                        ((range as PostGameRange).end as number)
                ) {
                    chlog
                        .child({
                            userId,
                            body,
                            locale,
                            gameType,
                            ranges,
                            range,
                        })
                        .debug(
                            "Invalid range, needs to be an object with a start and an end"
                        )
                    unprocessableEntity(res, "Invalid range")
                    return
                }
                // TODO: Make sure none of the ranges overlap or extend beyond the body
                if (gameType === PostGameType.GuessCase) {
                    if (
                        !(range as PostGameRange).hasOwnProperty("option") ||
                        typeof (range as GuessCaseRange).option !== "string" ||
                        !Object.keys(
                            GUESS_CASE_OPTIONS[locale as GuessCaseLocale]
                        ).includes((range as GuessCaseRange).option as string)
                    ) {
                        chlog
                            .child({
                                userId,
                                body,
                                locale,
                                gameType,
                                ranges,
                                range,
                            })
                            .debug(
                                "Invalid range, needs to have a valid option"
                            )
                        unprocessableEntity(res, "Invalid range")
                        return
                    }
                } else if (gameType === PostGameType.GuessGender) {
                    if (
                        !(range as PostGameRange).hasOwnProperty("option") ||
                        typeof (range as GuessGenderRange).option !==
                            "string" ||
                        !Object.keys(
                            GUESS_GENDER_OPTIONS[locale as GuessGenderLocale]
                        ).includes((range as GuessGenderRange).option as string)
                    ) {
                        chlog
                            .child({
                                userId,
                                body,
                                locale,
                                gameType,
                                ranges,
                                range,
                            })
                            .debug(
                                "Invalid range, needs to have a valid option"
                            )
                        unprocessableEntity(res, "Invalid range")
                        return
                    }
                }
            }
        }
    }
    const post = await createPost({
        authorId: userId,
        languageId,
        body,
        parentPostId,
        promptId,
    })
    if (!post) {
        res.json({
            success: false,
        })
        return
    }
    chlog.child({ post }).debug("User successfully created post")
    if (gameType) {
        const game = await createPostGame({
            postId: post.id,
            gameType: gameType as PostGameType,
        })
        if (!game) {
            // TODO: Delete post
            chlog
                .child({
                    userId,
                    body,
                    locale,
                    gameType,
                    ranges,
                })
                .error("Failed to create post game")
            unprocessableEntity(res, "Failed to create game")
            return
        }
        for (const range of ranges as PostGameRange[]) {
            let createdRange = null
            if (gameType === PostGameType.GuessCase) {
                createdRange = await createPostGameRange({
                    uuid: range.uuid,
                    gameId: game.id,
                    startIndex: range.start,
                    endIndex: range.end,
                    caseOption: (range as GuessCaseRange)
                        .option as GrammaticalCase,
                    genderOption: null,
                })
            } else if (gameType === PostGameType.GuessGender) {
                createdRange = await createPostGameRange({
                    uuid: range.uuid,
                    gameId: game.id,
                    startIndex: range.start,
                    endIndex: range.end,
                    caseOption: null,
                    genderOption: (range as GuessGenderRange)
                        .option as GrammaticalGender,
                })
            } else if (gameType === PostGameType.Cloze) {
                createdRange = await createPostGameRange({
                    uuid: range.uuid,
                    gameId: game.id,
                    startIndex: range.start,
                    endIndex: range.end,
                    caseOption: null,
                    genderOption: null,
                })
            }
            if (!createdRange) {
                // TODO: Delete post
                chlog
                    .child({
                        userId,
                        body,
                        locale,
                        gameType,
                        ranges,
                        range,
                    })
                    .error("Failed to create post game range")
                unprocessableEntity(res, "Failed to create game")
                return
            }
        }
    }
    res.json({
        success: true,
        meta: {
            post: {
                uuid: post.uuid,
                nodeId: post.nodeId,
            },
        },
    })
    if (parentPostId) {
        notifyOriginalAuthorAfterReply(post, userId)
    }
}
