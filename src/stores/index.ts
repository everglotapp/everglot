import { writable, derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUser,
    LanguageCodeMappings,
    CurrentUserQuery,
    LanguageCodeMappingsQuery,
    Maybe,
    User,
    Group,
    GroupUser,
    Language,
    LanguageSkillLevel,
} from "../types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("English")
export const groupUuid = writable<string | null>(null)

export const currentUserStore = operationStore<CurrentUserQuery>(CurrentUser)

export const currentUser = derived(currentUserStore, ($currentUserStore) =>
    $currentUserStore.fetching
        ? null
        : $currentUserStore.data?.currentUser || null
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
