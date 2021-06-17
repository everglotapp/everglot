import { getApp } from "../../../../server/firebase"

import log from "../../../../logger"
import { unprocessableEntity } from "../../../../helpers"

const chlog = log.child({
    namespace: "fcm-token",
})

import type { Request, Response } from "express"

async function fcmTokenValid(token: string): Promise<boolean> {
    try {
        const dryRun = true
        await getApp().messaging().send(
            {
                token,
            },
            dryRun
        )
        return true
    } catch (_e) {
        return false
    }
}

export async function post(req: Request, res: Response, _next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    const fcmToken = req.params["token"]
    if (!fcmToken || typeof fcmToken !== "string" || !fcmToken.length) {
        chlog.child({ fcmToken, userId }).debug("Malformed FCM token")
        unprocessableEntity(res, "Malformed FCM token")
        return
    }
    if (!(await fcmTokenValid(fcmToken))) {
        chlog.child({ fcmToken, userId }).debug("Invalid FCM token")
        unprocessableEntity(res, "Invalid FCM token")
        return
    }
    chlog.child({ fcmToken, userId }).debug("FCM token valid")
    // TODO: Store FCM token (if not stored yet)
    res.json({ success: true })
}
