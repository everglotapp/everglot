import type { EmailParamsV1, FcmParamsV1, InAppParamsV1 } from "./v1"

export enum NotificationParamsVersion {
    V1 = 1,
}

export type BaseNotificationParamsV1 = {
    version: NotificationParamsVersion.V1
}
export type BaseNotificationParams = BaseNotificationParamsV1
export type NotificationParamsV1 = BaseNotificationParamsV1 &
    (EmailParamsV1 | FcmParamsV1 | InAppParamsV1)

export type NotificationParams = NotificationParamsV1
