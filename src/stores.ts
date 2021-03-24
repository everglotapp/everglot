import { writable } from "svelte/store"
import { operationStore } from "@urql/svelte"

import { CurrentUser, LanguageCodeMappings } from "./types/generated/graphql"
import type { User, Language } from "./types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("")

export const currentUser = operationStore<{
    users: {
        nodes: Pick<
            User,
            "bio" | "email" | "gender" | "username" | "uuid" | "avatarUrl"
        >[]
    }
}>(CurrentUser)

export const languageCodeMappings = operationStore<{
    languages: { nodes: Pick<Language, "englishName" | "alpha2">[] }
}>(LanguageCodeMappings)
