<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"

    query(allGroups)

    $: groups =
        allGroups && !$allGroups.fetching && !$allGroups.error
            ? $allGroups.data?.groups?.nodes
                  .filter((group) => group && group.global === false)
                  .map((group) => group!)
            : []
</script>

<svelte:head>
    <title>Groups – Everglot</title>
</svelte:head>

<div class="container flex w-auto gap-x-4">
    {#if $allGroups.fetching}
        …
    {:else if $allGroups.error}
        error
    {:else if !$allGroups.data?.groups?.nodes.some((group) => group && group.global === false)}
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
