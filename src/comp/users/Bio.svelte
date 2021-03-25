<script lang="ts">
    import { chatUsers } from "../../stores"

    import { query } from "@urql/svelte"

    import type { User } from "../../types/generated/graphql"
    export let uuid: User["uuid"] | null = null

    query(chatUsers)

    let user: Pick<User, "uuid" | "bio" | "username" | "avatarUrl"> | undefined
    $: if (!$chatUsers.fetching && chatUsers.data) {
        user = chatUsers.data.chatUsers.nodes.find((u) => uuid === u.uuid)
    }
</script>

<div>
    {#if $chatUsers.fetching}
        …
    {:else if user}
        {user.username}
        <hr />
        {user.bio}
    {:else}
        error
    {/if}
</div>
