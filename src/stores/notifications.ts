import { derived } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUserInAppNotifications,
    CurrentUserInAppNotificationsQuery,
    CurrentUserInAppNotificationsQueryVariables,
} from "../types/generated/graphql"

export const currentUserInAppNotificationsStore = operationStore<
    CurrentUserInAppNotificationsQuery,
    CurrentUserInAppNotificationsQueryVariables
>(
    CurrentUserInAppNotifications,
    // {
    //     afterUuid: null,
    // },
    {},
    { pause: true, requestPolicy: "network-only" }
)

export const inAppNotifications = derived(
    currentUserInAppNotificationsStore,
    ($currentUserInAppNotificationsStore) =>
        $currentUserInAppNotificationsStore.data
            ? ($currentUserInAppNotificationsStore.data?.currentUser?.inAppNotifications?.nodes.filter(
                  Boolean
              ) as { uuid: string; createdAt: Date; params: {} | null }[]) ||
              null
            : null,
    null
)
