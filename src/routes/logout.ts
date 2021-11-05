import { validate as uuidValidate } from "uuid"

import { ensureJson, serverError, unprocessableEntity } from "../helpers"

import log from "../logger"

const chlog = log.child({ namespace: "logout" })

import type { Request, Response } from "express"
import {
    findRefreshTokenByUserIdAndJti,
    invalidateRefreshToken,
    verifyRefreshTokenIntegrity,
} from "../server/auth/refreshTokens"
import { getUserIdByUuid } from "../server/users"

export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
    if (!req.session.user_id) {
        serverError(res)
        return
    }
    const userId = req.session.user_id
    const refreshTokenInput = req.body["refreshToken"]
    if (
        refreshTokenInput &&
        typeof refreshTokenInput === "string" &&
        refreshTokenInput.length
    ) {
        // Validate token signature (i.e. if JWT was signed by one of our own keys)
        const verificationResult = await verifyRefreshTokenIntegrity(
            refreshTokenInput
        )
        if (verificationResult) {
            const { payload } = verificationResult
            if (!payload.jti || !payload.jti.length) {
                chlog
                    .child({ verificationResult, userId })
                    .error("Empty payload JTI (JWT ID)")
                unprocessableEntity(res, "Invalid refresh token")
                return
            }
            // Extract user UUID
            const { userUuid } = payload
            if (!uuidValidate(userUuid)) {
                chlog
                    .child({ verificationResult, userId, userUuid })
                    .error("Invalid user UUID")
                unprocessableEntity(res, "Invalid refresh token")
                return
            }
            const tokenUserId = await getUserIdByUuid(userUuid)
            if (!tokenUserId) {
                chlog
                    .child({ verificationResult, userUuid, userId })
                    .error("Invalid user UUID")
                unprocessableEntity(res, "Unknown refresh token")
                return
            }
            if (userId !== tokenUserId) {
                chlog
                    .child({ verificationResult, userUuid, userId })
                    .error("Token user ID does not match signed in user's ID")
                unprocessableEntity(res, "Unknown refresh token")
                return
            }
            // Find a possible refresh token and remove it
            const refreshToken = await findRefreshTokenByUserIdAndJti(
                userId,
                payload.jti
            )
            if (refreshToken) {
                if (refreshToken.user) {
                    // Invalidate old token
                    const invalidationResult = await invalidateRefreshToken(
                        refreshToken.id
                    )
                    if (!invalidationResult) {
                        chlog
                            .child({ refreshTokenId: refreshToken.id, userId })
                            .error("Failed to invalidate refresh token")
                    }
                }
            } else {
                chlog
                    .child({ jti: payload.jti, userId })
                    .info(
                        "User presented a refresh token during logout but token did not exist in database"
                    )
            }
        } else {
            chlog
                .child({ userId, refreshTokenInput })
                .info("Invalid or corrupt refresh token")
            unprocessableEntity(res, "Invalid refresh token")
            return
        }
    }
    req.session.destroy((err: any) => {
        if (err) {
            chlog.child({ err }).error("Failed to destroy session")
            serverError(res)
        } else {
            chlog.debug("Successfully destroyed session")
            res.status(200).json({
                success: true,
                message: null,
            })
        }
    })
}
