import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    FeedPosts,
    FeedPostsQuery,
    FeedPostsQueryVariables,
    Post,
    SinglePost,
    SinglePostQuery,
} from "../types/generated/graphql"

export const feedPostsStore = operationStore<
    FeedPostsQuery,
    FeedPostsQueryVariables
>(
    FeedPosts,
    {
        locale: "",
        afterUuid: null,
    },
    { pause: true, requestPolicy: "network-only" }
)

export const feedPosts = derived(
    feedPostsStore,
    ($feedPostsStore) =>
        $feedPostsStore.data
            ? ($feedPostsStore.data?.feedPosts?.edges
                  .map((edge) => edge.node)
                  .filter(Boolean) as Post[]) || null
            : null,
    null
)

export const singlePostStore = operationStore<SinglePostQuery>(
    SinglePost,
    { snowflakeId: "" },
    { pause: true, requestPolicy: "network-only" }
)

export const singlePost = derived(singlePostStore, ($singlePostStore) =>
    $singlePostStore.data && !$singlePostStore.error
        ? $singlePostStore.data.posts?.nodes[0] || null
        : null
)
