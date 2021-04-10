import { db } from "../server/db"

import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"
import { GOOGLE_SIGNIN_CLIENT_ID } from "../constants"

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import TokenGenerator from "uuid-token-generator"

import validate from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"
// import {
//     createGroup,
//     getUsersWithoutLearnerGroup,
//     getUsersWithoutNativeGroup,
// } from "../server/groups"

const BCRYPT_WORK_FACTOR = 14

import type { Request, Response } from "express"
import type { InviteToken } from "../types/generated/graphql"

type InvalidEmailReason = "smtp" | "regex" | "typo" | "mx" | "disposable"

export function get(req: Request, res: Response, next: () => void) {
    if (req.session.user_id) {
        res.redirect("/")
        return
    }
    next()
}

// const INVITE_TOKEN = "Tkb8T3mfZcsvNRBg6hKuwnL6o8s8vFuD"

export async function getTokenIdByToken(
    token: String
): Promise<InviteToken["id"] | null> {
    const queryResult = await db?.query({
        text: `SELECT id
        FROM app_public.invite_tokens
        WHERE invite_token = $1
        LIMIT 1`,
        values: [token],
    })
    const tokenId = await queryResult?.rows[0]?.id
    console.log({ token, tokenId })
    let success = queryResult?.rowCount === 1
    if (!success) {
        console.log(`Query token failed`, queryResult)
        return null
    }
    return tokenId
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
    const inviteTokenId = await getTokenIdByToken(inviteToken)
    if (!inviteToken || typeof inviteToken !== "string" || !inviteTokenId) {
        res.status(422).json({
            success: false,
            message:
                "Sign up is currently disabled. Please do get in touch with us!",
        })
        return
    }

    let email: string | null = null,
        password: string | null = null,
        hash: string | null = null,
        avatarUrl: string | null = null,
        locale: string | null = null,
        username: string | null = null,
        googleId: string | null = null

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
            const client = new OAuth2Client(GOOGLE_SIGNIN_CLIENT_ID)
            // Check integrity of ID token (make sure that it's valid and comes from Google)
            const ticket = await client.verifyIdToken({
                idToken: googleIdToken,
                audience: GOOGLE_SIGNIN_CLIENT_ID,
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
                console.log(
                    `User provided an invalid email "${email}": ${
                        validators[reason as InvalidEmailReason]!.reason
                    } (${JSON.stringify(emailValidation)})"`
                )
                invalidEmailMsg = {
                    smtp:
                        "It looks like the email address you provided does not exist.",
                    regex: "That email address looks wrong to us.",
                    mx:
                        "It looks like the email address you provided does not exist.",
                    disposable: "Please use a different email provider.",
                    typo: "Did you misspell the email address by accident?",
                }[reason as InvalidEmailReason]
            } else {
                console.log(
                    `User provided an invalid email "${email}": ${JSON.stringify(
                        emailValidation
                    )}"`
                )
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
    console.log({ userId })
    let success = queryResult?.rowCount === 1
    if (!success) {
        console.log(`User insertion failed`, queryResult)
        serverError(res)
        return
    }

    const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62)
    const newInviteToken = tokgen2.generate()
    const tokenQueryResult = await db?.query({
        text: `INSERT INTO invite_tokens (
                user_id,
                invite_token
            )
            VALUES (
                $1,
                $2
            )
            RETURNING id`,
        values: [userId, newInviteToken],
    })
    let tokenSuccess = tokenQueryResult?.rowCount === 1
    if (!tokenSuccess) {
        console.log(`Token insertion failed`, tokenQueryResult)
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
