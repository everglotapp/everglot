<script lang="ts">
    import { scale } from "svelte/transition"

    import Bio from "../users/Bio.svelte"
    import Avatar from "../users/Avatar.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    import type { BioUser } from "../users/Bio.svelte"
    import type { User } from "../../types/generated/graphql"

    export let users: (BioUser & Pick<User, "uuid">)[] = []
    let showBioId: number | null = null
</script>

<ul class="users">
    {#each users as user, i (user.uuid)}
        {#if user}
            <li
                id={`group-member-${i}`}
                class="user cursor-pointer"
                title={user.username || undefined}
                aria-label={user.username}
                on:click={() => (showBioId = showBioId === i ? null : i)}
            >
                <div class="avatar">
                    <Avatar
                        url={user.avatarUrl || ""}
                        username={user.username || ""}
                        size={32}
                    />
                </div>
                <span class="username">{user.username}</span>
                {#if showBioId !== null && showBioId === i}
                    <ClickAwayListener
                        elementId={`group-member-${i}`}
                        on:clickaway={() => (showBioId = null)}
                    />
                    <EscapeKeyListener on:keydown={() => (showBioId = null)} />
                    <div
                        class="relative flex-shrink"
                        in:scale={{ duration: 200, delay: 0 }}
                        out:scale={{ duration: 200, delay: 0 }}
                        aria-label={`User Bio`}
                        style="height: 0; width: 0; margin-left: 100%;"
                    >
                        <div class="absolute" style="left: 4px;">
                            <div
                                class="fixed bg-white shadow-lg rounded-lg"
                                style="z-index: 1; min-width: 240px;"
                            >
                                <Bio {user} />
                            </div>
                        </div>
                    </div>
                {/if}
            </li>
        {/if}
    {/each}
</ul>

<style>
    .users {
        @apply gap-y-1;
    }

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
    }

    .username {
        @apply flex-grow;
        @apply pl-4;
        @apply text-gray-dark;
        @apply text-sm;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
        @apply text-left;
    }
</style>
