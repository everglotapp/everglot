import { writable, derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUser,
    LanguageCodeMappings,
    CurrentUserQuery,
    LanguageCodeMappingsQuery,
} from "../types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("English")
export const groupUuid = writable<string | null>(null)

export const currentUserStore = operationStore<CurrentUserQuery>(CurrentUser)

export const currentUser = derived(currentUserStore, ($currentUserStore) =>
    $currentUserStore.data ? $currentUserStore.data?.currentUser || null : null
)

export const userHasCompletedProfile = derived(
    currentUser,
    ($currentUser) =>
        $currentUser !== null &&
        $currentUser.username !== null &&
        $currentUser.userLanguages.totalCount
)

export const languageCodeMappings = operationStore<LanguageCodeMappingsQuery>(
    LanguageCodeMappings
)

export const userLocale = derived(currentUserStore, ($currentUserStore) =>
    $currentUserStore.fetching
        ? null
        : $currentUserStore.data?.currentUser || null
)
