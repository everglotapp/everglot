import { FluentBundle, FluentResource, FluentVariable } from "@fluent/bundle"

import log from "../../logger"

import { importFluentResource } from "../../helpers/locales"
import { ENABLE_FLUENT_BIDIRECTIONAL_SUPPORT } from "../../constants"

type SupportedLocale = "en" | "de"
const SUPPORTED_LOCALES = ["en", "de"]

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
            const locale = SUPPORTED_LOCALES.includes(userLocale)
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
    en: importFluentResource("bot", "en"),
    de: importFluentResource("bot", "de"),
}

const BUNDLES: Record<
    SupportedLocale,
    FluentBundle | undefined
> = SUPPORTED_LOCALES.reduce(
    (map, locale: SupportedLocale) => {
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
    },
    { en: undefined, de: undefined }
)
