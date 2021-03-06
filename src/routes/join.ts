import { db } from "../server/db"
import type { SapperRequest, SapperResponse } from "@sapper/server"

import { MIN_PASSWORD_LENGTH } from "../users"
import { serverError } from "../helpers"

import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"

const SALT_ROUNDS = 13

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    _next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    const email = req?.body?.email
    const password = req?.body?.password
    // TODO: properly validate email
    if (
        !email ||
        typeof email !== "string" ||
        !email.length ||
        !email.includes("@")
    ) {
        res.end(
            JSON.stringify({
                success: false,
                message: "Please specify a valid email address.",
            })
        )
        return
    }
    if (
        !password ||
        typeof password !== "string" ||
        password.length < MIN_PASSWORD_LENGTH
    ) {
        res.end(
            JSON.stringify({
                success: false,
                message: `Please specify a password with a minimum length of ${MIN_PASSWORD_LENGTH}.`,
            })
        )
        return
    }
    const hash = await bcrypt.hash(password, SALT_ROUNDS)
    if (!hash) {
        serverError(res)
        return
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
    if (!success) {
        serverError(res)
        return
    }
    res.end(
        JSON.stringify({
            success: true,
        })
    )
}
