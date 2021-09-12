import { jsonResponse, serverError } from "../../helpers"

import log from "../../logger"

import type { Request, Response } from "express"
import { upsertUserPreference } from "../../server/users"
import { SUPPORTED_LOCALES } from "../../constants"
import { getLanguageIdByAlpha2 } from "../../server/locales"

const chlog = log.child({
    namespace: "preferences-update",
})

export async function post(req: Request, res: Response, _next: () => void) {
    jsonResponse(res)
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }

    const feedLocale = req.body["feedLocale"]
    if (
        typeof feedLocale !== "undefined" &&
        feedLocale !== null &&
        !(
            typeof feedLocale === "string" &&
            (SUPPORTED_LOCALES as readonly string[]).includes(feedLocale)
        )
    ) {
        res.status(422).json({
            success: false,
            message: "Please specify a feedLocale.",
        })
        return
    }

    const feedLanguageId = await getLanguageIdByAlpha2(feedLocale)
    if (!feedLanguageId) {
        res.status(422).json({
            success: false,
            message: "Please specify a valid feedLocale.",
        })
        return
    }
    const userPreference = await upsertUserPreference({
        feedLanguageId,
        userId,
    })
    if (!userPreference) {
        chlog
            .child({ feedLocale, feedLanguageId, userId })
            .error("Failed to upsert user preference in database")
        serverError(res)
        return
    }

    chlog
        .child({ userPreference, userId })
        .debug("Successfully saved user preference")
    res.status(200).json({
        success: true,
        message: null,
    })
}
