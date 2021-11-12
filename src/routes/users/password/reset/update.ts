import bcrypt from "bcrypt"

import { notFound, serverError, unprocessableEntity } from "../../../../helpers"

import log from "../../../../logger"

const chlog = log.child({
    namespace: "users-password-reset",
})

import type { Request, Response } from "express"
import {
    getUserByResetPasswordToken,
    resetUserPassword,
} from "../../../../server/users"
import {
    BCRYPT_WORK_FACTOR,
    RESET_PASSWORD_TOKEN_VALID_SECONDS,
} from "../../../../server/constants"
import { MIN_PASSWORD_LENGTH } from "../../../../users"
import { getUserPasswordResetSuccessEmailNotification } from "../../../../server/notifications/users"
import { enqueueEmailNotification } from "../../../../server/notifications/email"
import { NotificationParamsVersion } from "../../../../server/notifications/params"

const NOTIFICATION_EXPIRY_SECONDS = 24 * 60 * 60
const NOTIFICATION_WITHHELD_SECONDS = 3
async function sendResetPasswordSuccessMail(userId: number, resetAt: Date) {
    const notificationData = await getUserPasswordResetSuccessEmailNotification(
        {
            id: userId,
        }
    )
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
        templateId: 19,
        templateParams: {
            username: username || "user",
            changeDetail: "Unknown location",
            date: resetAt.toUTCString(),
        },
        version: NotificationParamsVersion.V1,
    })
}

export async function post(req: Request, res: Response, _next: () => void) {
    const token = req.body["token"]
    if (!token || typeof token !== "string" || !token.length) {
        res.status(422).json({
            success: false,
            message: "Please specify a token.",
        })
        return
    }

    const password = req.body["password"]
    if (!password || typeof password !== "string") {
        res.status(422).json({
            success: false,
            message: "Please specify a new password.",
        })
        return
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
        res.status(422).json({
            success: false,
            message: `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
        })
        return
    }

    const user = await getUserByResetPasswordToken({
        resetPasswordToken: token,
    })
    if (!user) {
        chlog
            .child({
                token,
            })
            .debug("User by reset password token not found")
        notFound(
            res,
            "That didn't work. Did you use an old link? Please request a new mail to be sent to you at the bottom of this page."
        )
        return
    }
    const userId = user.id
    const tokenExpiresAt =
        Date.parse(user.resetPasswordTokenCreatedAt) +
        RESET_PASSWORD_TOKEN_VALID_SECONDS * 1000
    const tokenIsExpired = tokenExpiresAt < Date.now()
    if (tokenIsExpired) {
        chlog
            .child({
                token,
                userId,
            })
            .debug("Reset password token expired")
        notFound(res)
        return
    }

    if (user.googleId) {
        chlog
            .child({
                userId,
            })
            .warn("Reset password token valid but user has a Google account")
        unprocessableEntity(res)
        return
    }

    const passwordHash = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    if (!passwordHash) {
        chlog.child({ userId }).error("Failed to hash user password for reset")
        serverError(res)
        return
    }

    const success = await resetUserPassword({
        id: user.id,
        passwordHash,
    })
    const resetAt = new Date()
    if (!success) {
        chlog.child({ userId }).error("Failed to reset user password")
        serverError(res)
        return
    }
    chlog
        .child({
            userId,
        })
        .debug("Successfully reset user password")

    sendResetPasswordSuccessMail(userId, resetAt)

    // TODO: Clear all existing user sessions to log out any potential attackers.

    /**
     * Note that we could be logging the user in here automatically.
     * However in case someone intercepts the reset password URL somehow, they
     * might still not know the user's email address. In that case they will
     * be able to change the user's password but they won't be able to login
     * without the email address. So we're not making it easier for them.
     */

    res.status(200).json({
        success: true,
        message: null,
    })
}
