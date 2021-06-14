import { db } from "../server/db"

import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import { createToken, getTokenIdByToken } from "../server/inviteTokens"
import { ensureJson, serverError } from "../helpers"
import {
    GOOGLE_WEB_SIGNIN_CLIENT_ID,
    GOOGLE_SIGNIN_AUDIENCE,
} from "../constants"

import log from "../logger"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import UIDGenerator from "uid-generator"

import validate from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"
// import {
//     createGroup,
//     getUsersWithoutLearnerGroup,
//     getUsersWithoutNativeGroup,
// } from "../server/groups"

const BCRYPT_WORK_FACTOR = 14

import type { Request, Response } from "express"
import type { Maybe } from "../types/generated/graphql"

type InvalidEmailReason = "smtp" | "regex" | "typo" | "mx" | "disposable"

async function resolveInviteTokenId(token: unknown) {
    if (!token || typeof token !== "string") {
        return null
    }
    return (await getTokenIdByToken(token)) || null
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
        const emailValidation = await validate({
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
                log.child({
                    email,
                    reason: validators[reason as InvalidEmailReason]!.reason,
                    emailValidation,
                }).info("User provided an invalid email")
                invalidEmailMsg = {
                    smtp: "It looks like the email address you provided does not exist.",
                    regex: "That email address looks wrong to us.",
                    mx: "It looks like the email address you provided does not exist.",
                    disposable: "Please use a different email provider.",
                    typo: "Did you misspell the email address by accident?",
                }[reason as InvalidEmailReason]
            } else {
                log.child({
                    email,
                    emailValidation,
                }).info("User provided an invalid email")
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

    const uuid = uuidv4()
    const queryResult = await db?.query({
        text: `INSERT INTO app_public.users (
                username,
                email,
                password_hash,
                uuid,
                google_id,
                avatar_url,
                locale,
                signed_up_with_token_id
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
                $8
            )
            ON CONFLICT (email)
                DO NOTHING
            RETURNING id`,
        values: [
            username,
            email,
            hash,
            uuid,
            googleId,
            avatarUrl,
            locale,
            inviteTokenId,
        ],
    })
    const userId = queryResult?.rows[0]?.id
    log.child({ userId }).trace("Tried to insert new user")
    let success = queryResult?.rowCount === 1
    if (!success) {
        log.child({
            queryResult,
            username,
            email,
            hash,
            uuid,
            googleId,
            avatarUrl,
            locale,
            inviteTokenId,
        }).info(`User insertion failed`)
        serverError(res)
        return
    }

    const uidgen = new UIDGenerator(256, UIDGenerator.BASE58)
    const newInviteToken = await uidgen.generate().catch(() => null)
    if (!newInviteToken) {
        log.child({ newInviteToken }).error(`Invite token generation failed`)
        serverError(res)
        return
    }

    if (!(await createToken({ userId, token: newInviteToken }))) {
        log.child({ newInviteToken }).error(
            `Failed to insert token for new user`
        )
        serverError(res)
        return
    }

    req.session.regenerate(function (err: any) {
        if (err) {
            console.error(err.message)
            serverError(res)
        } else {
            req.session.user_id = userId
            res.status(200).json({ success: true })
        }
    })
}
