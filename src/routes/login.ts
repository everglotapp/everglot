import validate from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"

import bcrypt from "bcrypt"

import { db } from "../server/db"
import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"
import {
    GOOGLE_WEB_SIGNIN_CLIENT_ID,
    GOOGLE_SIGNIN_AUDIENCE,
} from "../constants"
import log from "../logger"

import type { Request, Response } from "express"
import {
    createRefreshToken,
    generateRefreshToken,
    REFRESH_TOKEN_JTI_GENERATOR,
} from "../server/auth/refreshTokens"
import { getUserUuidById } from "../server/users"
const chlog = log.child({ namespace: "login" })

const LOGIN_FAILED_MESSAGE =
    "That didn't work. Did you enter the correct password?"

export function get(req: Request, res: Response, next: () => void) {
    if (req.session.user_id) {
        res.redirect("/")
        return
    }
    next()
}

export async function post(req: Request, res: Response, _next: () => void) {
    if (req.session.user_id) {
        res.status(200).json({ success: true })
        return
    }

    if (!ensureJson(req, res)) {
        return
    }

    const authMethod = req?.body?.method
    if (
        !authMethod ||
        typeof authMethod !== "string" ||
        !Object.values(AuthMethod).includes(authMethod as AuthMethod)
    ) {
        res.status(422).json({ success: false, message: null })
        return
    }

    let email: string | null = null,
        password: string | null = null,
        googleId: string | null = null,
        userId: number | null = null
    if (authMethod === AuthMethod.GOOGLE) {
        const idToken = req?.body?.idToken
        if (!idToken || typeof idToken !== "string" || !idToken.length) {
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
                idToken,
                audience: GOOGLE_SIGNIN_AUDIENCE,
            })
            if (!ticket) {
                throw new Error("Empty ticket")
            }
            const payload = ticket.getPayload()
            if (!payload) {
                throw new Error("Empty payload")
            }
            if (!payload.sub) {
                throw new Error("Empty sub (Google user ID)")
            }
            googleId = payload.sub || null
            if (
                payload.email_verified &&
                payload.email &&
                payload.email.length
            ) {
                /**
                 * Alternatively signs in with email if the user signed up
                 * with the same email as the one verified by Google.
                 */
                email = payload.email
            }
        } catch (e: any) {
            chlog.error(e.stack)
            res.status(422).json({
                success: false,
                message:
                    "Something went wrong while signing you in with your Google account. Please try again or sign in with your email address.",
            })
            return
        }

        const queryResult = await db?.query<{
            id: number
        }>({
            text: `
                SELECT id
                FROM users
                WHERE
                    google_id = $1
                OR (
                    google_id IS NULL
                    AND email IS NOT NULL
                    AND CHAR_LENGTH(email) >= 3
                    AND email = $2
                )
                LIMIT 1`,
            values: [googleId, email],
        })

        const userExists = Boolean(queryResult?.rowCount === 1)
        if (!userExists) {
            // TODO: How to inform user that id token does not exist? Privacy issue?
            // Maybe not because payload was signed by Google?
            // Could be relayed by a different server but that might not matter. Threat model required.
            chlog
                .child({ idToken, email })
                .info(
                    `User tried to login with an id token that does not exist`
                )
            res.redirect("/join")
            return
        }

        const user = queryResult?.rows[0]!
        userId = user.id
        chlog.child({ userId, googleId }).info(`Successful login via Google`)
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
            /**
             * Only check basic format for sanity, otherwise assume email to be correct.
             * It needs to exist in the database anyways.
             */
            validateRegex: true,
            validateMx: false,
            validateTypo: false,
            validateDisposable: false,
            validateSMTP: false,
        })
        if (!emailValidation.valid) {
            res.status(422).json({
                success: false,
                message: "That email address looks wrong to us.",
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
                message: "Please specify a password.",
            })
            return
        }
        const queryResult = await db?.query<{
            id: number
            email: string
            password_hash: string
        }>({
            text: `
                SELECT id, password_hash
                FROM users
                WHERE
                    email = $1
                    AND password_hash IS NOT NULL
                LIMIT 1`,
            values: [email],
        })

        const userExists = Boolean(queryResult?.rowCount === 1)
        if (!userExists) {
            // TODO: How to inform user that email does not exist? Privacy issue.
            chlog
                .child({ email })
                .info(
                    `User tried to login with an email address that does not exist`
                )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        const user = queryResult?.rows[0]!
        userId = user.id
        const storedPasswordHash = user.password_hash

        /** Avoid comparing null/undefined/empty string */
        if (!storedPasswordHash || !storedPasswordHash.length) {
            chlog
                .child({ email })
                .error(
                    `User stored password hash is empty. This should never happen!`
                )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        const passwordCorrect: boolean = await bcrypt.compare(
            password,
            storedPasswordHash
        )

        if (!passwordCorrect) {
            chlog.info(
                `User tried to login with incorrect password. Email: ${email}`
            )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        chlog.child({ userId, email }).info(`Successful login via email`)
    } else {
        // this should never get called due to the check above
        throw new Error(`Unknown auth method ${authMethod}`)
    }

    const refreshTokenRequested = Boolean(
        req?.body?.generateRefreshToken && req.body.generateRefreshToken === "1"
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
        const userUuid = await getUserUuidById(userId)
        if (!userUuid) {
            chlog
                .child({ userId })
                .error(
                    "Failed to get user UUID by ID to generate refresh token"
                )
            serverError(res)
            return
        }
        refreshToken = await generateRefreshToken(jti, userUuid)
        const newDatabaseToken = await createRefreshToken({ jti, userId })
        if (!newDatabaseToken) {
            chlog
                .child({ jti, userUuid })
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
            req.session.user_id = userId!
            res.status(200).json({ success: true, refreshToken })
        }
    })
}
