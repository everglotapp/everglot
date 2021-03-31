import {
    Gender,
    CefrLevel as _CefrLevel,
    MIN_USERNAME_LENGTH,
    MAX_LEARNING,
    MAX_TEACHING,
} from "../users"

import type { Request, Response } from "express"
import { ensureJson, serverError } from "../helpers"

import { createDatabasePool } from "../server/db"
import { performQuery } from "../server/gql"

export async function get(req: Request, res: Response, next: () => void) {
    if (!req.session.user_id) {
        res.redirect("/")
        return
    }
    const queryResult = await performQuery(
        `query User($id: Int!) {
            user(id: $id) {
              username
              userLanguages {
                totalCount
              }
            }
          }
          `,
        { id: req.session.user_id }
    )
    if (queryResult.data) {
        const {
            user: { username, userLanguages },
        } = queryResult.data
        if (username !== null && userLanguages.totalCount) {
            res.redirect("/groups")
            return
        }
    }
    next()
}

export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
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

    if (
        !req.body.hasOwnProperty("teach") ||
        !Array.isArray(req.body.teach) ||
        !req.body.teach.length ||
        req.body.teach.length > MAX_TEACHING
    ) {
        res.status(422).json({
            success: false,
            message:
                "Please choose up to 2 languages you could help others out with.",
        })
        return
    }

    if (
        !req.body.hasOwnProperty("learn") ||
        !Array.isArray(req.body.learn) ||
        !req.body.learn.length ||
        req.body.learn.length > MAX_LEARNING
    ) {
        res.status(422).json({
            success: false,
            message: "Please choose up to 2 languages you are interested in.",
        })
        return
    }

    if (
        !req.body.hasOwnProperty("cefrLevels") ||
        typeof req.body.cefrLevels !== "object" ||
        Object.keys(req.body.cefrLevels).length !== req.body.learn.length ||
        Object.keys(req.body.cefrLevels).some(
            (code) => !req.body.learn.includes(code)
        )
    ) {
        res.status(422).json({
            success: false,
            message:
                "Please specify your level in every language that you're interested in.",
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
            const { teach, learn, cefrLevels } = req.body
            for (const code of teach) {
                await client.query({
                    text: SQL_ASSIGN_NATIVE_LANGUAGE,
                    values: [req.session.user_id, code],
                })
            }
            for (const code of learn) {
                if (!cefrLevels.hasOwnProperty(code)) {
                    throw new Error(`cefrLevels doesn't have property ${code}`)
                }
                if (teach.includes(code)) {
                    throw new Error(
                        `User claimed to learn the language with code "${code}" which they already speak natively.`
                    )
                }
                await client.query({
                    text: SQL_ASSIGN_NON_NATIVE_LANGUAGE,
                    values: [req.session.user_id, code, cefrLevels[code]],
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

const SQL_ASSIGN_NATIVE_LANGUAGE = `
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

const SQL_ASSIGN_NON_NATIVE_LANGUAGE = `
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
    (
        SELECT id
        FROM language_skill_levels
        WHERE name = $3
    ),
    false
)`
