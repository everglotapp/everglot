import { db } from "../server/db"
import type { SapperRequest, SapperResponse } from "@sapper/server"

import { Gender, CefrLevel as _CefrLevel } from "../users"

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    const gender =
        req.body.hasOwnProperty("gender") &&
        Object.values(Gender).includes(req.body.gender)
            ? req.body.gender
            : null

    if (!req.body.hasOwnProperty("learn")) {
        res.end({ success: false })
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
                last_active_at
            ) = ($2, $3, NOW())
            WHERE users.email = $1
            RETURNING *`,
        values: [email, req.body.username, gender],
    })
    console.log(queryResult?.rows)
    res.end(
        JSON.stringify({ success: queryResult && queryResult.rowCount === 1 })
    )
}
