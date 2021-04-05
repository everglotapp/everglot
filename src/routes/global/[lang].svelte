<script lang="ts">
    import PageTitle from "../../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
    import { query } from "@urql/svelte"

    import { stores } from "@sapper/app"
    const { page } = stores()

    import { allGroups } from "../../stores"

    query(allGroups)

    $: groups =
        allGroups && !$allGroups.fetching && !$allGroups.error
            ? $allGroups.data?.groups?.nodes
                  .filter(
                      (group) =>
                          group &&
                          group.global === true &&
                          group.language?.alpha2 === $page.params.lang
                  )
                  .map((group) => group!)
            : []
</script>

<svelte:head>
    <title>Everglot – {$page.params.lang} groups</title>
</svelte:head>

{#if $allGroups.fetching}
    …
{:else if $allGroups.error}
    error
{:else}
    <div class="container w-auto gap-x-4 max-w-sm pt-8">
        <PageTitle>Groups: {$page.params.lang}</PageTitle>
        {#each groups as group (group.uuid)}
            <div
                class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
            >
                <ButtonLarge href={`/chat?lang=German&group=${group.uuid}`}
                    >{group.groupName}</ButtonLarge
                >
            </div>
        {/each}
    </div>
{/if}
