import log from "../../logger"
import { unprocessableEntity, forbidden } from "../../helpers"

const chlog = log.child({
    namespace: "posts-create",
})

import type { Request, Response } from "express"
import { createPost, getPostIdByUuid } from "../../server/posts"
import { getLanguageIdByAlpha2 } from "../../server/locales"
import { SUPPORTED_LOCALES } from "../../constants"
import { getPromptIdByUuid } from "../../server/prompts"
import { getPostReplyNotification } from "../../server/notifications/posts"
import { enqueueFcmNotification } from "../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../server/notifications/params"
import { userHasCompletedProfile } from "../../server/users"
import { FcmMessageParamsDataTypeV1 } from "../../server/notifications/params/v1"

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
    const post = await createPost({
        authorId: userId,
        languageId,
        body,
        parentPostId,
        promptId,
    })
    if (post) {
        chlog.child({ post }).debug("User successfully created post")
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
    } else {
        res.json({
            success: false,
        })
    }
}
