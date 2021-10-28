import { performQuery } from "../gql"
import log from "../../logger"

const chlog = log.child({ namespace: "notifications-posts" })

import {
    PostReplyNotification,
    PostLikeNotification,
    PostUserMentionNotificationQuery,
    PostUserMentionNotification,
    PostCorrectionNotification,
    PostCorrectionNotificationQuery,
} from "../../types/generated/graphql"
import type {
    PostReplyNotificationQuery,
    PostLikeNotificationQuery,
} from "../../types/generated/graphql"

export async function getPostReplyNotification(postId: number) {
    const res = await performQuery<PostReplyNotificationQuery>(
        PostReplyNotification.loc!.source,
        { id: postId }
    )
    if (!res.data) {
        chlog
            .child({ res, postId })
            .error("Failed to get reply notification data by post ID")
        return null
    }
    return res.data?.post || null
}

export async function getPostLikeNotification(postLikeId: number) {
    const res = await performQuery<PostLikeNotificationQuery>(
        PostLikeNotification.loc!.source,
        { id: postLikeId }
    )
    if (!res.data) {
        chlog
            .child({ res, postLikeId })
            .error("Failed to get post like notification data by post like ID")
        return null
    }
    return res.data?.postLike || null
}

export async function getPostUserMentionNotification(
    postUserMentionId: number
) {
    const res = await performQuery<PostUserMentionNotificationQuery>(
        PostUserMentionNotification.loc!.source,
        { id: postUserMentionId }
    )
    if (!res.data) {
        chlog
            .child({ res, postUserMentionId })
            .error(
                "Failed to get mention notification data by post user mention ID"
            )
        return null
    }
    return res.data || null
}

export async function getPostCorrectionNotification(postCorrectionId: number) {
    const res = await performQuery<PostCorrectionNotificationQuery>(
        PostCorrectionNotification.loc!.source,
        { id: postCorrectionId }
    )
    if (!res.data) {
        chlog
            .child({ res, postCorrectionId })
            .error(
                "Failed to get correction notification data by post correction ID"
            )
        return null
    }
    return res.data || null
}
