import type { Request, Response } from "express"
import { unsubscribeUserEmailNotifications } from "../../server/notifications/email"

import log from "../../logger"
const chlog = log.child({
    namespace: "email-unsubscribe",
})

export async function get(req: Request, res: Response, _next: () => void) {
    const token = req.query["token"]

    if (token && typeof token === "string" && token.length) {
        const result = await unsubscribeUserEmailNotifications(token)
        if (result) {
            res.status(200).redirect("/email/unsubscribe/success")
            chlog
                .child({ token, result })
                .info("Successfully unsubscribed user from email notifications")
            return
        } else {
            chlog.child({ token }).debug("User passed invalid token")
        }
    } else {
        chlog.child({ token }).debug("User did not pass a token")
    }
    res.status(404).redirect("/email/unsubscribe/failure")
}
