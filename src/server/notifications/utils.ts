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

const EMAIL_NOTIFICATION_CHANNEL_NAME = "Email"
const FCM_NOTIFICATION_CHANNEL_NAME = "Firebase Cloud Messaging"

const chlog = log.child({ namespace: "notifications-utils" })

export interface TemplateEmailParams extends CommonEmailParams {
    templateId?: number
    templateParams?: object
}

export interface ManualTextEmailParams extends ManualEmailParams {
    textContent?: string
}

export interface ManualHtmlEmailParams extends ManualEmailParams {
    htmlContent?: string
}

interface ManualEmailParams extends CommonEmailParams {
    subject?: string
}

interface CommonEmailParams {
    from?: { email: string; name: string }
}

export type EmailParams =
    | TemplateEmailParams
    | ManualTextEmailParams
    | ManualHtmlEmailParams

export type NotificationParams = { version: number } & EmailParams

export async function enqueueNotification(
    channelId: number,
    userId: number,
    sentAt: Date | null,
    expiresAt: Date | null,
    withheldUntil: Date | null,
    params: NotificationParams | null
) {
    const res = await performQuery<CreateNotificationMutation>(
        CreateNotification.loc!.source,
        {
            channelId,
            userId,
            params: JSON.stringify(params),
            sentAt: sentAt?.toISOString() || null,
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

async function getNotificationChannelIdByName(name: string) {
    const res = await performQuery<NotificationChannelByNameQuery>(
        NotificationChannelByName.loc!.source,
        {
            name,
        } as NotificationChannelByNameQueryVariables
    )
    return res.data?.notificationChannelByName?.id || null
}
