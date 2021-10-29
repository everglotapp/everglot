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

type CurrentUserInAppNotificationNode = NonNullable<
    NonNullable<
        NonNullable<
            NonNullable<CurrentUserInAppNotificationsQuery["currentUser"]>
        >["inAppNotifications"]
    >["nodes"][number]
>

export const inAppNotifications = derived(
    currentUserInAppNotificationsStore,
    ($currentUserInAppNotificationsStore) =>
        $currentUserInAppNotificationsStore.data
            ? ($currentUserInAppNotificationsStore.data?.currentUser?.inAppNotifications?.nodes.filter(
                  Boolean
              ) as CurrentUserInAppNotificationNode[]) || null
            : null,
    null
)
