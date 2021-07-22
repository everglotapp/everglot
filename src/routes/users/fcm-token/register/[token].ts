import { getApp } from "../../../../server/firebase"

import log from "../../../../logger"
import { unprocessableEntity } from "../../../../helpers"

const chlog = log.child({
    namespace: "fcm-token",
})

import type { Request, Response } from "express"
import { createUserDevice } from "../../../../server/notifications/fcm"

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
    if (!(await fcmTokenValid(fcmToken))) {
        chlog.child({ fcmToken, userId }).debug("Invalid FCM token")
        unprocessableEntity(res, "Invalid FCM token")
        return
    }
    chlog.child({ fcmToken, userId }).debug("FCM token valid")
    const userDevice = await createUserDevice({ userId, fcmToken })
    if (userDevice) {
        chlog
            .child({ userDevice })
            .debug("Registered user device with FCM token")
        res.json({
            success: true,
            message: "Your device has been registered successfully",
        })
    } else {
        res.json({
            success: false,
        })
    }
}
