<script lang="ts">
    import { scale } from "svelte/transition"
    import { query } from "@urql/svelte"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import SidebarHeadline from "../comp/typography/SidebarHeadline.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { groupUuid } from "../stores"
    import {
        allGroupsStore,
        globalGroups,
        groupIsForLanguage,
    } from "../stores/groups"
    import type { GroupNode } from "../stores/groups"

    query(allGroupsStore)

    type GroupLanguage = "en" | "de" | "zh"

    let groups: Record<GroupLanguage, GroupNode[]> = {
        en: [],
        de: [],
        zh: [],
    }
    $: if (!$allGroupsStore.fetching && !$allGroupsStore.error) {
        groups = ["en", "de", "zh"].reduce(
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

    let lang: "en" | "de" | "zh" = "en"
</script>

<svelte:head>
    <title>Global – Everglot</title>
</svelte:head>

<div
    class="container flex gap-x-4 flex-wrap justify-center md:justify-start py-4 md:py-12 w-full max-w-sm md:max-w-4xl"
>
    {#if $allGroupsStore.fetching}
        <div />
    {:else if $allGroupsStore.error}
        error
    {:else if !$globalGroups.length}
        <RedirectOnce to={"/signup"} />
    {:else}
        <div class="sidebar">
            <div class="languages-container px-4 text-lg w-full mb-4">
                <SidebarHeadline
                    ><Localized id="global-sidebar-language" /></SidebarHeadline
                >
                <div class="languages" role="tablist">
                    <button
                        on:click={() => (lang = "en")}
                        aria-selected={lang === "en"}
                        role="tab">English</button
                    >
                    <button
                        on:click={() => (lang = "de")}
                        aria-selected={lang === "de"}
                        role="tab">German</button
                    >
                    <button
                        on:click={() => (lang = "zh")}
                        aria-selected={lang === "zh"}
                        role="tab">Chinese</button
                    >
                </div>
            </div>
        </div>
        <div
            class="groups text-xl font-light p-8 rounded-xl text-center justify-center"
            role="tabpanel"
        >
            {#each groups[lang] as group (group.uuid)}
                <div
                    class="flex"
                    in:scale|local={{ duration: 100, delay: 200 }}
                    out:scale|local={{ duration: 100 }}
                    style="transform-origin: center;"
                >
                    <ButtonLarge
                        className="w-full justify-between"
                        color="SECONDARY"
                        variant="FILLED"
                        href={`/chat?group=${group.uuid}`}
                        on:click={() => ($groupUuid = group.uuid)}
                        ><span class="name" title={group.groupName || undefined}
                            >{group.groupName}</span
                        >
                        <span class="members-count"
                            ><Localized
                                id="global-group-members-count"
                                args={{
                                    membersCount: group.groupUsers.totalCount,
                                }}
                            /></span
                        ></ButtonLarge
                    >
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    .sidebar {
        min-width: 16rem;

        @apply py-8;
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
        @apply bg-primary-lightest;
    }

    .groups {
        @apply flex-grow;
    }

    .groups .name {
        max-width: 368px;

        @apply mr-3;
        @apply align-middle;
        @apply whitespace-nowrap;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
    }

    .groups .members-count {
        @apply text-sm;
        @apply align-middle;
    }
</style>
