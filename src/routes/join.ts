import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import validateEmail from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"

import { DATABASE_SCHEMA, db } from "../server/db"

import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import {
    createInviteToken,
    getInviteTokenIdByToken,
} from "../server/inviteTokens"
import { ensureJson, serverError } from "../helpers"
import {
    generateInviteToken,
    generateEmailUnsubscribeToken,
    generateEmailConfirmToken,
} from "../helpers/tokens"
import {
    GOOGLE_WEB_SIGNIN_CLIENT_ID,
    GOOGLE_SIGNIN_AUDIENCE,
} from "../constants"

import log from "../logger"
// import {
//     createGroup,
//     getUsersWithoutLearnerGroup,
//     getUsersWithoutNativeGroup,
// } from "../server/groups"

const chlog = log.child({ namespace: "join" })

import type { Request, Response } from "express"
import type { Maybe } from "../types/generated/graphql"
import { BCRYPT_WORK_FACTOR } from "../server/constants"
import {
    createRefreshToken,
    generateRefreshToken,
    REFRESH_TOKEN_JTI_GENERATOR,
} from "../server/auth/refreshTokens"
import { enqueueEmailNotification } from "../server/notifications/email"
import { NotificationParamsVersion } from "../server/notifications/params"

const NOTIFICATION_EXPIRY_SECONDS = 30 * 24 * 60 * 60 // 30 days
const NOTIFICATION_WITHHELD_SECONDS = 0

type InvalidEmailReason = "smtp" | "regex" | "typo" | "mx" | "disposable"

async function resolveInviteTokenId(token: unknown) {
    if (!token || typeof token !== "string") {
        return null
    }
    return (await getInviteTokenIdByToken(token)) || null
}

export function get(req: Request, res: Response, next: () => void) {
    if (req.session.user_id) {
        res.redirect("/")
        return
    }
    next()
}
export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }

    if (req.session.user_id) {
        res.redirect("/")
        return
    }

    const authMethod = req?.body?.method
    if (
        !authMethod ||
        typeof authMethod !== "string" ||
        !Object.values(AuthMethod).includes(authMethod as AuthMethod)
    ) {
        res.status(422).json({
            success: false,
            message: "Please specify an auth method.",
        })
        return
    }

    const inviteToken = req?.body?.token
    const inviteTokenId = await resolveInviteTokenId(inviteToken)
    if (!inviteTokenId) {
        res.status(422).json({
            success: false,
            message:
                "Sign up is currently disabled. Please do get in touch with us!",
        })
        return
    }

    let email: Maybe<string> = null,
        password: Maybe<string> = null,
        hash: Maybe<string> = null,
        avatarUrl: Maybe<string> = null,
        locale: Maybe<string> = null,
        username: Maybe<string> = null,
        googleId: Maybe<string> = null

    if (authMethod === AuthMethod.GOOGLE) {
        const googleIdToken = req?.body?.idToken
        if (
            !googleIdToken ||
            typeof googleIdToken !== "string" ||
            !googleIdToken.length
        ) {
            res.status(422).json({
                success: false,
                message:
                    "Something went wrong while signing you up with your Google account. Please try again.",
            })
            return
        }
        try {
            const client = new OAuth2Client(GOOGLE_WEB_SIGNIN_CLIENT_ID)
            // Check integrity of ID token (make sure that it's valid and comes from Google)
            const ticket = await client.verifyIdToken({
                idToken: googleIdToken,
                audience: GOOGLE_SIGNIN_AUDIENCE,
            })
            if (!ticket) {
                throw new Error("Empty ticket")
            }
            const payload = ticket.getPayload()
            if (!payload) {
                throw new Error("Empty payload")
            }
            if (!payload.email_verified) {
                // TODO: Make email nullable, store email as unconfirmed_email.
                res.status(422).json({
                    success: false,
                    message: `Please verify your Google account's email address "${email}" first.`,
                })
                return
            }
            email = payload.email || null
            if (!email || !email.length) {
                throw new Error("Empty email")
            }
            avatarUrl = payload.picture || null
            locale = payload.locale || null
            username = payload.name || null
            googleId = payload.sub || null
        } catch (e: any) {
            console.error(e.stack)
            res.status(422).json({
                success: false,
                message:
                    "Something went wrong while signing you up with your Google account. Please try again or sign up with your email address.",
            })
            return
        }
    } else if (authMethod === AuthMethod.EMAIL) {
        email = req?.body?.email
        password = req?.body?.password
        if (!email || typeof email !== "string" || !email.length) {
            res.status(422).json({
                success: false,
                message: "Please specify an email address.",
            })
            return
        }
        const emailValidation = await validateEmail({
            email,
            validateRegex: true,
            validateMx: true,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: false, // Seems to fail too often, maybe for privacy reasons.
        })
        if (!emailValidation.valid) {
            const { validators, reason } = emailValidation
            let invalidEmailMsg = "Please double-check that email address."
            if (
                typeof reason !== "undefined" &&
                validators.hasOwnProperty(reason) &&
                validators[reason as InvalidEmailReason]
            ) {
                chlog
                    .child({
                        email,
                        reason: validators[reason as InvalidEmailReason]!
                            .reason,
                        emailValidation,
                    })
                    .debug("User provided an invalid email")
                invalidEmailMsg = {
                    smtp: "It looks like the email address you provided does not exist.",
                    regex: "That email address looks wrong to us.",
                    mx: "It looks like the email address you provided does not exist.",
                    disposable: "Please use a different email provider.",
                    typo: "Did you misspell the email address by accident?",
                }[reason as InvalidEmailReason]
            } else {
                chlog
                    .child({
                        email,
                        emailValidation,
                    })
                    .debug("User provided an invalid email")
            }
            res.status(422).json({
                success: false,
                message: invalidEmailMsg,
            })
            return
        }
        if (
            !password ||
            typeof password !== "string" ||
            password.length < MIN_PASSWORD_LENGTH
        ) {
            res.status(422).json({
                success: false,
                message: `Please specify a password with a minimum length of ${MIN_PASSWORD_LENGTH}.`,
            })
            return
        }
        hash = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
        if (!hash) {
            serverError(res)
            return
        }
    } else {
        // this should never get called due to the check above
        throw new Error(`Unknown auth method ${authMethod}`)
    }

    const emailUnsubscribeToken = await generateEmailUnsubscribeToken()
    if (!emailUnsubscribeToken) {
        chlog
            .child({ emailUnsubscribeToken })
            .error(`Email unsubscribe token generation failed`)
        serverError(res)
        return
    }

    const emailConfirmToken = await generateEmailConfirmToken()
    if (!emailConfirmToken) {
        chlog
            .child({ emailConfirmToken })
            .error(`Email confirm token generation failed`)
        serverError(res)
        return
    }

    const emailIsConfirmed =
        googleId !== null && authMethod === AuthMethod.GOOGLE
    const uuid = uuidv4()
    const queryResult = await db?.query({
        text: `INSERT INTO ${DATABASE_SCHEMA}.users (
                username,
                email,
                password_hash,
                uuid,
                google_id,
                avatar_url,
                locale,
                signed_up_with_token_id,
                email_unsubscribe_token,
                email_confirm_token,
                email_confirm_token_created_at,
                unconfirmed_email,
                email_confirmed_at
            )
            VALUES (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                (
                    SELECT id
                    FROM languages
                    WHERE alpha2 = $7
                    LIMIT 1
                ),
                $8,
                $9,
                $10,
                CASE WHEN $2::varchar IS NULL THEN current_timestamp ELSE null END,
                $11,
                CASE WHEN $2::varchar IS NULL THEN null ELSE current_timestamp END
            )
            ON CONFLICT (email)
                DO NOTHING
            RETURNING id`,
        values: [
            username,
            emailIsConfirmed ? email : null, // confirmed email
            hash,
            uuid,
            googleId,
            avatarUrl,
            locale,
            inviteTokenId,
            emailUnsubscribeToken,
            emailIsConfirmed ? null : emailConfirmToken,
            emailIsConfirmed ? null : email, // unconfirmed email
        ],
    })
    const userId = queryResult?.rows[0]?.id
    chlog.child({ userId }).trace("Tried to insert new user")
    let success = queryResult?.rowCount === 1
    if (!success) {
        chlog
            .child({
                queryResult,
                username,
                email,
                hash,
                uuid,
                googleId,
                avatarUrl,
                locale,
                inviteTokenId,
            })
            .info(`User insertion failed`)
        serverError(res)
        return
    }

    const newInviteToken = await generateInviteToken()
    if (!newInviteToken) {
        chlog.child({ newInviteToken }).error(`Invite token generation failed`)
        serverError(res)
        return
    }

    if (!(await createInviteToken({ userId, token: newInviteToken }))) {
        chlog
            .child({ newInviteToken })
            .error(`Failed to insert token for new user`)
        serverError(res)
        return
    }

    const refreshTokenRequested = Boolean(
        req?.body?.generateRefreshToken &&
            req.body.generateRefreshToken === true
    )
    let refreshToken: string | undefined
    if (refreshTokenRequested) {
        // Generate new refresh token
        const jti = await REFRESH_TOKEN_JTI_GENERATOR.generate().catch(
            () => null
        )
        if (!jti) {
            chlog.child({ userId }).error("Failed to generate JTI (JWT ID)")
            serverError(res)
            return
        }
        refreshToken = await generateRefreshToken(jti, uuid)
        const newDatabaseToken = await createRefreshToken({ jti, userId })
        if (!newDatabaseToken) {
            chlog
                .child({ jti, userUuid: uuid })
                .error("Failed to insert new refresh token")
            serverError(res)
            return
        }
    }

    req.session.regenerate(function (err: any) {
        if (err) {
            chlog.error("Failed to (re)generate session: %s", err.message)
            serverError(res)
        } else {
            req.session.user_id = userId
            res.status(200).json({ success: true, refreshToken })
        }
    })

    // TODO: Send welcome email to Google sign ups without email confirm token
    if (authMethod === AuthMethod.EMAIL) {
        const expiresAt = new Date(
            Date.now() + NOTIFICATION_EXPIRY_SECONDS * 1000
        )
        const withheldUntil = new Date(
            Date.now() + NOTIFICATION_WITHHELD_SECONDS * 1000
        )
        void enqueueEmailNotification(userId, expiresAt, withheldUntil, {
            templateId: 15,
            templateParams: {
                // TODO: Send username only in Google sign ups
                username: username ?? "",
                email,
                confirmEmailUrl: `https://app.everglot.com/email/confirm?token=${emailConfirmToken}`,
                unsubscribeUrl: `https://app.everglot.com/email/unsubscribe?token=${emailUnsubscribeToken}`,
            },
            version: NotificationParamsVersion.V1,
        })
    }
}
