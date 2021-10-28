import { validate as uuidValidate } from "uuid"
import { forbidden, unprocessableEntity } from "../../../../helpers"

import log from "../../../../logger"

const chlog = log.child({
    namespace: "posts-uuid-corrections-create",
})

import type { Request, Response } from "express"
import { createPostCorrection, getPostIdByUuid } from "../../../../server/posts"
import { getPostCorrectionNotification } from "../../../../server/notifications/posts"
import { enqueueFcmNotification } from "../../../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../../../server/notifications/params"
import { userHasCompletedProfile } from "../../../../server/users"
import { FcmMessageParamsDataTypeV1 } from "../../../../server/notifications/params/v1"
import { MAX_POST_BODY_LENGTH } from "../../../../server/constants"

const NOTIFICATION_EXPIRY_SECONDS = 60 * 60
/**
 * Allows user to cancel the notification
 * by unliking within this timeframe.
 */
const NOTIFICATION_WITHHELD_SECONDS = 0

async function notifyAuthor(
    correction: {
        id: number
    },
    currentUserId: number
) {
    const notificationData = await getPostCorrectionNotification(correction.id)
    if (!notificationData || !notificationData.postCorrection) {
        chlog
            .child({ correction, notificationData, currentUserId })
            .error("No notification data for post correction")
        return
    }
    const {
        postCorrection: { post, user },
    } = notificationData
    if (!post || !post.authorId || !user) {
        chlog
            .child({ correction, currentUserId })
            .error("Missing notification data for post correction")
        return
    }
    if (post.authorId === currentUserId) {
        // Don't notify if the author likes their own post.
        return
    }
    const expiresAt = new Date(Date.now() + NOTIFICATION_EXPIRY_SECONDS * 1000)
    const withheldUntil = new Date(
        Date.now() + NOTIFICATION_WITHHELD_SECONDS * 1000
    )
    const username =
        user.displayName && user.displayName.length
            ? user.displayName
            : user.username
    enqueueFcmNotification(
        { userId: post.authorId, groupId: null },
        expiresAt,
        withheldUntil,
        {
            message: {
                notification: {
                    title: `${
                        username && username.length ? username : "Someone"
                    } corrected your post`,
                    body: `${post.body.substr(0, 64)}`,
                },
                data: {
                    type: FcmMessageParamsDataTypeV1.PostCorrection,
                    postSnowflakeId: post.snowflakeId,
                },
            },
            version: NotificationParamsVersion.V1,
        }
    )
}

function sanitizeBody(body: string) {
    return body.trim().substr(0, MAX_POST_BODY_LENGTH)
}

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    if (!(await userHasCompletedProfile(userId))) {
        forbidden(res, "Please complete your profile")
        return
    }
    const postUuid = req.params["uuid"]
    if (!uuidValidate(postUuid)) {
        chlog.child({ userId, postUuid }).debug("Invalid post UUID")
        next()
        return
    }
    const postId = await getPostIdByUuid(postUuid)
    if (!postId) {
        chlog.child({ userId, postUuid }).debug("Did not find post by UUID")
        next()
        return
    }
    // TODO: Validate these inputs
    const body = req.body["body"]
    if (!body || typeof body !== "string") {
        unprocessableEntity(res, "Invalid body")
        return
    }
    const uuid = req.body["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ userId, uuid, postUuid }).debug("Invalid UUID")
        unprocessableEntity(res, "Invalid UUID")
        return
    }
    // TODO: Check this against actual post body length
    const startIndex = Number(req.body["start"])
    if (startIndex < 0 || startIndex >= MAX_POST_BODY_LENGTH) {
        chlog
            .child({ userId, uuid, postUuid, startIndex })
            .debug("Invalid start")
        unprocessableEntity(res, "Start index out of bounds")
        return
    }
    const endIndex = Number(req.body["end"])
    if (
        endIndex < 0 ||
        endIndex >= MAX_POST_BODY_LENGTH ||
        endIndex < startIndex
    ) {
        chlog
            .child({ userId, uuid, postUuid, startIndex, endIndex })
            .debug("Invalid end")
        unprocessableEntity(res, "End index out of bounds")
        return
    }
    const correction = await createPostCorrection({
        postId,
        userId,
        uuid,
        body: sanitizeBody(body),
        startIndex,
        endIndex,
    })
    if (correction) {
        chlog.child({ correction }).debug("User successfully corrected post")
        res.json({
            success: true,
        })
        notifyAuthor(correction, userId)
    } else {
        chlog
            .child({ correction, postId, userId })
            .debug("Failed to create post correction")
        unprocessableEntity(res)
    }
}
