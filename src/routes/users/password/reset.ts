import validateEmail from "deep-email-validator"

import { forbidden, unprocessableEntity } from "../../../helpers"

import log from "../../../logger"

const chlog = log.child({
    namespace: "users-password-reset",
})

import type { Request, Response } from "express"
import {
    getUserPasswordResetDataByEmail,
    updateUserPasswordResetToken,
} from "../../../server/users"
import { enqueueEmailNotification } from "../../../server/notifications/email"
import { NotificationParamsVersion } from "../../../server/notifications/params"
import { EmailParamsV1 } from "../../../server/notifications/params/v1"
import { generateResetPasswordToken } from "../../../helpers/tokens"
import { RESET_PASSWORD_TOKEN_VALID_SECONDS } from "../../../server/constants"

async function sendResetPasswordMail(u: { id: number }) {
    const notificationData = await getUserFollowershipNotification(
        userFollower.id
    )
    if (!notificationData) {
        chlog
            .child({ userFollower })
            .error("No notification data for user followership")
        return
    }
    const { follower, user } = notificationData
    if (!follower || !user) {
        chlog
            .child({ userFollower, notificationData })
            .error("Missing notification data for user followership")
        return
    }
    const expiresAt = new Date(Date.now() + NOTIFICATION_EXPIRY_SECONDS * 1000)
    const withheldUntil = new Date(
        Date.now() + NOTIFICATION_WITHHELD_SECONDS * 1000
    )
    const username =
        follower.displayName && follower.displayName.length
            ? follower.displayName
            : follower.username
    enqueueEmailNotification(
        { userId: user.id, groupId: null },
        expiresAt,
        withheldUntil,
        {
            message: {
                notification: {
                    title: `${
                        username && username.length ? username : "Someone"
                    } now follows you`,
                },
                data: {
                    type: EmailMessageParamsDataTypeV1.ResetPassword,
                },
            },
            version: NotificationParamsVersion.V1,
        }
    )
}

type InvalidEmailReason = "regex"

export async function post(req: Request, res: Response, _next: () => void) {
    const email = req.body["email"]

    if (!email || typeof email !== "string" || !email.length) {
        res.status(422).json({
            success: false,
            message: "Please specify an email address.",
        })
        return
    }

    const emailValidation = await validateEmail({
        email,
        /**
         * Only check basic format for sanity, otherwise assume email to be correct.
         * It needs to exist in the database anyways.
         */
        validateRegex: true,
        validateMx: false,
        validateTypo: false,
        validateDisposable: false,
        validateSMTP: false,
    })
    if (!emailValidation.valid) {
        const { validators, reason } = emailValidation
        let invalidEmailMsg = "Please double-check that email address."
        if (
            typeof reason !== "undefined" &&
            validators.hasOwnProperty(reason) &&
            validators[reason as InvalidEmailReason]
        ) {
            chlog
                .child({
                    email,
                    reason: validators[reason as InvalidEmailReason]!.reason,
                    emailValidation,
                })
                .debug("User provided an invalid email")
            invalidEmailMsg = {
                regex: "That email address looks wrong to us.",
            }[reason as InvalidEmailReason]
        } else {
            chlog
                .child({
                    email,
                    emailValidation,
                })
                .debug("User provided an invalid email")
        }
        res.status(422).json({
            success: false,
            message: invalidEmailMsg,
        })
        return
    }
    // TODO: Find user by email
    const oldPasswordResetData = await getUserPasswordResetDataByEmail({
        email,
    })
    if (oldPasswordResetData === null) {
        chlog
            .child({ email })
            .debug(
                "Email to send reset password token to not found in database"
            )
        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(422).json({
            success: true,
            message: null,
        })
        return
    }

    let userHasValidToken: boolean = false
    if (oldPasswordResetData.resetPasswordTokenCreatedAt) {
        const tokenExpiresAt =
            Date.parse(oldPasswordResetData.resetPasswordTokenCreatedAt) +
            RESET_PASSWORD_TOKEN_VALID_SECONDS * 1000
        const tokenIsExpired = tokenExpiresAt >= Date.now()
        if (!tokenIsExpired) {
            userHasValidToken = true
        }
    }

    // TODO: Use mail history to enforce a minimum time delay before it can be sent again
    // instead of preventing a regeneration simply because it hasn't expired
    if (userHasValidToken) {
        chlog
            .child({ email, id: oldPasswordResetData?.id })
            .debug(
                "User already has a valid password reset token, not regenerating"
            )
        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(422).json({
            success: true,
            message: null,
        })
        return
    }
    if (oldPasswordResetData.googleId) {
        chlog
            .child({ email, id: oldPasswordResetData?.id })
            .debug(
                "User has signed up via Google, they cannot reset their password"
            )

        // TODO: Send mail telling the user that this is is impossible

        // Don't tell user about failures / not found. Timing attacks still possible.
        // res.status(422).json({
        //     success: true,
        //     message: null,
        // })
        // return
    }
    const token = await generateResetPasswordToken()
    if (token === null) {
        chlog
            .child({ email, id: oldPasswordResetData?.id })
            .debug("Failed to generate a reset password token")
        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(422).json({
            success: true,
            message: null,
        })
        return
    }
    chlog
        .child({ email, id: oldPasswordResetData?.id })
        .debug("Successfully generated a reset password token")

    const newPasswordResetData = await updateUserPasswordResetToken({
        id: oldPasswordResetData?.id,
        resetPasswordToken: token,
        resetPasswordTokenCreatedAt: new Date().toISOString(),
    })
    if (newPasswordResetData === null) {
        // Don't tell user about failures / not found. Timing attacks still possible.
        chlog
            .child({ email, id: oldPasswordResetData?.id })
            .debug("Failed to store a generated reset password token")
        res.status(422).json({
            success: true,
            message: null,
        })
        return
    }
    chlog
        .child({
            email,
            id: oldPasswordResetData?.id,
            resetPasswordTokenCreatedAt:
                newPasswordResetData?.user?.resetPasswordTokenCreatedAt || null,
        })
        .debug("Successfully saved a reset password token")
    // TODO: Send mail
    //sendResetPasswordMail()

    // Don't tell user about failures / not found. Timing attacks still possible.
    res.status(422).json({
        success: true,
        message: null,
    })
}
