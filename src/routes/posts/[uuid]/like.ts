import { validate as uuidValidate } from "uuid"
import { unprocessableEntity } from "../../../helpers"

import log from "../../../logger"

const chlog = log.child({
    namespace: "posts-uuid-like",
})

import type { Request, Response } from "express"
import {
    createPostLike,
    getPostIdByUuid,
    getPostLikeNotification,
} from "../../../server/posts"
import { enqueueFcmNotification } from "../../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../../server/notifications/params"

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
    enqueueFcmNotification(
        { userId: post.authorId, groupId: null },
        expiresAt,
        withheldUntil,
        {
            message: {
                notification: {
                    title: `${user.displayName || user.username} likes your ${
                        post.parentPostId ? "comment" : "post"
                    }`,
                    body: `${post.body.substr(0, 64)}`,
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
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ userId, uuid }).debug("Invalid UUID")
        next()
        return
    }
    const postId = await getPostIdByUuid(uuid)
    if (!postId) {
        chlog.child({ userId, uuid }).debug("Did not find post by UUID")
        next()
        return
    }
    const postLike = await createPostLike({
        postId,
        userId,
    })
    if (postLike) {
        chlog.child({ postLike }).debug("User successfully liked post")
        res.json({
            success: true,
        })
        notifyAuthor(postLike, userId)
    } else {
        chlog.child({ postLike, postId, userId }).debug("Failed to like post")
        unprocessableEntity(res, "You already liked this post")
    }
}
