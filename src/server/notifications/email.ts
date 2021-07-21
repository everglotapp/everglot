import { performQuery } from "../gql"
import log from "../../logger"

import {
    UnsubscribeUserEmailNotifications,
    UnsubscribeUserEmailNotificationsMutation,
    UnsubscribeUserEmailNotificationsMutationVariables,
} from "../../types/generated/graphql"

const chlog = log.child({ namespace: "notifications" })

export async function unsubscribeUserEmailNotifications(
    token: UnsubscribeUserEmailNotificationsMutationVariables["token"]
): Promise<
    | UnsubscribeUserEmailNotificationsMutation["updateUserByEmailUnsubscribeToken"]
    | null
> {
    const res = await performQuery<UnsubscribeUserEmailNotificationsMutation>(
        UnsubscribeUserEmailNotifications.loc!.source,
        { token, lastActiveAt: new Date().toISOString() }
    )
    if (res.errors || !res.data) {
        return null
    }
    const { updateUserByEmailUnsubscribeToken } = res.data
    chlog
        .child({ token, email: updateUserByEmailUnsubscribeToken?.user?.email })
        .debug("Successfully unsubscribed user from email notifications")
    return updateUserByEmailUnsubscribeToken
}
