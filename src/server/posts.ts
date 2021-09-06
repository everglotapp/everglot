import { performQuery } from "./gql"

import log from "../logger"

import {
    CreatePostMutationVariables,
    CreatePostMutation,
    CreatePostLikeMutationVariables,
    CreatePostLikeMutation,
    PostIdByUuidQuery,
    PostIdByUuid,
    DeletePostLikeMutationVariables,
    DeletePostLikeMutation,
    DeletePostLike,
    PostLikeIdByPostIdAndUserIdQuery,
    PostLikeIdByPostIdAndUserId,
    CreatePostRecordingMutationVariables,
    CreatePostRecordingMutation,
    PostLikeNotificationQuery,
    PostLikeNotification,
} from "../types/generated/graphql"
import {
    CreatePost,
    CreatePostLike,
    CreatePostRecording,
} from "../types/generated/graphql"

const chlog = log.child({ namespace: "posts" })

export async function createPost(
    vars: CreatePostMutationVariables
): Promise<NonNullable<CreatePostMutation["createPost"]>["post"] | null> {
    const res = await performQuery<CreatePostMutation>(
        CreatePost.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post")
        return null
    }
    return res.data?.createPost?.post || null
}

export async function createPostLike(
    vars: CreatePostLikeMutationVariables
): Promise<
    NonNullable<CreatePostLikeMutation["createPostLike"]>["postLike"] | null
> {
    const res = await performQuery<CreatePostLikeMutation>(
        CreatePostLike.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post like")
        return null
    }
    return res.data?.createPostLike?.postLike || null
}

export async function deletePostLike(
    vars: DeletePostLikeMutationVariables
): Promise<
    NonNullable<DeletePostLikeMutation["deletePostLike"]>["postLike"] | null
> {
    const res = await performQuery<DeletePostLikeMutation>(
        DeletePostLike.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to delete post like")
        return null
    }
    return res.data?.deletePostLike?.postLike || null
}

export async function getPostIdByUuid(uuid: string): Promise<number | null> {
    const res = await performQuery<PostIdByUuidQuery>(
        PostIdByUuid.loc!.source,
        { uuid }
    )
    if (!res.data) {
        chlog.child({ res, uuid }).error("Failed to find post ID by UUID")
        return null
    }
    return res.data?.postByUuid?.id || null
}

export async function getPostLikeIdByPostIdAndUserId(
    postId: number,
    userId: number
): Promise<number | null> {
    const res = await performQuery<PostLikeIdByPostIdAndUserIdQuery>(
        PostLikeIdByPostIdAndUserId.loc!.source,
        { postId, userId }
    )
    if (!res.data) {
        chlog
            .child({ res, postId, userId })
            .error("Failed to find post like ID by user ID and post ID ")
        return null
    }
    return res.data?.postLikes?.totalCount === 1
        ? res.data.postLikes.nodes[0]!.id
        : null
}

export async function createPostRecording(
    vars: CreatePostRecordingMutationVariables
): Promise<
    | NonNullable<
          CreatePostRecordingMutation["createPostRecording"]
      >["postRecording"]
    | null
> {
    const res = await performQuery<CreatePostRecordingMutation>(
        CreatePostRecording.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post recording")
        return null
    }
    return res.data?.createPostRecording?.postRecording || null
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
