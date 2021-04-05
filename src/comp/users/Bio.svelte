<script lang="ts">
    import type { User } from "../../types/generated/graphql"

    export let user:
        | Pick<User, "uuid" | "bio" | "username" | "avatarUrl">
        | undefined
</script>

<div class="wrapper">
    {#if user}
        <span class="font-bold text-gray-bitdark">{user.username || "?"}</span>
        <hr class="my-1" />
        <div>{user.bio}</div>
    {:else}
        <span class="text-sm italic">error</span>
    {/if}
</div>

<style>
    .wrapper {
        text-align: initial;

        @apply text-base;
        @apply py-2;
        @apply px-5;
    }
</style>
