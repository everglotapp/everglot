import { db } from "../server/db"
import type { SapperRequest, SapperResponse } from "@sapper/server"

export const MAX_LEARNING = 2
export const MAX_TEACHING = 2

export enum Gender {
    FEMALE = "f",
    MALE = "m",
    OTHER = "o",
}

export enum CefrLevel {
    A1 = "A1",
    A2 = "A2",
    B1 = "B1",
    B2 = "B2",
    C1 = "C1",
    C2 = "C2",
}

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    _next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    const gender =
        req.body.hasOwnProperty("gender") &&
        Object.values(Gender).includes(req.body.gender)
            ? req.body.gender
            : null

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
