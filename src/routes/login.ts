import bcrypt from "bcrypt"

import { db } from "../server/db"
import { MIN_PASSWORD_LENGTH } from "../users"
import { serverError } from "../helpers"

import type { Request, Response } from "express"

export async function post(req: Request, res: Response, _next: () => void) {
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
        serverError(res)
        return
    }

    const user: { id: number; password_hash: string } = queryResult?.rows[0]
    const storedPasswordHash = user.password_hash

    /** Avoid comparing null/undefined/empty string */
    if (!storedPasswordHash || !storedPasswordHash.length) {
        console.error(
            `User stored password hash is empty. This should never happen! Email: ${email}`
        )
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
