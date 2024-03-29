<script lang="ts">
    import { scale } from "svelte/transition"

    import type { Maybe } from "../../types/generated/graphql"

    import ProfilePreview from "../users/ProfilePreview.svelte"
    import Avatar from "../users/Avatar.svelte"

    import { MicIcon, MicOffIcon, VolumeXIcon } from "svelte-feather-icons"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import { usersInCurrentCall } from "../../stores/call"
    import { chatUsers } from "../../stores/chat"
    import { getActiveStatus } from "../../users"

    export let id: string
    export let avatarUrl: Maybe<string> | undefined
    export let username: Maybe<string> | undefined
    export let uuid: string | undefined

    export let showProfilePreview = false
    export let handleClickAway: (e: CustomEvent<any>) => any
    export let handleEscapeKey: (e: CustomEvent<any>) => any

    $: callUser = uuid
        ? $usersInCurrentCall.find((callUser) => callUser.uuid === uuid) || null
        : null

    $: chatUser = uuid ? $chatUsers.find((u) => u?.uuid === uuid) || null : null
    $: activeStatus = chatUser
        ? getActiveStatus(new Date(chatUser.lastActiveAt))
        : null
</script>

<li
    {id}
    class="user cursor-pointer"
    title={username || undefined}
    aria-label={username}
    on:click
    in:scale={{ duration: 200 }}
    style="transform-origin: center;"
>
    <div class="avatar">
        <Avatar url={avatarUrl} username={username || ""} size={32} {uuid} />
        {#if activeStatus}
            <div class={`active-status ${activeStatus}`} />
        {/if}
    </div>
    <span class="username">{username || ""}</span>
    {#if callUser}
        {#if callUser.micMuted}
            <MicOffIcon size="18" class="text-gray-bitdark" />
        {:else}
            <MicIcon size="18" class="text-gray-bitdark" />
        {/if}
        {#if callUser.audioMuted}
            <VolumeXIcon size="18" class="text-gray-bitdark ml-1" />
        {/if}
    {/if}
    {#if showProfilePreview}
        <ClickAwayListener elementId={id} on:clickaway={handleClickAway} />
        <EscapeKeyListener on:keydown={handleEscapeKey} />
        <div
            class="relative flex-shrink self-start"
            aria-label={`User Bio`}
            style="height: 0; width: 0;"
        >
            <div class="bio-outer absolute">
                <div
                    class="fixed bg-white shadow-lg rounded-lg"
                    style="z-index: 1; min-width: 240px; transform-origin: top left;"
                    in:scale|local={{ duration: 200, delay: 0 }}
                    out:scale|local={{
                        duration: 200,
                        delay: 0,
                    }}
                >
                    <ProfilePreview userUuid={uuid || null} />
                </div>
            </div>
        </div>
    {/if}
</li>

<style>
    .user {
        @apply flex;
        @apply items-center;
        @apply w-full;
        @apply overflow-hidden;
        @apply py-1;
        @apply px-2;
    }

    .user:hover {
        @apply bg-primary-lightest;
    }

    .avatar {
        width: 32px;
        height: 32px;

        @apply relative;
    }

    .avatar :global(*) {
        font-size: 1rem !important;
        font-weight: normal !important;
    }

    .username {
        @apply flex-grow;
        @apply pl-4;
        @apply text-gray-dark;
        @apply text-sm;
        @apply overflow-hidden;
        @apply text-ellipsis;
        @apply text-left;
        @apply whitespace-nowrap;
    }

    .active-status {
        border-radius: 50%;
        height: 12px;
        width: 12px;
        right: 0;
        bottom: -2px;
        border: 1px solid white;

        @apply absolute;
    }

    .active-status.online {
        background: #82ed93;
    }

    .active-status.idle {
        background: #f9ef0a;
    }

    .active-status.offline {
        background: #ccc;
    }

    .bio-outer {
        left: -122px;

        @screen sm {
            left: -42px;
        }
    }
</style>
