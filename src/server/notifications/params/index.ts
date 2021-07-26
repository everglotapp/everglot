import type { EmailParamsV1, FcmParamsV1 } from "./v1"

export enum NotificationParamsVersion {
    V1 = 1,
}
export type NotificationParamsV1 = { version: NotificationParamsVersion.V1 } & (
    | EmailParamsV1
    | FcmParamsV1
)

export type NotificationParams = NotificationParamsV1
