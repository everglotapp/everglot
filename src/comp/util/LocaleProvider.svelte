<script lang="ts">
    import { negotiateLanguages } from "@fluent/langneg"
    import { FluentBundle, FluentResource } from "@fluent/bundle"
    import { FluentProvider } from "@nubolab-ffwd/svelte-fluent"

    import { validate as uuidValidate } from "uuid"

    import en from "../../../locales/en/app.ftl"
    import de from "../../../locales/de/app.ftl"
    import zh from "../../../locales/zh-CN/app.ftl"

    import { groupUuid } from "../../stores"
    import { currentGroupLocale } from "../../stores/locales"

    import { SUPPORTED_LOCALES } from "../../constants"
    import type { SupportedLocale } from "../../constants"

    export let segment: string | undefined = undefined
    segment = segment // get rid of unused prop warning

    // Store all translations as a simple object which is available
    // synchronously and bundled with the rest of the code.
    const RESOURCES: Record<SupportedLocale, FluentResource> = {
        de,
        en,
        zh,
    }

    function* generateBundles(userLocales: readonly string[]) {
        // Choose locales that are best for the user.
        const currentLocales = negotiateLanguages(
            userLocales,
            SUPPORTED_LOCALES,
            { defaultLocale: "en" }
        )

        for (const locale of currentLocales) {
            const bundle = new FluentBundle(locale)
            bundle.addResource(RESOURCES[locale as SupportedLocale])
            yield bundle
        }
    }

    function resolveCurrentGroup() {
        if (segment !== "chat") {
            return null
        }
        if (typeof window === "undefined") {
            /**
             * Prevent loading group data on server-side.
             */
            return null
        }
        const group = new URL(window.location.href).searchParams.get("group")
        if (group && group.length && uuidValidate(group)) {
            return group
        } else {
            return null
        }
    }
    // @ts-ignore
    $: segment, setTimeout(() => ($groupUuid = resolveCurrentGroup()), 50)

    $: navigatorLocales =
        typeof navigator === "undefined" ? [] : navigator.languages
    $: preferredLocales = $currentGroupLocale
        ? [$currentGroupLocale, ...navigatorLocales]
        : navigatorLocales
</script>

<FluentProvider bundles={generateBundles(preferredLocales)}>
    <slot />
</FluentProvider>
