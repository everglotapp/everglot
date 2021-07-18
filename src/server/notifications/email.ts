import { performQuery } from "../gql"
import log from "../../logger"

import type {
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
        `mutation UnsubscribeUserEmailNotifications($token: String!) {
            updateUserByEmailUnsubscribeToken(
                input: {
                    patch: { emailNotificationsEnabled: false }
                    emailUnsubscribeToken: $token
                }
            ) {
                clientMutationId
                user {
                    email
                    uuid
                    username
                }
            }
        }`,
        { token }
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
