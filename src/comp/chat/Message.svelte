<script lang="ts">
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"

    import { chatUsers } from "../../stores/chat"

    import Avatar from "../users/Avatar.svelte"
    import Bio from "../users/Bio.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"

    import type { User } from "../../types/generated/graphql"

    export let userUuid: User["uuid"] | null
    $: user = userUuid
        ? $chatUsers.find((u) => u?.uuid === userUuid) || null
        : null

    export let uuid = ""
    export let time = ""
    export let text = ""

    let showBio = false
    let showMore = false

    const MAX_BODY_LEN = 580
    $: body = showMore ? text : text.substring(0, MAX_BODY_LEN)
    $: bodyCutOff = text.length > MAX_BODY_LEN
</script>

<div
    class="message"
    transition:scale|local={{
        duration: 200,
    }}
>
    <div class="avatar" id={`message-${uuid}-avatar`}>
        {#if user !== null}
            {#if showBio}
                <ClickAwayListener
                    elementId={`message-${uuid}-avatar`}
                    on:clickaway={() => (showBio = false)}
                />
                <EscapeKeyListener on:keydown={() => (showBio = false)} />
                <div
                    class="relative"
                    aria-label={`User Bio`}
                    style="height: 0; width: 0; margin-left: 100%;"
                >
                    <div class="absolute" style="left: 4px;">
                        <div
                            class="bg-white shadow-lg rounded-lg"
                            style="z-index: 1; min-width: 240px; transform-origin: top left;"
                            in:scale|local={{ duration: 200, delay: 0 }}
                            out:scale|local={{ duration: 200, delay: 0 }}
                        >
                            <Bio {userUuid} />
                        </div>
                    </div>
                </div>
            {/if}
        {/if}
        <div class="cursor-pointer">
            {#if user}
                <Avatar
                    username={user.username || ""}
                    url={user.avatarUrl || ""}
                    size={36}
                    on:click={() => (showBio = !showBio)}
                />
            {/if}
        </div>
    </div>
    <div class="main w-full">
        <div class="meta">
            <div class="flex items-center">
                {#if userUuid}
                    {#if user?.username}
                        <span class="username mr-2">{user.username}</span>
                    {:else}
                        <span class="username mr-2 italic">unknown</span>
                    {/if}
                {:else}
                    <span class="username bot mr-2">Everglot Bot</span>
                {/if}
                <time
                    use:svelteTime={{
                        timestamp: time,
                        format: "h:mm A",
                    }}
                    title={time}
                />
            </div>
            <time
                class="self-end text-sm text-gray"
                use:svelteTime={{
                    timestamp: time,
                    format: "MMMM D, YYYY",
                }}
            />
        </div>
        <div class="body">{body}{bodyCutOff && !showMore ? "…" : ""}</div>
        {#if bodyCutOff}
            <div>
                {#if showMore}
                    <ButtonSmall
                        className="w-full justify-center"
                        variant="TEXT"
                        color="SECONDARY"
                        tag="button"
                        on:click={() => (showMore = false)}
                        >Show less</ButtonSmall
                    >
                {:else}
                    <ButtonSmall
                        className="w-full justify-center"
                        variant="TEXT"
                        color="SECONDARY"
                        tag="button"
                        on:click={() => (showMore = true)}
                        >Show more</ButtonSmall
                    >
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .message {
        transform-origin: top center;

        @apply mb-3;
        @apply break-words;
        @apply rounded-md;
        @apply shadow-sm;
        @apply flex;
    }

    .main {
        @apply p-2;
        @apply bg-gray-lightest;
    }

    .main .body {
        @apply px-2;
    }

    .avatar {
        font-size: 15px;
        font-weight: bold;
        width: 5rem;
        max-width: 5rem;

        @apply flex;
        @apply flex-col;
        @apply justify-center;
        @apply items-center;
        @apply text-gray-bitdark;
        @apply pt-1;
    }

    .meta {
        @apply text-gray-bitdark;
        @apply text-sm;
        @apply mb-1;
        @apply flex;
        @apply w-full;
        @apply justify-between;
    }

    .username {
        line-height: 1rem;
        max-width: 6rem;

        @apply inline-block;
        @apply whitespace-nowrap;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
        @apply text-primary-dark;
        @apply font-bold;

        @screen sm {
            max-width: 12rem;
        }

        @screen md {
            max-width: 16rem;
        }
    }

    .username.bot {
        @apply text-primary;
    }

    .meta time {
        @apply font-bold;
    }
</style>
