import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    GroupChatQuery,
    GroupChatQueryVariables,
    GroupChat,
    GroupChatMessagesQuery,
    GroupChatMessages,
    GroupChatMessagesQueryVariables,
} from "../types/generated/graphql"

export const groupChatStore = operationStore<
    GroupChatQuery,
    GroupChatQueryVariables
>(
    GroupChat,
    {
        groupUuid: "",
    },
    { pause: true, requestPolicy: "network-only" }
)

export const groupChatMessagesStore = operationStore<
    GroupChatMessagesQuery,
    GroupChatMessagesQueryVariables
>(
    GroupChatMessages,
    {
        groupUuid: "",
    },
    { pause: true, requestPolicy: "network-only" }
)

export const chatUsers = derived(groupChatStore, ($groupChatStore) =>
    !$groupChatStore.fetching && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.usersByGroupUserGroupIdAndUserId
              ?.nodes || []
        : []
)

export const language = derived(groupChatStore, ($groupChatStore) =>
    !$groupChatStore.fetching && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.language || null
        : null
)

export const languageSkillLevel = derived(groupChatStore, ($groupChatStore) =>
    !$groupChatStore.fetching && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.languageSkillLevel || null
        : null
)

export const groupName = derived(groupChatStore, ($groupChatStore) =>
    !$groupChatStore.fetching && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.groupName || null
        : null
)
