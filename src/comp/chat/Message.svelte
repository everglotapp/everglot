<script lang="ts">
    import { query } from "@urql/svelte"
    import { scale } from "svelte/transition"

    import { chatUsers, room } from "../../stores"

    import Avatar from "../users/Avatar.svelte"

    import type { User } from "../../types/generated/graphql"

    query(chatUsers)

    export let username = ""
    export let userUuid: string | null = null
    export let time = ""
    export let text = ""

    let user: Pick<
        User,
        "uuid" | "bio" | "username" | "avatarUrl"
    > | null = null
    $: if (!$chatUsers.fetching && chatUsers.data?.chatUsers) {
        user =
            (userUuid && userUuid.length
                ? chatUsers.data.chatUsers.nodes.find(
                      ({ uuid }) => uuid === userUuid
                  ) || null
                : null) || null
    }
</script>

<div
    class="message"
    transition:scale|local={{
        duration: 200,
    }}
>
    <div class="author">
        {#if userUuid}
            <span class="username">{username}</span>
        {:else}
            <span class="username">Everglot<br /> Bot</span>
        {/if}
        {#if !userUuid && $room && $room.length}
            <span class="room"> [{$room}]</span>
        {/if}
        {#if user !== null}
            <Avatar
                username={user.username || ""}
                url={user.avatarUrl || ""}
                size={32}
            />
        {/if}
    </div>
    <div class="main">
        <div class="time">{time}</div>
        <div class="text">{text}</div>
    </div>
</div>

<style>
    .message {
        @apply mb-3;
        @apply break-words;
        @apply bg-primary-lightest;
        @apply rounded-md;
        @apply shadow-sm;
        @apply flex;
    }

    .main {
        @apply p-2;
    }

    .main .text {
        @apply px-2;
    }

    .author {
        font-size: 15px;
        font-weight: bold;
        width: 5rem;
        padding-top: 1px;
        padding-bottom: 1px;

        @apply flex;
        @apply flex-col;
        @apply items-center;
        @apply justify-center;
        @apply text-gray-bitdark;
        @apply text-center;
        @apply bg-gray-lightest;
        @apply rounded-tl-md;
        @apply rounded-bl-md;
    }

    .username {
        line-height: 1rem;

        @apply text-primary-dark;
        @apply mb-1;
    }

    .room {
        @apply text-gray-bitdark;
    }

    .time {
        @apply text-gray-bitdark;
        @apply text-sm;
        @apply font-bold;
        @apply mb-1;
    }
</style>
