import log from "../../logger"

import type { BaseNotificationParams } from "./params"
import type { InAppParamsV1 } from "./params/v1"
import {
    enqueueNotification,
    getInAppNotificationChannelId,
    NotificationUserRecipient,
} from "./utils"

const chlog = log.child({ namespace: "notifications-in-app" })

export async function enqueueInAppNotification(
    recipient: NotificationUserRecipient,
    expiresAt: Date | null,
    withheldUntil: Date | null,
    params: (BaseNotificationParams & InAppParamsV1) | null
) {
    const channelId = await getInAppNotificationChannelId()
    if (!channelId) {
        return null
    }
    chlog
        .child({ recipient, expiresAt, withheldUntil, params })
        .debug("Enqueuing in-app notification")
    return enqueueNotification(
        channelId,
        recipient,
        expiresAt,
        withheldUntil,
        params
    )
}
