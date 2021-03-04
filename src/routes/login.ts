import { db } from "../server/db"
import type { SapperRequest, SapperResponse } from "@sapper/server"

import bcrypt from "bcrypt"

const SALT_ROUNDS = 13

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    if (!req.body.hasOwnProperty("email")) {
        res.end({
            success: false,
            message: "Please specify an email address.",
        })
        next()
    }
    if (!req.body.hasOwnProperty("password")) {
        res.end({
            success: false,
            message: "Please specify a password.",
        })
        next()
    }
    const { email, password } = req.body
    // TODO: check that email and password are strings
    const queryResult = await db?.query({
        text: `SELECT FROM users
            WHERE
                email = $1
            RETURNING *
            LIMIT 1`,
        values: [email],
    })
    let userFound = queryResult && queryResult.rowCount === 1
    if (!userFound) {
        res.end(
            JSON.stringify({
                success: false,
                message: "Something went wrong while processing your request.",
            })
        )
        next()
    }

    const passwordCorrect = await bcrypt.compare(
        password,
        queryResult.rows[0].password_hash
    )
    res.end(
        JSON.stringify({
            success: passwordCorrect,
            message: passwordCorrect
                ? null
                : "Something went wrong while processing your request.",
        })
    )
}
