import { validate as uuidValidate } from "uuid"
import { forbidden, unprocessableEntity } from "../../../../helpers"

import log from "../../../../logger"

const chlog = log.child({
    namespace: "posts-uuid-corrections-create",
})

import type { Request, Response } from "express"
import { createPostCorrection, getPostIdByUuid } from "../../../../server/posts"
import { getPostLikeNotification } from "../../../../server/notifications/posts"
import { enqueueFcmNotification } from "../../../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../../../server/notifications/params"
import { userHasCompletedProfile } from "../../../../server/users"
import { FcmMessageParamsDataTypeV1 } from "../../../../server/notifications/params/v1"

const NOTIFICATION_EXPIRY_SECONDS = 60 * 60
/**
 * Allows user to cancel the notification
 * by unliking within this timeframe.
 */
const NOTIFICATION_WITHHELD_SECONDS = 10

async function notifyAuthor(
    postLike: {
        id: number
        postId: number
        userId: number
        nodeId: string
        createdAt: any
    },
    currentUserId: number
) {
    const notificationData = await getPostLikeNotification(postLike.id)
    if (!notificationData) {
        chlog
            .child({ postLike, currentUserId })
            .error("No notification data for post like")
        return
    }
    const { post, user } = notificationData
    if (!post || !post.authorId || !user) {
        chlog
            .child({ postLike, currentUserId })
            .error("Missing notification data for post like")
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
                    } likes your ${post.parentPostId ? "comment" : "post"}`,
                    body: `${post.body.substr(0, 64)}`,
                },
                data: {
                    type: FcmMessageParamsDataTypeV1.PostLike,
                },
            },
            version: NotificationParamsVersion.V1,
        }
    )
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
        chlog.child({ userId, postUuid }).debug("Invalid UUID")
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
    const uuid = req.body["uuid"]
    const startIndex = Number(req.body["start"])
    const endIndex = Number(req.body["end"])
    const correction = await createPostCorrection({
        postId,
        userId,
        uuid,
        body,
        startIndex,
        endIndex,
    })
    if (correction) {
        chlog.child({ correction }).debug("User successfully corrected post")
        res.json({
            success: true,
        })
        // notifyAuthor(postLike, userId)
    } else {
        chlog
            .child({ correction, postId, userId })
            .debug("Failed to create post correction")
        unprocessableEntity(res)
    }
}
