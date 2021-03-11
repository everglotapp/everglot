import { db } from "../server/db"
import { Gender, CefrLevel as _CefrLevel, MIN_USERNAME_LENGTH } from "../users"

import type { Request, Response } from "express"
import { serverError } from "../helpers"

export async function post(req: Request, res: Response, next: () => void) {
    res.setHeader("Content-Type", "application/json")
    const gender: Gender | null =
        req.body.hasOwnProperty("gender") &&
        Object.values(Gender).includes(req.body.gender)
            ? req.body.gender
            : null

    if (!req.body.hasOwnProperty("learn")) {
        res.end({
            success: false,
            message:
                "Please select at least one language that you are interested in.",
        })
        next()
    }

    if (
        !req.body.hasOwnProperty("username") ||
        typeof req.body.username !== "string"
    ) {
        res.end({
            success: false,
            message: "Please specify a username.",
        })
        next()
    }

    if (req.body.username.length < MIN_USERNAME_LENGTH) {
        res.end({
            success: false,
            message: `Usernames must be at least ${MIN_USERNAME_LENGTH} characters long.`,
        })
        next()
    }

    // TODO: when sign up is implemented, use session to find user ID and update the user record
    const email = "example@everglot.com"
    const queryResult = await db?.query({
        text: `INSERT INTO users (
                email,
                username,
                gender,
                last_active_at
            )
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (email) DO UPDATE SET (
                username,
                gender,
                uuid,
                last_active_at
            ) = ($2, $3, NOW())
            WHERE users.email = $1
            RETURNING *`,
        values: [email, req.body.username, gender],
    })
    let success = queryResult?.rowCount === 1
    if (!success) {
        serverError(res)
    }
    res.end(
        JSON.stringify({
            success: true,
        })
    )
}
