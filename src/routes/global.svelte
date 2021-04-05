<script lang="ts">
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { query } from "@urql/svelte"

    import { allGroups } from "../stores"
    import type { Language, Group } from "../types/generated/graphql"

    query(allGroups)

    function groupUuid(lang: Language["alpha2"]): Group["uuid"] {
        const group = $allGroups.data?.groups?.nodes
            .filter(Boolean)
            .find(
                (group) =>
                    group!.global === true && group!.language?.alpha2 === lang
            )
        if (!group) {
            return ""
        }
        return group.uuid
    }
</script>

{#if $allGroups.fetching}
    …
{:else if $allGroups.error}
    error
{:else}
    <div class="container flex w-auto gap-x-4">
        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
        >
            <ButtonLarge href={`/chat?lang=German&group=${groupUuid("de")}`}
                >German</ButtonLarge
            >
        </div>

        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
        >
            <ButtonLarge href={`/chat?lang=English&group=${groupUuid("en")}`}
                >English</ButtonLarge
            >
        </div>

        <div
            class="my-16 max-w-sm text-xl font-light p-8 bg-gray-lightest rounded-xl text-center flex justify-center shadow-sm"
        >
            <ButtonLarge href={`/chat?lang=Chinese&group=${groupUuid("zh")}`}
                >Chinese</ButtonLarge
            >
        </div>
    </div>
{/if}
