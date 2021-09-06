import { db } from "../../server/db"

import { PROMPT_LOCALES } from "../../constants"
import log from "../../logger"

const chlog = log.child({
    namespace: "prompts-get",
})

import type { Request, Response } from "express"
import type { PromptType } from "../../types/generated/graphql"
import type { PromptLocale } from "../../constants"

const RECENTLY_SHOWN_SECONDS = 30
const promptsShownByUser: Record<number, { uuid: string; shownAt: Date }[]> = {}

export async function get(req: Request, res: Response, _next: () => void) {
    const locale = req.query["locale"]
    if (
        !locale ||
        typeof locale !== "string" ||
        !(PROMPT_LOCALES as readonly string[]).includes(locale)
    ) {
        chlog.child({ locale }).debug("Invalid locale")
        res.status(404).json({ success: false, data: null })
        return
    }
    const previouslyShownToUser = promptsShownByUser[req.session.user_id!] || []
    let uuidsToExclude = previouslyShownToUser
        .filter(
            (entry) =>
                Date.now() - entry.shownAt.getTime() <=
                RECENTLY_SHOWN_SECONDS * 1000
        )
        .map((entry) => entry.uuid)
    let prompt = await getRandomPrompt(locale as PromptLocale, uuidsToExclude)
    if (!prompt) {
        chlog
            .child({ locale, uuidsToExclude })
            .warn(
                "Could not find prompt for locale, we should add more prompts"
            )
        const lastShownEntry = previouslyShownToUser.sort(
            (a, b) => b.shownAt.getTime() - a.shownAt.getTime()
        )[0]
        uuidsToExclude = lastShownEntry ? [lastShownEntry.uuid] : []
        prompt = await getRandomPrompt(locale as PromptLocale, uuidsToExclude)
        if (!prompt) {
            chlog
                .child({ locale })
                .error(
                    "Finally could not find prompt for locale, are there no prompts for this locale?"
                )
            res.status(404).json({ success: false, data: null })
            return
        }
    }
    const existingEntry = (promptsShownByUser[req.session.user_id!] || []).find(
        (entry) => entry.uuid === prompt!.uuid
    )
    if (existingEntry) {
        existingEntry.shownAt = new Date()
    } else {
        promptsShownByUser[req.session.user_id!] = [
            ...previouslyShownToUser,
            { uuid: prompt.uuid, shownAt: new Date() },
        ]
    }
    res.json({
        success: true,
        data: {
            prompt: {
                uuid: prompt.uuid,
                content:
                    prompt[`content_${locale}` as `content_${PromptLocale}`],
                type: prompt.type,
            },
        },
    })
}

type QueriedPrompt = {
    uuid: string
    type: PromptType
} & Record<`content_${PromptLocale}`, string | null>

async function getRandomPrompt(
    language: PromptLocale,
    excludeUuids?: string[]
): Promise<QueriedPrompt | null> {
    const res = await db?.query<QueriedPrompt>(
        `
    select * from(
        select uuid, content_${language}, UPPER(p.type::text) as type
        from app_public.prompts p
        where true
        and language_id in (
            select id
            from app_public.languages
            where alpha2 = $1
        )
        and not(p.uuid = any($2))
        and p.type = (
            select enumlabel
            from pg_catalog.pg_enum e
            inner join (
                select oid
                from pg_type
                where typname = 'prompt_type'
            ) t
            ON t.oid = e.enumtypid
            order by random()
            limit 1
        )::public.prompt_type
        order by random()
    ) wd limit 1
    `,
        [language, excludeUuids || []]
    )
    if (!res || res.rowCount !== 1) {
        chlog
            .child({ language, excludeUuids })
            .warn("Failed to fetch a random prompt from database")
        return null
    }
    return res.rows[0]
}
