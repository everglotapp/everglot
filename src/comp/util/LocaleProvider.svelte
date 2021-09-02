<script lang="ts">
    import { negotiateLanguages } from "@fluent/langneg"
    import { FluentBundle, FluentResource } from "@fluent/bundle"
    import { FluentProvider } from "@nubolab-ffwd/svelte-fluent"

    import en from "../../../locales/en/app.ftl"
    import de from "../../../locales/de/app.ftl"
    import zh from "../../../locales/zh-CN/app.ftl"
    import es from "../../../locales/es/app.ftl"
    import fr from "../../../locales/fr/app.ftl"
    import it from "../../../locales/it/app.ftl"
    import ru from "../../../locales/ru/app.ftl"
    import pt from "../../../locales/pt-PT/app.ftl"
    // import ko from "../../../locales/ko/app.ftl"
    import ja from "../../../locales/ja/app.ftl"

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
        es,
        fr,
        it,
        ru,
        pt,
        // ko,
        ja,
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

    $: navigatorLocales =
        typeof navigator === "undefined" ? [] : navigator.languages
    $: preferredLocales = $currentGroupLocale
        ? [$currentGroupLocale, ...navigatorLocales]
        : navigatorLocales
</script>

<FluentProvider bundles={generateBundles(preferredLocales)}>
    <slot />
</FluentProvider>
