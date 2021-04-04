<script lang="ts">
    import { scale } from "svelte/transition"

    import Bio from "../users/Bio.svelte"
    import Avatar from "../users/Avatar.svelte"

    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"

    import type { User } from "../../types/generated/graphql"

    export let users: (Pick<
        Pick<User, "uuid" | "id" | "username" | "avatarUrl">,
        "uuid" | "username" | "avatarUrl"
    > & { username: string })[] = []
    let showBioId: number | null = null
</script>

<ul class="users">
    {#each users as user, i}
        {#if user.username === ""}
            <li class="user" title="Everglot Bot" />
        {:else}
            <li
                id={`user-bio-${i}`}
                class="user"
                title={user.username}
                aria-label={user.username}
            >
                {#if showBioId !== null && showBioId === i}
                    <ClickAwayListener
                        elementId={`user-bio-${i}`}
                        on:clickaway={() => (showBioId = null)}
                    />
                    <EscapeKeyListener on:keydown={() => (showBioId = null)} />
                    <div
                        class="relative"
                        in:scale={{ duration: 200, delay: 0 }}
                        out:scale={{ duration: 200, delay: 0 }}
                        aria-label={`User Bio`}
                        style="height: 0; width: 0; margin-left: 100%;"
                    >
                        <div class="absolute" style="left: 4px;">
                            <div
                                class="fixed bg-white shadow-lg rounded-md"
                                style="z-index: 1; min-width: 240px;"
                            >
                                <Bio uuid={user.uuid} />
                            </div>
                        </div>
                    </div>
                {/if}
                <Avatar
                    url={user.avatarUrl || ""}
                    username={user.username || ""}
                    on:click={() => (showBioId = showBioId === i ? null : i)}
                />
            </li>
        {/if}
    {/each}
</ul>

<style>
    .users {
        @apply grid;
        @apply grid-rows-3;
        @apply grid-flow-col;
        @apply gap-2;
        @apply overflow-x-auto;
    }

    .user {
        width: 50px;
        height: 50px;
    }
</style>
