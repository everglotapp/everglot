import validateEmail from "deep-email-validator"

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
import { generateResetPasswordToken } from "../../../helpers/tokens"
import {
    APP_BASE_URL,
    RESET_PASSWORD_TOKEN_VALID_SECONDS,
} from "../../../server/constants"
import { getUserPasswordResetEmailNotification } from "../../../server/notifications/users"

const NOTIFICATION_EXPIRY_SECONDS = 24 * 60 * 60
const NOTIFICATION_WITHHELD_SECONDS = 3
async function sendResetPasswordMail(userId: number) {
    const notificationData = await getUserPasswordResetEmailNotification({
        id: userId,
    })
    if (!notificationData) {
        chlog
            .child({ userId })
            .error("No notification data for user password reset")
        return
    }
    const { user } = notificationData
    if (!user) {
        chlog
            .child({ userId, notificationData })
            .error("Missing notification data for user password reset")
        return
    }
    const expiresAt = new Date(Date.now() + NOTIFICATION_EXPIRY_SECONDS * 1000)
    const withheldUntil = new Date(
        Date.now() + NOTIFICATION_WITHHELD_SECONDS * 1000
    )
    const username =
        user.displayName && user.displayName.length
            ? user.displayName
            : user.username
    enqueueEmailNotification(userId, expiresAt, withheldUntil, {
        templateId: 18,
        templateParams: {
            username: username || "user",
            resetPasswordUrl: `${APP_BASE_URL}/users/password/reset/${user.resetPasswordToken}`,
        },
        version: NotificationParamsVersion.V1,
    })
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
        res.status(200).json({
            success: true,
            message: null,
        })
        return
    }
    const userId = oldPasswordResetData?.id

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
            .child({ email, userId })
            .debug(
                "User already has a valid password reset token, not regenerating"
            )
        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(200).json({
            success: true,
            message: null,
        })
        return
    }
    if (oldPasswordResetData.googleId) {
        chlog
            .child({ email, userId })
            .debug(
                "User has signed up via Google, they cannot reset their password"
            )

        // TODO: Send mail telling the user that this is is impossible

        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(200).json({
            success: true,
            message: null,
        })
        return
    }
    const token = await generateResetPasswordToken()
    if (token === null) {
        chlog
            .child({ email, userId })
            .debug("Failed to generate a reset password token")
        // Don't tell user about failures / not found. Timing attacks still possible.
        res.status(200).json({
            success: true,
            message: null,
        })
        return
    }
    chlog
        .child({ email, id: userId })
        .debug("Successfully generated a reset password token")

    const newPasswordResetData = await updateUserPasswordResetToken({
        id: userId,
        resetPasswordToken: token,
        resetPasswordTokenCreatedAt: new Date().toISOString(),
    })
    if (newPasswordResetData === null) {
        // Don't tell user about failures / not found. Timing attacks still possible.
        chlog
            .child({ email, userId })
            .debug("Failed to store a generated reset password token")
        res.status(200).json({
            success: true,
            message: null,
        })
        return
    }
    chlog
        .child({
            email,
            userId,
            resetPasswordTokenCreatedAt:
                newPasswordResetData?.user?.resetPasswordTokenCreatedAt || null,
        })
        .debug("Successfully saved a reset password token")

    setTimeout(() => {
        sendResetPasswordMail(userId)
    }, 200)

    // Don't tell user about failures / not found. Timing attacks still possible.
    res.status(200).json({
        success: true,
        message: null,
    })
}
