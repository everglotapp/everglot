export interface TemplateEmailParamsV1 extends CommonEmailParamsV1 {
    templateId?: number
    templateParams?: object
}

export interface ManualTextEmailParamsV1 extends ManualEmailParamsV1 {
    textContent?: string
}

export interface ManualHtmlEmailParamsV1 extends ManualEmailParamsV1 {
    htmlContent?: string
}

interface ManualEmailParamsV1 extends CommonEmailParamsV1 {
    subject?: string
}

interface CommonEmailParamsV1 {
    from?: { email: string; name: string }
}

export type EmailParamsV1 =
    | TemplateEmailParamsV1
    | ManualTextEmailParamsV1
    | ManualHtmlEmailParamsV1

type FcmMessageParamsV1 = {
    notification?: {
        title?: string
        body?: string
        imageUrl?: string
    }
    data: {
        [key: string]: string
        type: FcmMessageParamsDataTypeV1
    }
    android?: any
    webpush?: any
    apns?: any
    fcmOptions?: {
        analyticsLabel?: string
    }
}

export type FcmParamsV1 = {
    message: FcmMessageParamsV1
    excludeUserUuids?: string[]
}

export enum FcmMessageParamsDataTypeV1 {
    GroupMessage = "GROUP_MESSAGE",
    PostLike = "POST_LIKE",
    PostReply = "POST_REPLY",
}
