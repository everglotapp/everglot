import { db } from "../server/db"

import { MIN_PASSWORD_LENGTH } from "../users"
import { ensureJson, serverError } from "../helpers"

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

const SALT_ROUNDS = 13

import type { Request, Response } from "express"

export async function post(req: Request, res: Response, _next: () => void) {
    ensureJson(req, res)
    const email = req?.body?.email
    const password = req?.body?.password
    // TODO: properly validate email
    if (
        !email ||
        typeof email !== "string" ||
        !email.length ||
        !email.includes("@")
    ) {
        res.status(422).json({
            success: false,
            message: "Please specify a valid email address.",
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
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
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
