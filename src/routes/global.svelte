<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"
    import type { AllGroupsQuery, MakeMaybe } from "../types/generated/graphql"

    query(allGroups)

    type GroupLanguage = "en" | "de" | "zh"
    let groups: Record<GroupLanguage, MakeMaybe<AllGroupsQuery, "groups">> = {
        en: [] as Pick<AllGroupsQuery["groups"], "nodes">,
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
            {}
        )
    }
    const groupIsGlobal = (group) => group.global === true
    const groupIsForLanguage = (group, lang) => group.language?.alpha2 === lang
</script>

<svelte:head>
    <title>Global – Everglot</title>
</svelte:head>

<div class="container flex w-auto gap-x-4">
    {#if $allGroups.fetching}
        …
    {:else if $allGroups.error}
        error
    {:else if !$allGroups.data?.groups?.nodes.some(groupIsGlobal)}
        <RedirectOnce to={"/profile"} />
    {:else}
        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
        >
            <h3 class="text-xl text-gray-bitdark">German</h3>
            {#each groups["de"] as group (group.uuid)}
                <div
                    class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
                >
                    <ButtonLarge
                        href={`/chat?lang=${group.language?.englishName}&group=${group.uuid}`}
                        >{group.groupName}</ButtonLarge
                    >
                </div>
            {/each}
        </div>

        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
        >
            <h3 class="text-xl text-gray-bitdark">English</h3>
            {#each groups["en"] as group (group.uuid)}
                <div
                    class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
                >
                    <ButtonLarge
                        href={`/chat?lang=${group.language?.englishName}&group=${group.uuid}`}
                        >{group.groupName}</ButtonLarge
                    >
                </div>
            {/each}
        </div>

        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
        >
            <h3 class="text-xl text-gray-bitdark">Chinese</h3>
            {#each groups["zh"] as group (group.uuid)}
                <div
                    class="max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
                >
                    <ButtonLarge
                        href={`/chat?lang=${group.language?.englishName}&group=${group.uuid}`}
                        >{group.groupName}</ButtonLarge
                    >
                </div>
            {/each}
        </div>
    {/if}
</div>
