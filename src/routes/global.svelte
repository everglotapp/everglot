<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { query } from "@urql/svelte"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import Spinner from "../comp/util/Spinner.svelte"
    import Headline3 from "../comp/typography/Headline3.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import {
        allGroupsStore,
        globalGroups,
        groupIsForLanguage,
    } from "../stores/groups"
    import type { GroupNode } from "../stores/groups"
    import { SUPPORTED_LOCALES } from "../constants"
    import type { SupportedLocale } from "../constants"

    query(allGroupsStore)

    let groups: Record<SupportedLocale, GroupNode[]> = {
        en: [],
        de: [],
        zh: [],
    }
    $: if (!$allGroupsStore.fetching && !$allGroupsStore.error) {
        groups = SUPPORTED_LOCALES.reduce(
            (map, lang) => ({
                ...map,
                [lang]: $globalGroups.filter((group) =>
                    groupIsForLanguage(group, lang)
                ),
            }),
            {
                en: [],
                de: [],
                zh: [],
            }
        )
    }

    onMount(() => {
        $allGroupsStore.context = { ...$allGroupsStore.context, pause: true }
        $allGroupsStore.context = { ...$allGroupsStore.context, pause: false }
    })

    let lang: SupportedLocale = "en"
</script>

<Localized id="global-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div
    class="container flex gap-x-4 flex-wrap justify-center md:justify-start py-4 md:py-12 w-full max-w-sm md:max-w-4xl"
    style="min-height: 60vh;"
>
    {#if $allGroupsStore.fetching}
        <div
            class="flex w-full items-center justify-center"
            style="padding: 30vh 0;"
            in:scale={{ duration: 100, delay: 600 }}
        >
            <Spinner size={48} />
        </div>
    {:else if $allGroupsStore.error}
        <ErrorMessage><Localized id="global-error" /></ErrorMessage>
    {:else if !$globalGroups.length}
        <RedirectOnce to={"/signup"} />
    {:else}
        <div class="sidebar md:py-8">
            <div class="px-4 text-lg w-full pt-4 md:pt-0 mb-4">
                <Headline3><Localized id="global-sidebar-language" /></Headline3
                >
                <div class="languages" role="tablist">
                    {#each SUPPORTED_LOCALES as locale}
                        <Localized id={`locale-${locale}`} let:text>
                            <button
                                on:click={() => (lang = locale)}
                                aria-selected={lang === locale}
                                role="tab">{text}</button
                            ></Localized
                        >
                    {/each}
                </div>
            </div>
        </div>
        <div class="md:border-l flex-grow pt-4 md:py-8">
            <div>
                <Headline3><Localized id="global-main-channels" /></Headline3>
            </div>
            <div
                class="text-xl font-light px-0 md:px-8 py-2 text-center justify-center"
                role="tabpanel"
            >
                {#each groups[lang] as group (group.uuid)}
                    <div
                        class="group flex"
                        in:scale|local={{ duration: 100, delay: 200 }}
                        out:scale|local={{ duration: 100 }}
                        style="transform-origin: center;"
                    >
                        <ButtonLarge
                            className="w-full justify-between flex flex-wrap"
                            color="SECONDARY"
                            variant="TEXT"
                            href={`/chat?group=${group.uuid}`}
                            ><span
                                class="name"
                                title={group.groupName || undefined}
                                >{group.groupName}</span
                            >
                            <span class="members-count"
                                ><Localized
                                    id="global-group-members-count"
                                    args={{
                                        membersCount:
                                            group.groupUsers.totalCount,
                                    }}
                                /></span
                            ></ButtonLarge
                        >
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .sidebar {
        min-width: 16rem;

        @apply flex-shrink;
    }

    .languages button {
        border-left-width: 3px;

        @apply border-transparent;
        @apply flex;
        @apply w-full;
        @apply py-2;
        @apply px-3;
        @apply items-center;
    }

    .languages button:hover {
        @apply bg-primary-lightest;
    }

    .languages button[aria-selected="true"] {
        @apply border-accent;
        @apply bg-gray-lightest;
    }

    .group {
        @apply mb-2;
    }

    .group:not(:last-child) {
        @apply border-b;
        @apply border-gray-light;
    }

    .group .name {
        max-width: 200px;

        @apply mr-3;
        @apply align-middle;
        @apply whitespace-nowrap;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
        @apply font-normal;

        @screen md {
            max-width: 368px;
        }
    }

    .group .members-count {
        @apply text-sm;
        @apply align-middle;
    }
</style>
