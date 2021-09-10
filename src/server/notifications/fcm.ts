import { getApp } from "../firebase"
import log from "../../logger"

import {
    CreateUserDevice,
    CreateUserDeviceMutation,
    CreateUserDeviceMutationVariables,
    Maybe,
    UserDevice,
} from "../../types/generated/graphql"
import { performQuery } from "../gql"

const chlog = log.child({ namespace: "notifications-fcm" })

import {
    OutstandingFcmNotifications,
    OutstandingFcmNotificationsQuery,
    // UnsubscribeUserFcmNotifications,
    // UnsubscribeUserFcmNotificationsMutation,
    // UnsubscribeUserFcmNotificationsMutationVariables,
} from "../../types/generated/graphql"
import {
    enqueueNotification,
    getFcmNotificationChannelId,
    markNotificationAsJustSent,
    NotificationRecipient,
} from "./utils"
import type { NotificationParams } from "./params"
import type { FcmParamsV1 } from "./params/v1"
import type { messaging } from "firebase-admin"

let handleNotifications = false
let notificationHandler: NodeJS.Timeout | undefined

const NOTIFICATION_DELAY_MS = 250

export function listen() {
    chlog.debug("Listening for FCM notifications")
    handleNotifications = true
    sendNextFcmNotificationAfterDelay()
}

function sendNextFcmNotificationAfterDelay() {
    if (!handleNotifications) {
        return
    }
    notificationHandler = setTimeout(
        sendNextFcmNotification,
        NOTIFICATION_DELAY_MS
    )
}

/**
 * Stop handling FCM notifications.
 */
export function stop() {
    chlog.debug("Removing FCM notification listeners")
    handleNotifications = false
    if (notificationHandler) {
        clearTimeout(notificationHandler)
        notificationHandler = undefined
    }
}

async function sendNextFcmNotification() {
    if (!handleNotifications) {
        return
    }
    chlog.trace("Checking for FCM notification to be sent")
    const notification = await getNextOutstandingFcmNotification()
    if (!notification) {
        sendNextFcmNotificationAfterDelay()
        return
    }
    if (!handleNotifications) {
        return
    }
    const { recipient, recipientGroup } = notification
    const params = notification.params
        ? (JSON.parse(notification.params) as FcmParamsV1)
        : null
    if (!params) {
        chlog
            .child({ notification })
            .error("Not sending FCM notification, no params have been passed")
        sendNextFcmNotificationAfterDelay()
        return
    }
    const { message: messageParams, excludeUserUuids = [] } = params
    let tokens: string[] = []
    if (recipient) {
        if (!excludeUserUuids.includes(recipient.uuid)) {
            tokens = userDevicesToFcmTokens(recipient.userDevices)
        }
    } else if (recipientGroup) {
        for (const userNode of recipientGroup.groupUsers.nodes) {
            if (!userNode || !userNode.user) {
                continue
            }
            const { uuid, userDevices } = userNode.user
            if (excludeUserUuids.includes(uuid)) {
                continue
            }
            tokens = [...tokens, ...userDevicesToFcmTokens(userDevices)]
        }
    } else {
        chlog
            .child({ notification })
            .error(
                "FCM notifications require either a recipient or a recipient group"
            )
        sendNextFcmNotificationAfterDelay()
        return
    }
    const message: messaging.MulticastMessage = {
        tokens,
        ...messageParams,
    }
    // Only actually try to send the message and confirm if we have tokens to send it to.
    if (tokens.length) {
        const result = await getApp().messaging().sendMulticast(message)
        if (result.successCount <= 0) {
            chlog
                .child({ notification, result })
                .error("Failed to send at least one FCM message successfully")
            sendNextFcmNotificationAfterDelay()
            return
        }
    }
    const markedAsSent = await markNotificationAsJustSent(notification.id)
    if (!markedAsSent) {
        chlog
            .child({ message, notification, markedAsSent })
            .error(
                "After successfully sending an FCM message could not mark its corresponding notification as sent, aborting FCM notification listener"
            )
        // We need to abort here to prevent the same message from being sent repeatedly.
        stop()
        return
    }
    chlog.child({ message }).debug("Successfully sent an FCM message")
    sendNextFcmNotificationAfterDelay()
}

async function getNextOutstandingFcmNotification() {
    const res = await performQuery<OutstandingFcmNotificationsQuery>(
        OutstandingFcmNotifications.loc!.source,
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
                        .trace("FCM notification has expired")
                    return false
                }
            }
            if (notification.withheldUntil !== null) {
                const withheldUntil = Date.parse(notification.withheldUntil)
                if (now < withheldUntil) {
                    chlog
                        .child({ notification })
                        .trace("FCM notification is still withheld")
                    return false
                }
            }
            return true
        }) || null
    )
}

export async function enqueueFcmNotification(
    recipient: NotificationRecipient,
    expiresAt: Date | null,
    withheldUntil: Date | null,
    params: NotificationParams | null
) {
    const channelId = await getFcmNotificationChannelId()
    if (!channelId) {
        return null
    }
    chlog
        .child({ recipient, expiresAt, withheldUntil, params })
        .debug("Enqueuing FCM notification")
    return enqueueNotification(
        channelId,
        recipient,
        expiresAt,
        withheldUntil,
        params
    )
}

export async function createUserDevice(
    userDevice: CreateUserDeviceMutationVariables
): Promise<CreateUserDeviceMutation["createUserDevice"] | null> {
    const res = await performQuery<CreateUserDeviceMutation>(
        CreateUserDevice.loc!.source,
        { ...userDevice }
    )
    chlog.child({ userDevice }).debug("Successfully created user device")
    return res.data?.createUserDevice || null
}

function userDevicesToFcmTokens({
    nodes,
}: {
    nodes: Maybe<Pick<UserDevice, "fcmToken">>[]
}): string[] {
    return (
        nodes
            .filter((device) => device && device.fcmToken !== null)
            .map((device) => device!.fcmToken!) || []
    )
}

export default { listen, stop }
