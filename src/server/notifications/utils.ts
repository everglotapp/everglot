import {
    MarkNotificationAsSent,
    MarkNotificationAsSentMutation,
    MarkNotificationAsSentMutationVariables,
    NotificationChannelByName,
    NotificationChannelByNameQuery,
    NotificationChannelByNameQueryVariables,
    CreateNotification,
    CreateNotificationMutation,
    CreateNotificationMutationVariables,
} from "../../types/generated/graphql"
import { performQuery } from "../gql"

import log from "../../logger"
import type { NotificationParams } from "./params"

const EMAIL_NOTIFICATION_CHANNEL_NAME = "Email" as const
const FCM_NOTIFICATION_CHANNEL_NAME = "Firebase Cloud Messaging" as const
const IN_APP_NOTIFICATION_CHANNEL_NAME = "In-app" as const

const chlog = log.child({ namespace: "notifications-utils" })

export type NotificationUserRecipient = {
    groupId: null
    userId: number
}
export type NotificationGroupRecipient = {
    groupId: number
    userId: null
}
export type NotificationRecipient =
    | NotificationUserRecipient
    | NotificationGroupRecipient

export async function enqueueNotification(
    channelId: number,
    recipient: NotificationRecipient,
    expiresAt: Date | null,
    withheldUntil: Date | null,
    params: NotificationParams | null
) {
    const res = await performQuery<CreateNotificationMutation>(
        CreateNotification.loc!.source,
        {
            channelId,
            recipientId: recipient.userId,
            recipientGroupId: recipient.groupId,
            params: params === null ? null : JSON.stringify(params),
            sentAt: null,
            expiresAt: expiresAt?.toISOString() || null,
            withheldUntil: withheldUntil?.toISOString() || null,
        } as CreateNotificationMutationVariables
    )
    return res?.data?.createNotification || null
}

export async function markNotificationAsJustSent(id: number) {
    const res = await performQuery<MarkNotificationAsSentMutation>(
        MarkNotificationAsSent.loc!.source,
        {
            id,
            sentAt: new Date().toISOString(),
        } as MarkNotificationAsSentMutationVariables
    )
    chlog
        .child({
            errors: res.errors,
        })
        .debug("Marking notification as just sent")
    return res.data?.updateNotification?.notification || null
}

export async function getEmailNotificationChannelId() {
    return getNotificationChannelIdByName(EMAIL_NOTIFICATION_CHANNEL_NAME)
}

export async function getFcmNotificationChannelId() {
    return getNotificationChannelIdByName(FCM_NOTIFICATION_CHANNEL_NAME)
}

export async function getInAppNotificationChannelId() {
    return getNotificationChannelIdByName(IN_APP_NOTIFICATION_CHANNEL_NAME)
}

async function getNotificationChannelIdByName(name: string) {
    const res = await performQuery<NotificationChannelByNameQuery>(
        NotificationChannelByName.loc!.source,
        {
            name,
        } as NotificationChannelByNameQueryVariables
    )
    return res.data?.notificationChannelByName?.id || null
}
