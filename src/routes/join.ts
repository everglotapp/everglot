import { db } from "../server/db"

import { AuthMethod, MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import validate from "deep-email-validator"
import { OAuth2Client } from "google-auth-library"

const BCRYPT_WORK_FACTOR = 14

import type { Request, Response } from "express"

type InvalidEmailReason = "smtp" | "regex" | "typo" | "mx" | "disposable"

export function get(req: Request, res: Response, next: () => void) {
    if (req.session.user_id) {
        res.redirect("/")
        return
    }
    next()
}

// TODO: Create an invite tokens table and check token against it.
const INVITE_TOKEN = "Tkb8T3mfZcsvNRBg6hKuwnL6o8s8vFuD"
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

    // TODO: Always check the invite token, no matter which auth method is used.
    if (authMethod === AuthMethod.GOOGLE) {
        // const client = new OAuth2Client(CLIENT_ID);
        // TODO: Check integrity of ID token etc.
    } else {
        const inviteToken = req?.body?.token
        if (
            !inviteToken ||
            typeof inviteToken !== "string" ||
            inviteToken !== INVITE_TOKEN
        ) {
            res.status(422).json({
                success: false,
                message:
                    "Sign up is currently disabled. Please do get in touch with us!",
            })
            return
        }
    }

    const email = req?.body?.email
    const password = req?.body?.password
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
    const hash = await bcrypt.hash(password, BCRYPT_WORK_FACTOR)
    if (!hash) {
        serverError(res)
        return
    }
    const uuid = uuidv4()
    const queryResult = await db?.query({
        text: `INSERT INTO users (
                email,
                password_hash,
                uuid,
                created_at
            )
            VALUES ($1, $2, $3, NOW())
            RETURNING id`,
        values: [email, hash, uuid],
    })
    let success = queryResult?.rowCount === 1
    if (!success) {
        serverError(res)
        return
    }

    req.session.regenerate(function (err: any) {
        if (err) {
            console.error(err.message)
            serverError(res)
        } else {
            req.session.user_id = queryResult?.rows[0].id
            res.status(200).json({ success: true })
        }
    })
}
