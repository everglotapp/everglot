import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import { AllPosts } from "../types/generated/graphql"
import type { AllPostsQuery } from "../types/generated/graphql"

export const allPostsStore = operationStore<AllPostsQuery>(AllPosts)

export const allPosts = derived(
    allPostsStore,
    ($allPostsStore) =>
        $allPostsStore.data ? $allPostsStore.data?.posts?.nodes || null : null,
    null
)
