<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"
    import type { Language, AllGroupsQuery } from "../types/generated/graphql"

    query(allGroups)

    type GroupLanguage = "en" | "de" | "zh"
    type GroupNode = NonNullable<
        NonNullable<AllGroupsQuery["groups"]>["nodes"][0]
    >

    let groups: Record<GroupLanguage, GroupNode[]> = {
        en: [],
        de: [],
        zh: [],
    }
    $: if (allGroups && !$allGroups.fetching && !$allGroups.error) {
        groups = ["en", "de", "zh"].reduce(
            (map, lang) => ({
                ...map,
                [lang]: $allGroups.data?.groups?.nodes.filter(
                    (group) =>
                        group &&
                        groupIsGlobal(group) &&
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
    const groupIsGlobal = (group: GroupNode) => group.global === true
    const groupIsForLanguage = (group: GroupNode, lang: Language["alpha2"]) =>
        group.language?.alpha2 === lang

    let lang: "en" | "de" | "zh" = "en"
</script>

<svelte:head>
    <title>Global – Everglot</title>
</svelte:head>

<div
    class="container flex gap-x-4 flex-wrap justify-center md:justify-start py-16 w-full max-w-sm md:max-w-4xl"
>
    {#if $allGroups.fetching}
        …
    {:else if $allGroups.error}
        error
    {:else if !$allGroups.data?.groups?.nodes.some(groupIsGlobal)}
        <RedirectOnce to={"/profile"} />
    {:else}
        <div class="sidebar">
            <div class="languages-container px-4 text-lg w-full mb-4">
                <h3
                    class="px-4 text-gray-bitdark text-sm font-bold mb-4 text-center"
                >
                    Language
                </h3>
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
            class="groups max-w-sm text-xl font-light p-8 rounded-xl text-center justify-center shadow-sm"
            role="tabpanel"
        >
            {#each groups[lang] as group (group.uuid)}
                <ButtonLarge
                    className="w-full justify-center"
                    color="SECONDARY"
                    variant="FILLED"
                    href={`/chat?group=${group.uuid}`}
                    ><span class="name">{group.groupName}</span>
                    <span class="members-count"
                        >{group.groupUsers.totalCount} members</span
                    ></ButtonLarge
                >
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
        border-right-width: 3px;

        @apply text-primary;
        @apply border-primary;
    }

    .groups {
        @apply flex-grow;
    }

    .groups .name {
        @apply mr-3;
        @apply align-middle;
    }

    .groups .members-count {
        @apply text-sm;
        @apply align-middle;
    }
</style>
