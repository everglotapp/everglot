<script lang="ts">
    import { scale } from "svelte/transition"

    import { chatLearners, chatNativeSpeakers } from "../../stores/chat"

    import Bio from "../users/Bio.svelte"
    import Avatar from "../users/Avatar.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    let showBioUuid: number | null = null
</script>

<ul class="users">
    <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">Learners</h4>
    <div class="mb-4">
        {#each $chatLearners as user, i (user.uuid)}
            {#if user}
                <li
                    id={`group-learning-member-${i}`}
                    class="user cursor-pointer"
                    title={user.username || undefined}
                    aria-label={user.username}
                    on:click={() =>
                        (showBioUuid =
                            showBioUuid === user.uuid ? null : user.uuid)}
                >
                    <div class="avatar">
                        <Avatar
                            url={user.avatarUrl || ""}
                            username={user.username || ""}
                            size={32}
                        />
                    </div>
                    <span class="username">{user.username}</span>
                    {#if showBioUuid !== null && showBioUuid === user.uuid}
                        <ClickAwayListener
                            elementId={`group-learning-member-${i}`}
                            on:clickaway={() => (showBioUuid = null)}
                        />
                        <EscapeKeyListener
                            on:keydown={() => (showBioUuid = null)}
                        />
                        <div
                            class="relative flex-shrink self-start"
                            aria-label={`User Bio`}
                            style="height: 0; width: 0;"
                        >
                            <div class="absolute" style="left: -42px;">
                                <div
                                    class="fixed bg-white shadow-lg rounded-lg"
                                    style="z-index: 1; min-width: 240px; transform-origin: top left;"
                                    in:scale|local={{ duration: 200, delay: 0 }}
                                    out:scale|local={{
                                        duration: 200,
                                        delay: 0,
                                    }}
                                >
                                    <Bio userUuid={user.uuid} />
                                </div>
                            </div>
                        </div>
                    {/if}
                </li>
            {/if}
        {/each}
    </div>
    <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">
        Native Speakers
    </h4>
    <div>
        {#each $chatNativeSpeakers as user, i (user.uuid)}
            {#if user}
                <li
                    id={`group-native-member-${i}`}
                    class="user cursor-pointer"
                    title={user.username || undefined}
                    aria-label={user.username}
                    on:click={() =>
                        (showBioUuid =
                            showBioUuid === user.uuid ? null : user.uuid)}
                >
                    <div class="avatar">
                        <Avatar
                            url={user.avatarUrl || ""}
                            username={user.username || ""}
                            size={32}
                        />
                    </div>
                    <span class="username">{user.username}</span>
                    {#if showBioUuid !== null && showBioUuid === user.uuid}
                        <ClickAwayListener
                            elementId={`group-native-member-${i}`}
                            on:clickaway={() => (showBioUuid = null)}
                        />
                        <EscapeKeyListener
                            on:keydown={() => (showBioUuid = null)}
                        />
                        <div
                            class="relative flex-shrink self-start"
                            aria-label={`User Bio`}
                            style="height: 0; width: 0;"
                        >
                            <div class="absolute" style="left: -42px;">
                                <div
                                    class="fixed bg-white shadow-lg rounded-lg"
                                    style="z-index: 1; min-width: 240px; transform-origin: top left;"
                                    in:scale|local={{ duration: 200, delay: 0 }}
                                    out:scale|local={{
                                        duration: 200,
                                        delay: 0,
                                    }}
                                >
                                    <Bio userUuid={user.uuid} />
                                </div>
                            </div>
                        </div>
                    {/if}
                </li>
            {/if}
        {/each}
    </div>
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
        @apply overflow-ellipsis;
        @apply text-left;
        @apply whitespace-nowrap;
    }
</style>
