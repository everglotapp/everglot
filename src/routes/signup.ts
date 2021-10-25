import {
    Gender,
    CefrLevel as _CefrLevel,
    MIN_USERNAME_LENGTH,
    MAX_LEARNING,
    MAX_TEACHING,
} from "../users"

import { userHasCompletedProfile, createUserPreference } from "../server/users"

import type { Request, Response } from "express"
import { ensureJson, serverError } from "../helpers"

import { createDatabasePool } from "../server/db"
import { notifyAdminsOfSignUp } from "../server/notifications/admin"
import { SUPPORTED_LOCALES } from "../constants"
import { getLanguageIdByAlpha2 } from "../server/locales"
import { localeIsSupported } from "../helpers/locales"

export async function get(req: Request, res: Response, next: () => void) {
    if (!req.session.user_id) {
        res.redirect("/")
        return
    }
    if (await userHasCompletedProfile(req.session.user_id)) {
        res.redirect("/")
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

    if (!req.body.hasOwnProperty("learning")) {
        res.status(422).json({
            success: false,
            message:
                "Please select at least one language that you are interested in.",
        })
        return
    }

    let username: unknown = req.body["username"]
    if (!username || typeof username !== "string") {
        res.status(422).json({
            success: false,
            message: "Please specify a username.",
        })
        return
    }

    if (username.length < MIN_USERNAME_LENGTH) {
        res.status(422).json({
            success: false,
            message: `Usernames must be at least ${MIN_USERNAME_LENGTH} characters long.`,
        })
        return
    }

    const teachingInput: unknown = req.body["teaching"]
    if (
        !Array.isArray(teachingInput) ||
        !teachingInput ||
        !teachingInput.length ||
        teachingInput.length > MAX_TEACHING ||
        !teachingInput.every(isValidLocale)
    ) {
        res.status(422).json({
            success: false,
            message:
                "Please choose up to 2 languages you could help others out with.",
        })
        return
    }
    const teaching = teachingInput as string[]

    const learningInput: unknown = req.body["learning"]
    if (
        !Array.isArray(learningInput) ||
        !learningInput ||
        !learningInput.length ||
        learningInput.length > MAX_LEARNING ||
        !learningInput.every(isValidLocale)
    ) {
        res.status(422).json({
            success: false,
            message: "Please choose up to 2 languages you are interested in.",
        })
        return
    }
    const learning = learningInput as string[]

    const cefrLevelsInput: unknown = req.body["cefrLevels"]
    if (
        typeof cefrLevelsInput !== "object" ||
        !cefrLevelsInput ||
        Array.isArray(cefrLevelsInput) ||
        Object.keys(cefrLevelsInput).length !== learning.length ||
        Object.keys(cefrLevelsInput).some((code) => !learning.includes(code))
    ) {
        res.status(422).json({
            success: false,
            message:
                "Please specify your level in every language that you're interested in.",
        })
        return
    }
    const cefrLevels = cefrLevelsInput as Record<string, unknown>

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
            for (const code of teaching) {
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
            for (const code of learning) {
                if (!cefrLevels.hasOwnProperty(code)) {
                    throw new Error(`cefrLevels doesn't have property ${code}`)
                }
                if (teaching.includes(code)) {
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
            let firstTargetLanguage = null
            for (const code of learning) {
                if (localeIsSupported(code)) {
                    firstTargetLanguage = code
                    break
                }
            }
            const firstTargetLanguageId = await getLanguageIdByAlpha2(
                firstTargetLanguage || "en"
            )
            if (firstTargetLanguageId !== null) {
                createUserPreference({
                    feedLanguageId: firstTargetLanguageId,
                    userId,
                })
            }
            notifyAdminsOfSignUp(req.body.username)
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

async function isValidLocale(code: unknown): Promise<boolean> {
    const LOCALE_LEN = 2
    return Boolean(
        code &&
            typeof code === "string" &&
            code.length === LOCALE_LEN &&
            code === code.toLowerCase() &&
            (await getLanguageIdByAlpha2(code)) !== null
    )
}
