import { db } from "../server/db"
import type { SapperRequest, SapperResponse } from "@sapper/server"

import { MIN_PASSWORD_LENGTH } from "../users"

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

const SALT_ROUNDS = 13

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    if (
        !req.body.hasOwnProperty("email") ||
        typeof req.body.email !== "string"
    ) {
        res.end({
            success: false,
            message: "Please specify a valid email address.",
        })
        next()
    }
    if (
        !req.body.hasOwnProperty("password") ||
        typeof req.body.password !== "string" ||
        req.body.password.length < MIN_PASSWORD_LENGTH
    ) {
        res.end({
            success: false,
            message: `Please specify a password with a minimum length of ${MIN_PASSWORD_LENGTH}.`,
        })
        next()
    }
    const { email, password } = req.body
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    if (!hash) {
        res.end({
            success: false,
            message: "Something went wrong while processing your request.",
        })
        next()
    }
    const queryResult = await db?.query({
        text: `INSERT INTO users (
                email,
                password_hash,
                uuid,
                created_at
            )
            VALUES ($1, $2, $3, NOW())
            RETURNING *`,
        values: [email, hash, uuidv4()],
    })
    let success = queryResult?.rowCount === 1
    res.end(
        JSON.stringify({
            success: Boolean(success),
            message: success
                ? null
                : "Something went wrong while processing your request.",
        })
    )
}
