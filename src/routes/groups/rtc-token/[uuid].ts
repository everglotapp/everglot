import { validate as uuidValidate } from "uuid"
import { RtcTokenBuilder, RtcRole } from "agora-access-token"

import { userIsInGroup } from "../../../server/groups"
import { getUserUuidById } from "../../../server/users"

import { AGORA_APP_ID } from "../../../constants"

import log from "../../../logger"
import { serverError } from "../../../helpers"

import type { Request, Response } from "express"

const { AGORA_APP_CERTIFICATE } = process.env
if (!AGORA_APP_CERTIFICATE || !AGORA_APP_CERTIFICATE.length) {
    log.error(
        "AGORA_APP_CERTIFICATE environment variable required. Users will not be able to join voice chats."
    )
}

export async function get(req: Request, res: Response, _next: () => void) {
    if (!req.session.user_id) {
        res.redirect("/")
        return
    }
    const userId = req.session.user_id
    const groupUuid = req.params["uuid"]
    // Check that this is an actual group UUID
    if (!groupUuid || !uuidValidate(groupUuid)) {
        log.child({
            userId,
            groupUuid,
        }).debug("Bad group UUID")
        res.json({
            success: false,
        })
        return
    }
    if (!userIsInGroup(userId, groupUuid)) {
        log.child({
            userId,
            groupUuid,
        }).debug("User not in group")
        res.json({
            success: false,
        })
        return
    }
    const userUuid = await getUserUuidById(userId)
    if (!userUuid) {
        log.child({
            userId,
            groupUuid,
        }).error("User UUID not found")
        serverError(res)
        return
    }
    log.child({
        userId,
        groupUuid,
    }).info("Generating RTC token")
    res.json({
        success: true,
        token: generateRtcToken(userUuid, groupUuid),
    })
}

function generateRtcToken(userUuid: string, groupUuid: string) {
    if (!AGORA_APP_CERTIFICATE || !AGORA_APP_CERTIFICATE.length) {
        return ""
    }
    const expireAfterSeconds = 86400
    const currentTimestamp = Math.floor(Date.now() / 1000)
    const expirationTimestamp = currentTimestamp + expireAfterSeconds

    // Build token with user account
    const rtcToken = RtcTokenBuilder.buildTokenWithAccount(
        AGORA_APP_ID,
        AGORA_APP_CERTIFICATE,
        groupUuid,
        userUuid,
        RtcRole.PUBLISHER,
        expirationTimestamp
    )
    return rtcToken
}
