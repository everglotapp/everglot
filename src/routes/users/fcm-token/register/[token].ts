import { getApp } from "../../../../server/firebase"

import log from "../../../../logger"
import { unprocessableEntity } from "../../../../helpers"

const chlog = log.child({
    namespace: "fcm-token",
})

import type { Request, Response } from "express"
import { getUserUuidById } from "../../../../server/users"

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

export const userFcmToken: Record<string, string> = {}

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
    // TODO: Store FCM token in database (if not stored yet)
    const userUuid = await getUserUuidById(userId)
    if (userUuid) {
        userFcmToken[userUuid] = fcmToken
    }
    res.json({ success: true })
}
