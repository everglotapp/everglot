import type { SapperRequest, SapperResponse } from "@sapper/server"
import bcrypt from "bcrypt"

import { db } from "../server/db"
import { MIN_PASSWORD_LENGTH } from "../users"

export async function post(
    req: SapperRequest & { body: any },
    res: SapperResponse,
    _next: () => void
) {
    res.setHeader("Content-Type", "application/json")
    // TODO: properly validate email
    if (
        !req.body.hasOwnProperty("email") ||
        typeof req.body.email !== "string" ||
        !req.body.email.length ||
        !req.body.email.includes("@")
    ) {
        res.end({
            success: false,
            message: "Please specify an email address.",
        })
        return
    }
    if (
        !req.body.hasOwnProperty("password") ||
        typeof req.body.password !== "string" ||
        req.body.password.length < MIN_PASSWORD_LENGTH
    ) {
        res.end({
            success: false,
            message: "Please specify a password.",
        })
        return
    }
    const { email, password } = req.body
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

    if (passwordCorrect) {
        console.log("Successful login")
    } else {
        console.log(
            `User tried to login with incorrect password. Email: ${email}`
        )
    }
    res.end(
        JSON.stringify({
            success: passwordCorrect,
            message: passwordCorrect
                ? null
                : "Something went wrong while processing your request.",
        })
    )
}

function serverError(res: SapperResponse) {
    res.end(
        JSON.stringify({
            success: false,
            message: "Something went wrong while processing your request.",
        })
    )
}
