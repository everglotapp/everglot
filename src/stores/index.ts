import { writable, derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    LanguageCodeMappings,
    LanguageCodeMappingsQuery,
} from "../types/generated/graphql"
import { currentUser, currentUserStore } from "./currentUser"
import type { Page } from "../routes/_helpers/routing"

export const currentPage = writable<Page | null>(null)

export const username = writable<string | null>(null)
export const groupUuid = writable<string | null>(null)
export const inviteToken = writable<string | null>(null)
export const userAgentIsMobileApp = writable<boolean>(false)

export const userHasCompletedProfile = derived(
    currentUser,
    ($currentUser) =>
        $currentUser !== null &&
        $currentUser.username !== null &&
        $currentUser.userLanguages.totalCount
)

export const languageCodeMappings =
    operationStore<LanguageCodeMappingsQuery>(LanguageCodeMappings)

export const userLocale = derived(currentUserStore, ($currentUserStore) =>
    $currentUserStore.fetching
        ? null
        : $currentUserStore.data?.currentUser || null
)
