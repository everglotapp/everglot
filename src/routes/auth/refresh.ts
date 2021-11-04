import { validate as uuidValidate } from "uuid"

import log from "../../logger"
import { serverError, unprocessableEntity } from "../../helpers"

const chlog = log.child({
    namespace: "auth-refresh-token",
})

import type { Request, Response } from "express"
import { getUserIdByUuid } from "../../server/users"
import {
    generateRefreshToken,
    verifyRefreshTokenIntegrity,
    validateRefreshTokenIdentity,
    invalidateRefreshToken,
    createRefreshToken,
    REFRESH_TOKEN_JTI_GENERATOR,
} from "../../server/auth/refreshTokens"

/**
 * Public POST endpoint.
 * Gets a refresh token, validates it, extracts user's UUID and
 * sees if signature matches the one for the user,
 * regenerates refresh token and signs user in.
 */
export async function get(req: Request, res: Response, _next: () => void) {
    const token = req.query["token"]
    if (!token || typeof token !== "string" || !token.length) {
        chlog.debug("Empty or non-string refresh token")
        unprocessableEntity(res, "Token required")
        return
    }
    // Validate token signature (i.e. if JWT was signed by one of our own keys)
    const verificationResult = await verifyRefreshTokenIntegrity(token)
    if (!verificationResult) {
        chlog.debug("Invalid or corrupt token")
        unprocessableEntity(res, "Invalid token")
        return
    }
    const { payload } = verificationResult
    // Extract user UUID
    const { userUuid } = payload
    if (!uuidValidate(userUuid)) {
        chlog.child({ verificationResult, userUuid }).debug("Invalid user UUID")
        unprocessableEntity(res, "Invalid user UUID")
        return
    }
    const userId = await getUserIdByUuid(userUuid)
    if (!userId) {
        chlog
            .child({ verificationResult, userUuid, userId })
            .debug("Invalid user UUID")
        unprocessableEntity(res, "Unknown user UUID")
        return
    }
    // Check if JTI matches the user's, check in DB
    const validDatabaseToken = await validateRefreshTokenIdentity(
        verificationResult,
        userId
    )
    if (!validDatabaseToken) {
        chlog
            .child({ verificationResult, userId })
            .warn("Token has invalid identity")
        unprocessableEntity(res)
        return
    }
    if (!validDatabaseToken.user) {
        chlog.error("Valid refresh token has no user")
        serverError(res)
        return
    }
    // Invalidate old token
    const invalidationResult = await invalidateRefreshToken(
        validDatabaseToken.id
    )
    if (!invalidationResult) {
        chlog
            .child({ refreshTokenId: validDatabaseToken.id, userId })
            .debug("Failed to invalidate refresh token")
        serverError(res)
        return
    }
    // Generate new refresh token
    const jti = await REFRESH_TOKEN_JTI_GENERATOR.generate().catch(() => null)
    if (!jti) {
        chlog
            .child({ refreshTokenId: validDatabaseToken.id, userId })
            .debug("Failed to generate JTI (JWT ID)")
        serverError(res)
        return
    }
    const newToken = await generateRefreshToken(
        jti,
        validDatabaseToken.user.uuid
    )
    const newDatabaseToken = await createRefreshToken({ jti, userId })
    if (!newDatabaseToken) {
        chlog
            .child({ oldRefreshTokenId: validDatabaseToken.id, jti, userId })
            .debug("Failed to insert new refresh token")
        serverError(res)
        return
    }
    // Regenerate session ID and set respective cookie
    req.session.regenerate(function (err: any) {
        if (err) {
            log.info("Failed to (re)generate session: %s", err.message)
            serverError(res)
        } else {
            req.session.user_id = userId!
            res.status(200).json({
                success: true,
                refreshToken: newToken,
            })
        }
    })
}
