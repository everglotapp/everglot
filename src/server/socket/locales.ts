import { FluentBundle, FluentResource, FluentVariable } from "@fluent/bundle"

import log from "../../logger"

import en from "../../../locales/en/bot.ftl"
import de from "../../../locales/de/bot.ftl"
import zh from "../../../locales/zh-CN/bot.ftl"
import es from "../../../locales/es/bot.ftl"
import fr from "../../../locales/fr/bot.ftl"
import it from "../../../locales/it/bot.ftl"
import ja from "../../../locales/ja/bot.ftl"
import ru from "../../../locales/ru/bot.ftl"
import pt from "../../../locales/pt-PT/bot.ftl"

import {
    SUPPORTED_LOCALES,
    ENABLE_FLUENT_BIDIRECTIONAL_SUPPORT,
} from "../../constants"

import type { SupportedLocale } from "../../constants"

const chlog = log.child({
    namespace: "bot-locale",
})

export function translate(userLocale: string) {
    return async function translateToLocale(
        fluentMessageId: string,
        args?: Record<string, FluentVariable>,
        errors?: Error[]
    ): Promise<string> {
        return new Promise((resolve, reject) => {
            const locale: SupportedLocale = SUPPORTED_LOCALES.find(
                (l) => l === userLocale
            )
                ? (userLocale as SupportedLocale)
                : "en"
            const bundle = BUNDLES[locale]!

            let message = bundle.getMessage(fluentMessageId)
            if (message?.value) {
                resolve(bundle.formatPattern(message.value, args, errors))
            } else {
                reject()
            }
        })
    }
}

// Store all translations as a simple object which is available
// synchronously and bundled with the rest of the code.
const RESOURCES: Record<SupportedLocale, FluentResource> = {
    en,
    de,
    zh,
    es,
    fr,
    it,
    ja,
    ru,
    pt,
}

const BUNDLES: Record<SupportedLocale, FluentBundle | undefined> =
    SUPPORTED_LOCALES.reduce((map, locale: SupportedLocale) => {
        const bundle = new FluentBundle(locale, {
            useIsolating: ENABLE_FLUENT_BIDIRECTIONAL_SUPPORT,
        })
        const errors = bundle.addResource(RESOURCES[locale])
        if (errors.length) {
            chlog
                .child({
                    errors,
                })
                .error(`Failed to load fluent resource`)
            process.exit(1)
        }
        return {
            ...map,
            [locale]: bundle,
        }
    }, Object.fromEntries(Object.keys(RESOURCES).map((locale) => [locale])))
