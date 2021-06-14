import { writable, derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import { CurrentUser, CurrentUserQuery } from "../types/generated/graphql"

export const currentUserStore = operationStore<CurrentUserQuery>(CurrentUser)

export const currentUser = derived(
    currentUserStore,
    ($currentUserStore) =>
        $currentUserStore.data
            ? $currentUserStore.data?.currentUser || null
            : null,
    null
)

export const currentChatUserUuid = writable<string | null>(null)
export const currentUserUuid = derived(
    [currentUser, currentChatUserUuid],
    ([$currentUser, $currentChatUserUuid]) =>
        $currentUser ? ($currentUser.uuid as string) : $currentChatUserUuid,
    null
)
