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
import { UserHasCompletedProfileQuery } from "../types/generated/graphql"

async function userHasCompletedProfile(userId: number): Promise<boolean> {
    const queryResult = await performQuery<UserHasCompletedProfileQuery>(
        `query UserHasCompletedProfile($id: Int!) {
            user(id: $id) {
                username
                userLanguages {
                    totalCount
                }
            }
        }
        `,
        { id: userId }
    )
    if (queryResult.data && queryResult.data.user) {
        const {
            user: { username, userLanguages },
        } = queryResult.data
        if (username !== null && userLanguages.totalCount) {
            return true
        }
    }
    return false
}

export async function get(req: Request, res: Response, next: () => void) {
    if (!req.session.user_id) {
        res.redirect("/")
        return
    }
    if (await userHasCompletedProfile(req.session.user_id)) {
        res.redirect("/global")
        return
    }
    next()
}

export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
    if (await userHasCompletedProfile(req.session.user_id!)) {
        res.status(403).json({
            success: false,
            message: "You already completed your profile.",
        })
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
            const { user_id: userId } = req.session
            if (!userId) {
                throw new Error(
                    "User is not logged in. This should never happen."
                )
            }
            if (
                !(
                    await client.query({
                        text: SQL_UPDATE_USER_ATTRIBUTES,
                        values: [userId, req.body.username, gender],
                    })
                )?.fields.length
            ) {
                throw new Error(
                    `Failed to update username and gender of user ${userId}`
                )
            }
            const { teach, learn, cefrLevels } = req.body
            for (const code of teach) {
                if (
                    (
                        await client.query({
                            text: SQL_ASSIGN_NATIVE_LANGUAGE,
                            values: [userId, code],
                        })
                    )?.rowCount !== 1
                ) {
                    throw new Error(
                        `Failed to assign native language ${code} to user ${userId}`
                    )
                }
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
                if (
                    (
                        await client.query({
                            text: SQL_ASSIGN_NON_NATIVE_LANGUAGE,
                            values: [userId, code, cefrLevels[code]],
                        })
                    )?.rowCount !== 1
                ) {
                    throw new Error(
                        `Failed to assign target language with code "${code}" to user ${userId}.`
                    )
                }
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
UPDATE app_public.users SET
    username = $2,
    gender = $3,
    last_active_at = NOW()
WHERE id = $1
RETURNING id`

const SQL_ASSIGN_NATIVE_LANGUAGE = `
INSERT INTO app_public.user_languages (
    user_id,
    language_id,
    language_skill_level_id,
    native
)
VALUES (
    $1,
    (
        SELECT id
        FROM app_public.languages
        WHERE alpha2 = $2
    ),
    null,
    true
)
RETURNING id`

const SQL_ASSIGN_NON_NATIVE_LANGUAGE = `
INSERT INTO app_public.user_languages (
    user_id,
    language_id,
    language_skill_level_id,
    native
)
VALUES (
    $1,
    (
        SELECT id
        FROM app_public.languages
        WHERE alpha2 = $2
    ),
    (
        SELECT id
        FROM app_public.language_skill_levels
        WHERE name = $3
    ),
    false
)
RETURNING id`
