import { validate as uuidValidate } from "uuid"
import { RtcTokenBuilder, RtcRole } from "agora-access-token"

import { userIsInGroup } from "../../../server/groups"
import { getUserUuidById } from "../../../server/users"

import { AGORA_APP_ID } from "../../../constants"

import log from "../../../logger"
import { serverError } from "../../../helpers"

import type { Request, Response } from "express"
import { RTC_TOKEN_VALID_SECONDS } from "../../../server/constants"

const { AGORA_APP_CERTIFICATE } = process.env
if (!AGORA_APP_CERTIFICATE || !AGORA_APP_CERTIFICATE.length) {
    log.error(
        "AGORA_APP_CERTIFICATE environment variable required. Users will not be able to join voice chats."
    )
}

const chlog = log.child({
    namespace: "rtc-token",
})

export async function get(req: Request, res: Response, _next: () => void) {
    if (!req.session.user_id) {
        res.redirect("/")
        return
    }
    const userId = req.session.user_id
    const groupUuid = req.params["uuid"]
    // Check that this is an actual group UUID
    if (!groupUuid || !uuidValidate(groupUuid)) {
        chlog
            .child({
                userId,
                groupUuid,
            })
            .debug("Bad group UUID")
        res.json({
            success: false,
        })
        return
    }
    if (!userIsInGroup(userId, groupUuid)) {
        chlog
            .child({
                userId,
                groupUuid,
            })
            .debug("User not in group")
        res.json({
            success: false,
        })
        return
    }
    const userUuid = await getUserUuidById(userId)
    if (!userUuid) {
        chlog
            .child({
                userId,
                groupUuid,
            })
            .error("User UUID not found")
        serverError(res)
        return
    }
    chlog
        .child({
            userId,
            groupUuid,
        })
        .info("Generating Agora RTC token")
    res.json({
        success: true,
        token: generateRtcToken(userUuid, groupUuid),
    })
}

function generateRtcToken(userUuid: string, groupUuid: string) {
    if (!AGORA_APP_CERTIFICATE || !AGORA_APP_CERTIFICATE.length) {
        return ""
    }
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const expirationTimestamp = currentTimestamp + RTC_TOKEN_VALID_SECONDS

    // Build token with user account
    const channelName = groupUuid
    const account = userUuid
    const role = RtcRole.PUBLISHER
    const rtcToken = RtcTokenBuilder.buildTokenWithAccount(
        AGORA_APP_ID,
        AGORA_APP_CERTIFICATE,
        channelName,
        account,
        role,
        expirationTimestamp
    )
    chlog
        .child({
            account,
            channelName,
            role,
            expirationTimestamp,
            AGORA_APP_ID,
        })
        .debug("Successfully generated RTC token")
    return rtcToken
}
