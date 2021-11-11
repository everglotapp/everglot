import { jwtVerify, SignJWT, JWTVerifyResult, importJWK } from "jose"

import type {
    FlattenedJWSInput,
    JWK,
    JWSHeaderParameters,
    JWTPayload,
} from "jose/dist/types/types"
import {
    CreateRefreshToken,
    CreateRefreshTokenMutation,
    CreateRefreshTokenMutationVariables,
    InvalidateRefreshToken,
    InvalidateRefreshTokenMutation,
    UserRefreshTokens,
    UserRefreshTokensQuery,
    UserRefreshTokensQueryVariables,
} from "../../types/generated/graphql"
import { performQuery } from "../gql"

import JWKSet, { isJWKLike } from "../../helpers/jwks"

import log from "../../logger"
import UIDGenerator from "uid-generator"
import { validate as uuidValidate } from "uuid"
import { exit } from "process"

const chlog = log.child({ namespace: "auth-refresh-tokens" })

const { REFRESH_TOKEN_SECRET_KEY, REFRESH_TOKEN_JWKS } = process.env

export const REFRESH_TOKEN_JTI_GENERATOR = new UIDGenerator(
    512,
    UIDGenerator.BASE66
)

const REFRESH_TOKEN_ALGORITHM = "EdDSA"

type RefreshTokenPayload = JWTPayload & {
    userUuid: string
}

const REFRESH_TOKEN_ISSUER = "urn:everglot:app.everglot.com"
const REFRESH_TOKEN_AUDIENCE = "urn:everglot:app.everglot.com"
const REFRESH_TOKEN_EXPIRATION_SECS = 60 * 60 * 24 * 15 // 15 days in seconds

export async function verifyRefreshTokenIntegrity(token: string) {
    let payload: RefreshTokenPayload | undefined
    let protectedHeader: JWTVerifyResult["protectedHeader"] | undefined
    let valid: boolean = false
    try {
        const verifyResult = await jwtVerify(
            token,
            getMatchingRefreshTokenPublicKey,
            {
                algorithms: [REFRESH_TOKEN_ALGORITHM],
                issuer: REFRESH_TOKEN_ISSUER,
                audience: REFRESH_TOKEN_AUDIENCE,
                maxTokenAge: REFRESH_TOKEN_EXPIRATION_SECS,
            }
        )
        if (verifyResult.payload && verifyResult.protectedHeader) {
            valid = true
            payload = verifyResult.payload as RefreshTokenPayload
            protectedHeader = verifyResult.protectedHeader
        }
    } catch (err: any) {
        chlog
            .child({ message: err.message })
            .info(
                "A refresh token's integrity could not be verified (likely no matching public key was found)"
            )
    }
    if (!valid || !payload || !protectedHeader) {
        return null
    }
    return { payload, protectedHeader }
}

export async function validateRefreshTokenIdentity(
    verificationResult: {
        payload: RefreshTokenPayload
        protectedHeader: JWTVerifyResult["protectedHeader"]
    },
    userId: number
) {
    const { payload } = verificationResult
    if (!payload.jti || !payload.jti.length) {
        chlog.child({ verificationResult }).warn("JTI is empty")
        return null
    }
    const token = await findRefreshTokenByUserIdAndJti(userId, payload.jti)
    if (!token) {
        return null
    }
    if (token.usedAt) {
        chlog
            .child({ verificationResult, userId, tokenId: token.id })
            .warn(
                "A refresh token's JTI has been re-used in a possible replay attack attempt"
            )
        return null
    }
    return token
}

export async function findRefreshTokenByUserIdAndJti(
    userId: number,
    jti: string
) {
    // Get all refresh tokens for the user ordered reverse chronologically
    const tokens = await getRefreshTokens({ userId })
    return tokens?.find((token) => token.jti === jti) || null
}

export async function generateRefreshToken(jti: string, userUuid: string) {
    const { key, jwk } = await getRefreshTokenPrivateKey()
    const epoch = () => Math.floor(new Date().getTime() / 1000)
    return await new SignJWT({
        userUuid,
    } as RefreshTokenPayload)
        .setProtectedHeader({ kid: jwk.kid, alg: REFRESH_TOKEN_ALGORITHM })
        .setIssuedAt()
        .setIssuer(REFRESH_TOKEN_ISSUER)
        .setAudience(REFRESH_TOKEN_AUDIENCE)
        .setExpirationTime(epoch() + REFRESH_TOKEN_EXPIRATION_SECS)
        .setJti(jti)
        .sign(key)
}

async function getRefreshTokens(vars: UserRefreshTokensQueryVariables) {
    const res = await performQuery<UserRefreshTokensQuery>(
        UserRefreshTokens.loc!.source,
        vars
    )
    if (!res.data) {
        return null
    }
    return (
        res.data.refreshTokens?.nodes.filter(Boolean).map((node) => node!) ||
        null
    )
}

export async function invalidateRefreshToken(refreshTokenId: number) {
    const res = await performQuery<InvalidateRefreshTokenMutation>(
        InvalidateRefreshToken.loc!.source,
        { id: refreshTokenId, usedAt: new Date().toISOString() }
    )
    if (
        !res.data ||
        !res.data.updateRefreshToken ||
        !res.data.updateRefreshToken.refreshToken
    ) {
        chlog
            .child({ refreshTokenId })
            .error("Failed to invalidate a refresh token")
        return null
    }
    chlog
        .child({ refreshTokenId })
        .debug("Successfully invalidated a refresh token")
    return res.data.updateRefreshToken.refreshToken
}

export async function createRefreshToken(
    vars: CreateRefreshTokenMutationVariables
) {
    const res = await performQuery<CreateRefreshTokenMutation>(
        CreateRefreshToken.loc!.source,
        vars
    )
    if (
        !res.data ||
        !res.data.createRefreshToken ||
        !res.data.createRefreshToken.refreshToken
    ) {
        chlog
            .child({ userId: vars.userId })
            .error("Failed to create a refresh token")
        return null
    }
    chlog
        .child({ userId: vars.userId })
        .debug("Successfully created a refresh token")
    return res.data.createRefreshToken.refreshToken
}

async function getRefreshTokenPrivateKey() {
    if (!REFRESH_TOKEN_SECRET_KEY || !REFRESH_TOKEN_SECRET_KEY.length) {
        chlog.error("REFRESH_TOKEN_SECRET_KEY environment variable required.")
        exit(1)
    }
    try {
        const jwk = JSON.parse(REFRESH_TOKEN_SECRET_KEY)
        if (!isJWKLike(jwk)) {
            chlog.fatal(
                "REFRESH_TOKEN_SECRET_KEY environment variable must be a valid JWK (JSON Web Key)."
            )
            exit(1)
        }
        if (!jwk.kid) {
            chlog.fatal("REFRESH_TOKEN_SECRET_KEY must contain a kid claim.")
            exit(1)
        }
        if (!jwk.kid || !uuidValidate(jwk.kid)) {
            chlog
                .child({ kid: jwk.kid })
                .fatal(
                    "REFRESH_TOKEN_SECRET_KEY kid claim must be a valid UUID."
                )
            exit(1)
        }
        return {
            key: await importJWK(jwk as JWK, REFRESH_TOKEN_ALGORITHM),
            jwk,
        }
    } catch (err: any) {
        chlog
            .child({ message: err.message })
            .fatal(
                "Failed to parse REFRESH_TOKEN_SECRET_KEY environment variable."
            )
        exit(1)
    }
}

async function getMatchingRefreshTokenPublicKey(
    protectedHeader: JWSHeaderParameters,
    _token?: FlattenedJWSInput | undefined
) {
    return await getRefreshTokenPublicJWKS().getKey(protectedHeader)
}

function getRefreshTokenPublicJWKS(): JWKSet {
    if (!REFRESH_TOKEN_JWKS || !REFRESH_TOKEN_JWKS.length) {
        chlog
            .child({ REFRESH_TOKEN_JWKS })
            .fatal("REFRESH_TOKEN_JWKS environment variable required.")
        exit(1)
    }
    try {
        const jwks = new JWKSet()
        jwks.load(REFRESH_TOKEN_JWKS)
        return jwks
    } catch (err: any) {
        chlog
            .child({ REFRESH_TOKEN_JWKS, message: err.message })
            .fatal("REFRESH_TOKEN_JWKS environment variable required.")
        exit(1)
    }
}
