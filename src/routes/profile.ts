import { Gender, CefrLevel as _CefrLevel, MIN_USERNAME_LENGTH } from "../users"

import type { Request, Response } from "express"
import { serverError } from "../helpers"

import { createDatabasePool } from "../server/db"

export async function post(req: Request, res: Response, _next: () => void) {
    res.setHeader("Content-Type", "application/json")
    const gender: Gender | null =
        req.body.hasOwnProperty("gender") &&
        Object.values(Gender).includes(req.body.gender)
            ? req.body.gender
            : null

    if (!req.body.hasOwnProperty("learn")) {
        res.status(422).json({
            success: false,
            message:
                "Please select at least one language that you are interested in.",
        })
        return
    }

    if (
        !req.body.hasOwnProperty("username") ||
        typeof req.body.username !== "string"
    ) {
        res.status(422).json({
            success: false,
            message: "Please specify a username.",
        })
        return
    }

    if (req.body.username.length < MIN_USERNAME_LENGTH) {
        res.status(422).json({
            success: false,
            message: `Usernames must be at least ${MIN_USERNAME_LENGTH} characters long.`,
        })
        return
    }

    ;(async () => {
        const client = await createDatabasePool().connect()
        try {
            await client.query("BEGIN")
            console.assert(!!req.session.user_id)
            await client.query({
                text: SQL_UPDATE_USER_ATTRIBUTES,
                values: [req.session.user_id, req.body.username, gender],
            })
            await client.query({
                text: SQL_DELETE_USER_LANGUAGES,
                values: [req.session.user_id],
            })
            for (let code of req.body.teach) {
                await client.query({
                    text: SQL_ASSIGN_NATIVE_LANGUAGES,
                    values: [req.session.user_id, code],
                })
            }
            await client.query("COMMIT")
            res.status(200).json({
                success: true,
            })
        } catch (e) {
            await client.query("ROLLBACK")
            throw e
        } finally {
            client.release()
        }
    })().catch((e) => {
        console.error(e.stack)
        serverError(res)
    })
}

const SQL_UPDATE_USER_ATTRIBUTES = `
UPDATE users SET
username = $2,
gender = $3,
last_active_at = NOW()
WHERE users.id = $1`

const SQL_DELETE_USER_LANGUAGES = `
DELETE FROM user_languages
WHERE user_id = $1`

const SQL_ASSIGN_NATIVE_LANGUAGES = `
INSERT INTO user_languages (
    user_id,
    language_id,
    language_skill_level_id,
    native
)
VALUES (
    $1,
    (
        SELECT id
        FROM languages
        WHERE alpha2 = $2
    ),
    null,
    true
)`
