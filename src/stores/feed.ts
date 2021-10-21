import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    FeedPosts,
    FeedPostsQuery,
    FeedPostsQueryVariables,
} from "../types/generated/graphql"

export const feedPostsStore = operationStore<
    FeedPostsQuery,
    FeedPostsQueryVariables
>(
    FeedPosts,
    {
        locale: "",
        before: null,
    },
    { pause: true, requestPolicy: "network-only" }
)

export const feedPosts = derived(
    feedPostsStore,
    ($feedPostsStore) =>
        $feedPostsStore.data
            ? $feedPostsStore.data?.feedPosts?.edges
                  .map((edge) => edge.node)
                  .filter(Boolean) || null
            : null,
    null
)
