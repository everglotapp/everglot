import type { Request, Response } from "express"

import log from "../../logger"
import {
    confirmUserEmail,
    getUserByEmailConfirmToken,
} from "../../server/users/email"

const chlog = log.child({
    namespace: "email-confirm",
})

export async function get(req: Request, res: Response, _next: () => void) {
    const token = req.query["token"]

    if (!token || typeof token !== "string" || !token.length) {
        chlog.child({ token }).debug("User did not pass a token")
        res.status(404).redirect("/email/confirm/failure")
        return
    }

    const user = await getUserByEmailConfirmToken({
        emailConfirmToken: token,
    })

    if (!user) {
        chlog.child({ token }).debug("User passed invalid token")
        res.status(404).redirect("/email/confirm/failure")
        return
    }

    const { unconfirmedEmail, emailConfirmTokenCreatedAt } = user

    // TODO: Check confim token creation date
    if (!emailConfirmTokenCreatedAt) {
        chlog
            .child({ token, unconfirmedEmail })
            .debug("User passed valid token but has empty unconfirmed email")
        res.status(404).redirect("/email/confirm/failure")
        return
    }

    if (!unconfirmedEmail) {
        chlog
            .child({ token, unconfirmedEmail })
            .debug("User passed valid token but has empty unconfirmed email")
        res.status(404).redirect("/email/confirm/failure")
        return
    }

    const result = await confirmUserEmail({
        id: user.id,
        email: unconfirmedEmail,
        emailConfirmedAt: new Date().toISOString(),
    })
    if (!result) {
        chlog
            .child({ token, userUuid: user.uuid })
            .debug("User email confirmation failed")
        res.status(404).redirect("/email/confirm/failure")
        return
    }
    res.status(200).redirect("/email/confirm/success")
    chlog.child({ token, result }).info("Successfully confirmed user email")
}
