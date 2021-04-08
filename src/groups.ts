import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import { AllGroupsQuery, AllGroups, Language } from "./types/generated/graphql"

export const allGroupsStore = operationStore<AllGroupsQuery>(AllGroups)
export const privateGroups = derived(allGroupsStore, ($allGroupsStore) =>
    $allGroupsStore.fetching || $allGroupsStore.error
        ? []
        : $allGroupsStore.data?.groups?.nodes
              .filter((group) => group && groupIsPrivate(group))
              .map((group) => group!) || []
)
export const globalGroups = derived(allGroupsStore, ($allGroupsStore) =>
    $allGroupsStore.fetching || $allGroupsStore.error
        ? []
        : $allGroupsStore.data?.groups?.nodes
              .filter((group) => group && groupIsGlobal(group))
              .map((group) => group!) || []
)

export type GroupNode = NonNullable<
    NonNullable<AllGroupsQuery["groups"]>["nodes"][0]
>

export const groupIsPrivate = (group: GroupNode) => group.global === false
export const groupIsGlobal = (group: GroupNode) => group.global === false
export const groupIsForLanguage = (
    group: GroupNode,
    lang: Language["alpha2"]
) => group.language?.alpha2 === lang
