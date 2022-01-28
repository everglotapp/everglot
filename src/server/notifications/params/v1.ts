interface ITemplateEmailParamsV1<I extends number, P extends object>
    extends CommonEmailParamsV1 {
    templateId: I
    templateParams: P
}

export type TemplateEmailParamsV1 =
    | SignUpConfirmationTemplateEmailParamsV1
    | ResetPasswordTemplateEmailParamsV1
    | ResetPasswordSuccessTemplateEmailParamsV1
    | GroupAssignmentTemplateEmailParamsV1

export type SignUpConfirmationTemplateEmailParamsV1 = ITemplateEmailParamsV1<
    15,
    {
        username: string
        email: string
        confirmEmailUrl: string
        unsubscribeUrl: string
    }
>

export type ResetPasswordTemplateEmailParamsV1 = ITemplateEmailParamsV1<
    18,
    {
        username: string
        resetPasswordUrl: string
    }
>

export type ResetPasswordSuccessTemplateEmailParamsV1 = ITemplateEmailParamsV1<
    19,
    {
        username: string
        changeDetail: string
        date: string
    }
>

export type GroupAssignmentTemplateEmailParamsV1 = ITemplateEmailParamsV1<
    10,
    {}
>

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
    PostCorrection = "POST_CORRECTION",
    // PostGameAnswer = "POST_GAME_ANSWER",
    PostUserMention = "POST_USER_MENTION",
    UserFollowership = "USER_FOLLOWERSHIP",
}

interface AbstractInAppParamsV1 {
    type: InAppParamsTypeV1
    data: object | null
}

export type PostReplyInAppParamsV1 = {
    type: InAppParamsTypeV1.PostReply
    data: {
        userUuid: string
        postUuid: string
    }
}

export type PostLikeInAppParamsV1 = {
    type: InAppParamsTypeV1.PostLike
    data: {
        userUuid: string
        postUuid: string
    }
}

export type PostCorrectionInAppParamsV1 = {
    type: InAppParamsTypeV1.PostCorrection
    data: {
        userUuid: string
        postUuid: string
    }
}

export type PostUserMentionInAppParamsV1 = {
    type: InAppParamsTypeV1.PostUserMention
    data: {
        userUuid: string
        postUuid: string
    }
}

export type UserFollowershipInAppParamsV1 = {
    type: InAppParamsTypeV1.UserFollowership
    data: {
        userUuid: string
    }
}

export type InAppParamsV1 = AbstractInAppParamsV1 &
    (
        | PostReplyInAppParamsV1
        | PostLikeInAppParamsV1
        | PostCorrectionInAppParamsV1
        | PostUserMentionInAppParamsV1
        | UserFollowershipInAppParamsV1
    )

export enum InAppParamsTypeV1 {
    PostLike = "POST_LIKE",
    PostReply = "POST_REPLY",
    PostCorrection = "POST_CORRECTION",
    // PostGameAnswer = "POST_GAME_ANSWER",
    PostUserMention = "POST_USER_MENTION",
    UserFollowership = "USER_FOLLOWERSHIP",
}
