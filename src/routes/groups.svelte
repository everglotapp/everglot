<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"
    import type { AllGroupsQuery } from "../types/generated/graphql"

    query(allGroups)

    type GroupNode = NonNullable<
        NonNullable<AllGroupsQuery["groups"]>["nodes"][0]
    >

    let groups: GroupNode[] = []
    $: if (allGroups && !$allGroups.fetching && !$allGroups.error) {
        groups =
            $allGroups.data?.groups?.nodes
                .filter((group) => group && groupIsPrivate(group))
                .map((group) => group!) || []
    }
    const groupIsPrivate = (group: GroupNode) => group.global === false
</script>

<svelte:head>
    <title>Groups – Everglot</title>
</svelte:head>

<div class="container flex w-auto gap-x-4">
    {#if $allGroups.fetching}
        …
    {:else if $allGroups.error}
        error
    {:else if !$allGroups.data?.groups?.nodes.some(groupIsPrivate)}
        <RedirectOnce to={"/profile"} />
    {:else}
        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center justify-center shadow-sm"
        >
            <h3 class="text-xl text-gray-bitdark">Your groups</h3>
            {#each groups as group (group.uuid)}
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
