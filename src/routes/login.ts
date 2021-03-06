import type { SapperRequest, SapperResponse } from "@sapper/server"
import bcrypt from "bcrypt"

import { db } from "../server/db"
import { MIN_PASSWORD_LENGTH } from "../users"
import { serverError } from "../helpers"

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    _next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    // TODO: properly validate email
    const email = req?.body?.email
    const password = req?.body?.password
    if (
        !email ||
        typeof email !== "string" ||
        !email.length ||
        !email.includes("@")
    ) {
        res.end(
            JSON.stringify({
                success: false,
                message: "Please specify an email address.",
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
                message: "Please specify a password.",
            })
        )
        return
    }
    // TODO: check that email and password are strings
    const queryResult = await db?.query({
        text: `SELECT password_hash FROM users
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
        serverError(res)
        return
    }

    const storedPasswordHash = queryResult?.rows[0]?.password_hash

    /** Avoid comparing null/undefined/empty string */
    if (!storedPasswordHash || !storedPasswordHash.length) {
        console.error(`User stored password hash is empty. Email: ${email}`)
        serverError(res)
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
        serverError(res)
        return
    }

    console.log("Successful login")

    res.end(
        JSON.stringify({
            success: true,
        })
    )
}
