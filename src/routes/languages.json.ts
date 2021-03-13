import type { Request, Response } from "express"

import { ensureJson, serverError } from "../helpers"
import { db } from "../server/db"

export async function get(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
    const queryResult = await db?.query<{
        alpha2: string
        english_name: string
    }>(SQL_SELECT_LANGUAGES)
    if (!queryResult) {
        serverError(res)
        return
    }
    res.json(queryResult.rows)
}

const SQL_SELECT_LANGUAGES = `
SELECT
    alpha2,
    english_name
FROM languages`
