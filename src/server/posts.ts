import { performQuery } from "./gql"

import log from "../logger"

import {
    CreatePostMutationVariables,
    CreatePostMutation,
    CreatePostLikeMutationVariables,
    CreatePostLikeMutation,
    CreatePostGameMutationVariables,
    CreatePostGameMutation,
    CreatePostGameRangeMutationVariables,
    CreatePostGameRangeMutation,
    CreatePostGameAnswerMutationVariables,
    CreatePostGameAnswerMutation,
    PostIdByUuidQuery,
    DeletePostLikeMutationVariables,
    DeletePostLikeMutation,
    PostLikeIdByPostIdAndUserIdQuery,
    CreatePostRecordingMutationVariables,
    CreatePostRecordingMutation,
    PostGameIdByUuidQuery,
    PostGameIdByUuid,
    PostGameByUuidQuery,
    PostGameByUuid,
    CurrentUserHasAnsweredOrRevealedPostGameQueryVariables,
    CurrentUserHasAnsweredOrRevealedPostGame,
    CurrentUserHasAnsweredOrRevealedPostGameQuery,
} from "../types/generated/graphql"
import {
    CreatePost,
    CreatePostLike,
    CreatePostRecording,
    CreatePostGameRange,
    CreatePostGame,
    CreatePostGameAnswer,
    PostIdByUuid,
    PostLikeIdByPostIdAndUserId,
    DeletePostLike,
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

export async function createPostGame(
    vars: CreatePostGameMutationVariables
): Promise<
    NonNullable<CreatePostGameMutation["createPostGame"]>["postGame"] | null
> {
    const res = await performQuery<CreatePostGameMutation>(
        CreatePostGame.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post game")
        return null
    }
    return res.data?.createPostGame?.postGame || null
}

export async function createPostGameRange(
    vars: CreatePostGameRangeMutationVariables
): Promise<
    | NonNullable<
          CreatePostGameRangeMutation["createPostGameRange"]
      >["postGameRange"]
    | null
> {
    const res = await performQuery<CreatePostGameRangeMutation>(
        CreatePostGameRange.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post game range")
        return null
    }
    return res.data?.createPostGameRange?.postGameRange || null
}

export async function getPostGameIdByUuid(
    uuid: string
): Promise<number | null> {
    const res = await performQuery<PostGameIdByUuidQuery>(
        PostGameIdByUuid.loc!.source,
        { uuid }
    )
    if (!res.data) {
        chlog.child({ res, uuid }).error("Failed to find post game ID by UUID")
        return null
    }
    return res.data?.postGameByUuid?.id || null
}

export async function getPostGameByUuid(uuid: string) {
    const res = await performQuery<PostGameByUuidQuery>(
        PostGameByUuid.loc!.source,
        { uuid }
    )
    if (!res.data) {
        chlog.child({ res, uuid }).error("Failed to find post game by UUID")
        return null
    }
    return res.data?.postGameByUuid || null
}

export async function createPostGameAnswer(
    vars: CreatePostGameAnswerMutationVariables
): Promise<
    | NonNullable<
          CreatePostGameAnswerMutation["createPostGameAnswer"]
      >["postGameAnswer"]
    | null
> {
    const res = await performQuery<CreatePostGameAnswerMutation>(
        CreatePostGameAnswer.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post game answer")
        return null
    }
    return res.data?.createPostGameAnswer?.postGameAnswer || null
}

export async function currentUserHasAnsweredOrRevealedPostGame(
    vars: CurrentUserHasAnsweredOrRevealedPostGameQueryVariables
): Promise<boolean | null> {
    const res =
        await performQuery<CurrentUserHasAnsweredOrRevealedPostGameQuery>(
            CurrentUserHasAnsweredOrRevealedPostGame.loc!.source,
            vars
        )
    if (!res.data || !res.data.postGame) {
        chlog.child({ res, vars }).error("Failed to find post game by ID")
        return null
    }
    const { answerReveals, ranges } = res.data.postGame
    if (answerReveals.totalCount > 0) {
        return true
    }
    return ranges.nodes.some((node) => node && node.answers.totalCount > 0)
}
