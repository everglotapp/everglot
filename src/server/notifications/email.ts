import SibApiV3Sdk from "sib-api-v3-typescript"
import type { SendSmtpEmail } from "sib-api-v3-typescript"

import { performQuery } from "../gql"
import log from "../../logger"

import {
    OutstandingEmailNotifications,
    OutstandingEmailNotificationsQuery,
    UnsubscribeUserEmailNotifications,
    UnsubscribeUserEmailNotificationsMutation,
    UnsubscribeUserEmailNotificationsMutationVariables,
} from "../../types/generated/graphql"
import {
    enqueueNotification,
    getEmailNotificationChannelId,
    markNotificationAsJustSent,
} from "./utils"
import type { NotificationParamsV1 } from "./params"
import type {
    EmailParamsV1,
    ManualHtmlEmailParamsV1,
    ManualTextEmailParamsV1,
    TemplateEmailParamsV1,
} from "./params/v1"

const chlog = log.child({ namespace: "notifications-email" })

let handleNotifications = false
let notificationHandler: NodeJS.Timeout | undefined

const NOTIFICATION_DELAY_MS = 5000

const DEFAULT_EMAIL_FROM = {
    name: "Ebo from Everglot",
    email: "ebo@everglot.com",
}

const { SENDINBLUE_API_KEY } = process.env

export function listen() {
    chlog.debug("Listening for email notifications")
    handleNotifications = true
    sendNextEmailNotificationAfterDelay()
}

function sendNextEmailNotificationAfterDelay() {
    if (!handleNotifications) {
        return
    }
    notificationHandler = setTimeout(
        sendNextEmailNotification,
        NOTIFICATION_DELAY_MS
    )
}

/**
 * Stop handling email notifications.
 */
export function stop() {
    chlog.debug("Removing email notification listeners")
    handleNotifications = false
    if (notificationHandler) {
        clearTimeout(notificationHandler)
        notificationHandler = undefined
    }
}

async function sendNextEmailNotification() {
    if (!handleNotifications) {
        return
    }
    chlog.trace("Checking for email notification to be sent")
    const notification = await getNextOutstandingEmailNotification()
    if (!notification) {
        sendNextEmailNotificationAfterDelay()
        return
    }
    if (!handleNotifications) {
        return
    }
    const params = notification.params
        ? (JSON.parse(notification.params) as EmailParamsV1)
        : null
    if (!params) {
        chlog
            .child({ notification })
            .debug(
                "Not sending email, params required for template or manual subject and body"
            )
        sendNextEmailNotificationAfterDelay()
        return
    }
    const { recipient } = notification
    if (!recipient) {
        chlog
            .child({ notification })
            .debug("Not sending email, user required for To address")
        sendNextEmailNotificationAfterDelay()
        return
    }
    const from = params!.from || DEFAULT_EMAIL_FROM
    const to = recipient.email
    const baseEmail = {
        sender: from,
        replyTo: from,
        to: [{ email: to }],
    }
    let email: SendSmtpEmail
    if (params.hasOwnProperty("templateId")) {
        email = {
            ...baseEmail,
            templateId: (params as TemplateEmailParamsV1).templateId,
            params: (params as TemplateEmailParamsV1).templateParams,
        }
    } else if (params.hasOwnProperty("textContent")) {
        email = {
            ...baseEmail,
            subject: (params as ManualTextEmailParamsV1).subject,
            textContent: (params as ManualTextEmailParamsV1).textContent,
        }
    } else if (params.hasOwnProperty("htmlContent")) {
        email = {
            ...baseEmail,
            subject: (params as ManualHtmlEmailParamsV1).subject,
            htmlContent: (params as ManualHtmlEmailParamsV1).htmlContent,
        }
    } else {
        chlog
            .child({ notification })
            .error(
                "Email parameters require either templateId, textContent or htmlContent"
            )
        sendNextEmailNotificationAfterDelay()
        return
    }
    chlog.child({ email }).debug("Sending email")
    const apiInstance = getSendinblueTransactionalEmailsApiInstance()
    if (!apiInstance) {
        chlog
            .child({ email })
            .warn("Failed to send an email: could not get API instance")
        sendNextEmailNotificationAfterDelay()
        return
    }
    apiInstance.sendTransacEmail(email).then(
        async function (value) {
            chlog
                .child({ email, notification, value })
                .info("Sent an email successfully")
            const markedAsSent = await markNotificationAsJustSent(
                notification.id
            )
            if (!markedAsSent) {
                chlog
                    .child({ email, notification, markedAsSent })
                    .error(
                        "After successfully sending an email could not mark its corresponding notification as sent, aborting email notification listener"
                    )
                stop()
                return
            }
            sendNextEmailNotificationAfterDelay()
        },
        function (error) {
            chlog
                .child({ email, notification, error })
                .warn("Failed to send an email")
            // We need to abort here to prevent the same email from being sent repeatedly.
            sendNextEmailNotificationAfterDelay()
        }
    )
}

function getSendinblueTransactionalEmailsApiInstance() {
    if (!SENDINBLUE_API_KEY || !SENDINBLUE_API_KEY.length) {
        chlog
            .child({ SENDINBLUE_API_KEY })
            .error("Empty API key for Sendinblue transactional emails API")
        return null
    }
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    apiInstance.setApiKey(
        SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
        SENDINBLUE_API_KEY
    )
    return apiInstance
}

async function getNextOutstandingEmailNotification() {
    const res = await performQuery<OutstandingEmailNotificationsQuery>(
        OutstandingEmailNotifications.loc!.source,
        {}
    )
    const notifications =
        res.data?.notificationChannelByName?.notificationsByChannelId?.nodes
    if (!notifications) {
        return null
    }
    // TODO: Check expiresAt and allow any time later than now
    return (
        notifications.find((notification) => {
            if (!notification) {
                return false
            }
            const now = Date.now()
            if (notification.expiresAt !== null) {
                const expiresAt = Date.parse(notification.expiresAt)
                if (now > expiresAt) {
                    chlog
                        .child({ notification })
                        .debug("Email notification has expired")
                    return false
                }
            }
            if (notification.withheldUntil !== null) {
                const withheldUntil = Date.parse(notification.withheldUntil)
                if (now < withheldUntil) {
                    chlog
                        .child({ notification })
                        .debug("Email notification is still withheld")
                    return false
                }
            }
            return true
        }) || null
    )
}

export async function enqueueEmailNotification(
    userId: number,
    expiresAt: Date | null,
    withheldUntil: Date | null,
    params: NotificationParamsV1 | null
) {
    const channelId = await getEmailNotificationChannelId()
    if (!channelId) {
        return null
    }
    return enqueueNotification(
        channelId,
        { userId, groupId: null },
        expiresAt,
        withheldUntil,
        params
    )
}

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

export default { listen, stop }
