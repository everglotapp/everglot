import { writable } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUser,
    LanguageCodeMappings,
    CurrentUserQuery,
    LanguageCodeMappingsQuery,
    AllGroupsQuery,
    AllGroups,
} from "./types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("English")

export const currentUser = operationStore<CurrentUserQuery>(CurrentUser)
export const languageCodeMappings = operationStore<LanguageCodeMappingsQuery>(
    LanguageCodeMappings
)
export const allGroups = operationStore<AllGroupsQuery>(AllGroups)
