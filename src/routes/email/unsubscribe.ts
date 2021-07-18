import type { Request, Response } from "express"
import { unsubscribeUserEmailNotifications } from "../../server/notifications/email"

export async function post(req: Request, res: Response, _next: () => void) {
    const unsubscribeToken = req?.body?.token
    if (
        unsubscribeToken &&
        typeof unsubscribeToken === "string" &&
        unsubscribeToken.length
    ) {
        const result = await unsubscribeUserEmailNotifications(unsubscribeToken)
        if (result) {
            res.status(200).redirect("/email/unsubscribe/success")
            return
        }
    }
    res.status(404).redirect("/email/unsubscribe/failure")
}
