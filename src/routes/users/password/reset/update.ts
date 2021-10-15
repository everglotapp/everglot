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
    const tokenExpiresAt =
        Date.parse(user.resetPasswordTokenCreatedAt) +
        RESET_PASSWORD_TOKEN_VALID_SECONDS * 1000
    const tokenIsExpired = tokenExpiresAt < Date.now()
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

    const passwordHash = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    if (!passwordHash) {
        chlog
            .child({ id: user.id })
            .error("Failed to hash user password for reset")
        serverError(res)
        return
    }

    const success = await resetUserPassword({
        id: user.id,
        passwordHash,
    })
    if (!success) {
        chlog.child({ id: user.id }).error("Failed to reset user password")
        serverError(res)
        return
    }
    chlog
        .child({
            id: user.id,
        })
        .debug("Successfully reset user password")
    // TODO: Send mail
    //sendResetPasswordMail()

    req.session.regenerate(function (err: any) {
        if (err) {
            chlog.child({ id: user.id }).error(err.message)
            serverError(res)
        } else {
            req.session.user_id = user.id
            res.status(200).json({
                success: true,
                message: null,
            })
        }
    })
}
