import { derived, get } from "svelte/store"
import { operationStore } from "@urql/svelte"

import { groupUuid } from "./"
import { currentUser } from "./currentUser"
import { globalGroups } from "./groups"

import {
    GroupChatQuery,
    GroupChatQueryVariables,
    GroupChat,
    GroupChatMessagesQuery,
    GroupChatMessages,
    GroupChatMessagesQueryVariables,
    UserType,
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
        before: null,
    },
    { pause: true, requestPolicy: "network-only" }
)

export const currentGroupIsGlobal = derived(
    [groupUuid, globalGroups],
    ([$groupUuid, $globalGroups]) =>
        $globalGroups.some((group) => group.uuid === $groupUuid)
)

export const chatUsers = derived(groupChatStore, ($groupChatStore) =>
    $groupChatStore.data && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.usersByGroupUserGroupIdAndUserId?.nodes
              ?.filter(Boolean)
              .map((node) => node!) || []
        : []
)

export const chatNativeSpeakers = derived(
    [chatUsers, groupUuid],
    ([$chatUsers, $groupUuid]) =>
        $groupUuid
            ? $chatUsers.filter((user) => {
                  const membership = user?.groupUsers.nodes.find(
                      (groupUser) => groupUser?.group?.uuid === $groupUuid
                  )
                  return membership?.userType === UserType.Native
              })
            : []
)

export const chatLearners = derived(
    [chatUsers, groupUuid],
    ([$chatUsers, $groupUuid]) =>
        $groupUuid
            ? $chatUsers
                  .filter((user) => {
                      const membership = user?.groupUsers.nodes.find(
                          (groupUser) => groupUser?.group?.uuid === $groupUuid
                      )
                      return membership?.userType === UserType.Learner
                  })
                  .filter(Boolean)
                  .map((user) => user!)
            : []
)

export const languageSkillLevel = derived(groupChatStore, ($groupChatStore) =>
    $groupChatStore.data && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.languageSkillLevel || null
        : null
)

export const groupName = derived(groupChatStore, ($groupChatStore) =>
    $groupChatStore.data && !$groupChatStore.error
        ? $groupChatStore.data?.groupByUuid?.groupName || null
        : null
)

export const currentUserIsGroupMember = derived(
    [currentUser, chatUsers],
    ([$currentUser, $chatUsers]) =>
        $currentUser &&
        $currentUser.uuid &&
        $chatUsers.some((user) => user.uuid === $currentUser.uuid)
)

export function fetchGroupChatMessages({
    groupUuid,
    before,
}: GroupChatMessagesQueryVariables) {
    const $groupChatMessagesStore = get(groupChatMessagesStore)
    // console.log("Will fetch messages?", {
    //     groupUuid,
    //     fetching: $groupChatMessagesStore.fetching,
    //     stale: $groupChatMessagesStore.stale,
    //     error: $groupChatMessagesStore.error,
    // })
    // console.log("Fetching messages", {
    //     groupUuid,
    //     before,
    // })
    $groupChatMessagesStore.context = {
        requestPolicy: "cache-and-network",
        pause: true,
    }
    $groupChatMessagesStore.variables = {
        groupUuid,
        before,
    }
    $groupChatMessagesStore.context = {
        requestPolicy: "cache-and-network",
        pause: false,
    }
}

/**
 * "Subscribe" to group metadata (name, language, members)
 */
export function fetchGroupMetadata({ groupUuid }: GroupChatQueryVariables) {
    const $groupChatStore = get(groupChatStore)
    if (!groupUuid) {
        return
    }
    // console.log("fetching group metadata")
    $groupChatStore.context = {
        requestPolicy: "cache-and-network",
        pause: true,
    }
    $groupChatStore.variables = { groupUuid }
    $groupChatStore.context = {
        requestPolicy: "cache-and-network",
        pause: false,
    }
}
