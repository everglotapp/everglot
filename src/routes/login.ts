import bcrypt from "bcrypt"

import { db } from "../server/db"
import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"
import { GOOGLE_SIGNIN_CLIENT_ID } from "../constants"

import validate from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"

import bcrypt from "bcrypt"

import type { Request, Response } from "express"

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
    if (!ensureJson(req, res)) {
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
            const client = new OAuth2Client(GOOGLE_SIGNIN_CLIENT_ID)
            // Check integrity of ID token (make sure that it's valid and comes from Google)
            const ticket = await client.verifyIdToken({
                idToken,
                audience: GOOGLE_SIGNIN_CLIENT_ID,
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
        } catch (e: any) {
            console.error(e.stack)
            res.status(422).json({
                success: false,
                message:
                    "Something went wrong while signing you up with your Google account. Please try again or sign up with your email address.",
            })
            return
        }
        const queryResult = await db?.query<{
            id: number
            email: string
            password_hash: string
        }>({
            text: `
                SELECT id
                FROM users
                WHERE
                    google_id = $1
                LIMIT 1`,
            values: [googleId],
        })

        const userExists = Boolean(queryResult?.rowCount === 1)
        if (!userExists) {
            // TODO: Inform user that email does not exist?
            console.log(
                `User tried to login with an id token that does not exist: ${idToken}`
            )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        const user = queryResult?.rows[0]!
        userId = user.id
        console.log(
            `Successful login! User ID: ${userId}, Google ID: ${googleId}`
        )
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
            // TODO: Inform user that email does not exist?
            console.log(
                `User tried to login with an email address that does not exist: ${email}`
            )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        const user = queryResult?.rows[0]!
        userId = user.id
        const storedPasswordHash = user.password_hash

        /** Avoid comparing null/undefined/empty string */
        if (!storedPasswordHash || !storedPasswordHash.length) {
            console.error(
                `User stored password hash is empty. This should never happen! Email: ${email}`
            )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        const passwordCorrect: boolean = await bcrypt.compare(
            password,
            storedPasswordHash
        )

        if (!passwordCorrect) {
            console.log(
                `User tried to login with incorrect password. Email: ${email}`
            )
            serverError(res, LOGIN_FAILED_MESSAGE)
            return
        }

        console.log(`Successful login! User ID: ${userId}, Email: ${email}`)
    } else {
        // this should never get called due to the check above
        throw new Error(`Unknown auth method ${authMethod}`)
    }

    req.session.regenerate(function (err: any) {
        if (err) {
            console.error(err.message)
            serverError(res)
        } else {
            req.session.user_id = userId!
            res.status(200).json({ success: true })
        }
    })
}
