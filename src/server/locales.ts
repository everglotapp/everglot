import { performQuery } from "./gql"
import path from "path"
import { readFileSync } from "fs"
import { FluentResource } from "@fluent/bundle"

import log from "../logger"
const chlog = log.child({ namespace: "locales" })

import {
    Language,
    LanguageIdByAlpha2,
    LanguageIdByAlpha2Query,
} from "../types/generated/graphql"

export const importFluentResource = (name: string, locale: string) =>
    new FluentResource(
        readFileSync(
            path.resolve(__dirname, `../../../locales/${locale}/${name}.ftl`),
            "utf-8"
        )
    )

export async function getLanguageIdByAlpha2(alpha2: Language["alpha2"]) {
    const res = await performQuery<LanguageIdByAlpha2Query>(
        LanguageIdByAlpha2.loc!.source,
        {
            alpha2,
        }
    )
    if (!res || !res.data || !res.data.languageByAlpha2) {
        chlog.child({ res, alpha2 }).error("Failed to find locale by alpha2")
        return null
    }
    return res.data!.languageByAlpha2.id
}
