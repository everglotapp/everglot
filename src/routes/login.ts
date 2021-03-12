import bcrypt from "bcrypt"

import { db } from "../server/db"
import { MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"

import validate from "deep-email-validator"

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
    const queryResult = await db?.query<{ id: number; password_hash: string }>({
        text: `
            SELECT id, password_hash
            FROM users
            WHERE
                email = $1
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

    console.log(`Successful login! Email: ${email}`)

    req.session.regenerate(function (err: any) {
        if (err) {
            console.error(err.message)
            serverError(res)
        } else {
            req.session.user_id = user.id
            res.status(200).json({ success: true })
        }
    })
}
