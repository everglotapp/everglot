import { forbidden, notFound, unprocessableEntity } from "../../../../helpers"

import log from "../../../../logger"

const chlog = log.child({
    namespace: "users-password-reset",
})

import type { Request, Response } from "express"
import {
    getUserByResetPasswordToken,
    resetUserPassword,
} from "../../../../server/users"
import { RESET_PASSWORD_TOKEN_VALID_SECONDS } from "../../../../server/constants"

export async function post(req: Request, res: Response, _next: () => void) {
    const token = req.params["token"]

    if (!token || typeof token !== "string" || !token.length) {
        res.status(422).json({
            success: false,
            message: "Please specify a token.",
        })
        return
    }

    const password = req.params["password"]
    // TODO: Check password validity

    const user = await getUserByResetPasswordToken(token)
    if (!user) {
        chlog
            .child({
                token,
            })
            .debug("User by reset password token not found")
        notFound(res)
        return
    }
    const tokenExpiresAt =
        Date.parse(user.resetPasswordTokenCreatedAt) +
        RESET_PASSWORD_TOKEN_VALID_SECONDS * 1000
    const tokenIsExpired = tokenExpiresAt >= Date.now()
    if (tokenIsExpired) {
        chlog
            .child({
                token,
            })
            .debug("Reset password token expired")
        notFound(res)
        return
    }

    if (user.googleId) {
        chlog
            .child({
                userId: user.id,
            })
            .warn("Reset password token valid but user has a Google account")
        unprocessableEntity(res)
        return
    }

    const newPasswordResetData = await resetUserPassword({
        id: user.id,
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
