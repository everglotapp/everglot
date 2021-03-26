<script lang="ts">
    import { query } from "@urql/svelte"
    import { scale } from "svelte/transition"

    import { chatUsers, room } from "../../stores"

    import Avatar from "../users/Avatar.svelte"
    import Bio from "../users/Bio.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    import type { User } from "../../types/generated/graphql"

    query(chatUsers)

    export let uuid: string = ""
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
                      (u) => u.uuid === userUuid
                  ) || null
                : null) || null
    }

    let showBio = false
</script>

<div
    class="message"
    transition:scale|local={{
        duration: 200,
    }}
>
    <div class="author">
        {#if userUuid}
            <span class="username">{user ? user.username : "…"}</span>
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
                on:click={(event) => {
                    event.stopPropagation()
                    showBio = !showBio
                }}
            />
            {#if showBio}
                <ClickAwayListener
                    elementId={`message-${uuid}-bio`}
                    on:clickaway={() => (showBio = false)}
                />
                <EscapeKeyListener on:keydown={() => (showBio = false)} />
                <div
                    class="relative"
                    in:scale={{ duration: 200, delay: 0 }}
                    out:scale={{ duration: 200, delay: 0 }}
                    aria-label={`User Bio`}
                    style="height: 0; width: 0; margin-left: 100%;"
                >
                    <div class="absolute" style="left: 4px;">
                        <div
                            id={`message-${uuid}-bio`}
                            class="fixed bg-white shadow-lg rounded-md"
                            style="z-index: 1; min-width: 240px;"
                        >
                            <Bio uuid={userUuid} />
                        </div>
                    </div>
                </div>
            {/if}
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
