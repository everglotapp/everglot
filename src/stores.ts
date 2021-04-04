import { writable } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUser,
    LanguageCodeMappings,
    ChatUsers,
    CurrentUserQuery,
    LanguageCodeMappingsQuery,
    ChatUsersQuery,
} from "./types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("English")

export const currentUser = operationStore<CurrentUserQuery>(CurrentUser)
export const languageCodeMappings = operationStore<LanguageCodeMappingsQuery>(
    LanguageCodeMappings
)
export const chatUsers = operationStore<ChatUsersQuery>(ChatUsers)
