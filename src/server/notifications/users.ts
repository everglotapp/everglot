import { performQuery } from "../gql"
import log from "../../logger"

const chlog = log.child({ namespace: "notifications-users" })

import {
    UserPasswordResetEmailNotification,
    UserPasswordResetSuccessEmailNotification,
} from "../../types/generated/graphql"
import type {
    UserPasswordResetEmailNotificationQuery,
    UserPasswordResetEmailNotificationQueryVariables,
    UserPasswordResetSuccessEmailNotificationQuery,
    UserPasswordResetSuccessEmailNotificationQueryVariables,
} from "../../types/generated/graphql"

export async function getUserPasswordResetEmailNotification(
    vars: UserPasswordResetEmailNotificationQueryVariables
) {
    const res = await performQuery<UserPasswordResetEmailNotificationQuery>(
        UserPasswordResetEmailNotification.loc!.source,
        vars
    )
    if (!res.data) {
        chlog
            .child({ res, userId: vars.id })
            .error("Failed to get password reset notification data by user ID")
        return null
    }
    return res.data || null
}

export async function getUserPasswordResetSuccessEmailNotification(
    vars: UserPasswordResetSuccessEmailNotificationQueryVariables
) {
    const res =
        await performQuery<UserPasswordResetSuccessEmailNotificationQuery>(
            UserPasswordResetSuccessEmailNotification.loc!.source,
            vars
        )
    if (!res.data) {
        chlog
            .child({ res, userId: vars.id })
            .error(
                "Failed to get password reset success notification data by user ID"
            )
        return null
    }
    return res.data || null
}
