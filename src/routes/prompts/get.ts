import { db } from "../../server/db"

import log from "../../logger"

const chlog = log.child({
    namespace: "prompts-get",
})

import type { Request, Response } from "express"
import type { PromptType } from "../../types/generated/graphql"

const PROMPT_LOCALES = ["en", "de", "zh"] as const
type PromptLocale = typeof PROMPT_LOCALES[number]

const RECENTLY_SHOWN_SECONDS = 30
const promptsShownByUser: Record<number, { uuid: string; shownAt: Date }[]> = {}

export async function get(req: Request, res: Response, next: () => void) {
    const locale = req.query["locale"]
    if (
        !locale ||
        typeof locale !== "string" ||
        !(PROMPT_LOCALES as readonly string[]).includes(locale)
    ) {
        chlog.child({ locale }).debug("Invalid locale")
        res.status(404).json({ success: false, data: null })
        next()
        return
    }
    const previouslyShownToUser = promptsShownByUser[req.session.user_id!] || []
    const uuidsToExclude = previouslyShownToUser
        .filter(
            (entry) =>
                Date.now() - entry.shownAt.getTime() <=
                RECENTLY_SHOWN_SECONDS * 1000
        )
        .map((entry) => entry.uuid)
    const prompt = await getRandomPrompt(locale as PromptLocale, uuidsToExclude)
    if (!prompt) {
        chlog.child({ locale }).debug("Could not find prompt for locale")
        res.status(404).json({ success: false, data: null })
        next()
        return
    }
    promptsShownByUser[req.session.user_id!] = [
        ...previouslyShownToUser,
        { uuid: prompt.uuid, shownAt: new Date() },
    ]
    res.json({
        success: true,
        data: {
            prompt: {
                content: prompt[`content_${locale}`],
                type: prompt.type,
            },
        },
    })
}

type QueriedPrompt = {
    uuid: string
    content_en: string | null
    content_de: string | null
    content_zh: string | null
    type: PromptType
}
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
        and not(uuid = any($2))
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
