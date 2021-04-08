<script lang="ts">
    import {
        groupIsGlobal,
        chatUsers,
        chatLearners,
        chatNativeSpeakers,
    } from "../../stores/chat"

    import { allGroupsStore } from "../../stores/groups"

    import MemberListItem from "./MemberListItem.svelte"

    let showBioUuid: number | null = null
</script>

<ul class="users">
    {#if $allGroupsStore.fetching}
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
    {:else if !$chatUsers.length}
        <div class="text-center py-5 font-bold text-gray">
            <p>So far nobody is here 😥</p>
            <p>
                Why don't you go ahead and join this group to get the ball
                rolling? Somebody has to go first!
            </p>
        </div>
    {:else if $groupIsGlobal}
        <div class="mb-4">
            {#each $chatUsers as user, i (user.uuid)}
                {#if user}
                    <MemberListItem
                        id={`group-global-member-${i}`}
                        {user}
                        showBio={showBioUuid === user.uuid}
                        handleClickAway={() => (showBioUuid = null)}
                        handleEscapeKey={() => (showBioUuid = null)}
                        on:click={() =>
                            (showBioUuid =
                                showBioUuid === user.uuid ? null : user.uuid)}
                    />
                {/if}
            {/each}
        </div>
    {:else}
        <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">
            Learners
        </h4>
        <div class="mb-4">
            {#each $chatLearners as user, i (user.uuid)}
                {#if user}
                    <MemberListItem
                        id={`group-learning-member-${i}`}
                        {user}
                        showBio={showBioUuid === user.uuid}
                        handleClickAway={() => (showBioUuid = null)}
                        handleEscapeKey={() => (showBioUuid = null)}
                        on:click={() =>
                            (showBioUuid =
                                showBioUuid === user.uuid ? null : user.uuid)}
                    />
                {/if}
            {/each}
        </div>
        <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">
            Native Speakers
        </h4>
        <div>
            {#each $chatNativeSpeakers as user, i (user.uuid)}
                {#if user}
                    <MemberListItem
                        id={`group-native-member-${i}`}
                        {user}
                        showBio={showBioUuid === user.uuid}
                        handleClickAway={() => (showBioUuid = null)}
                        handleEscapeKey={() => (showBioUuid = null)}
                        on:click={() =>
                            (showBioUuid =
                                showBioUuid === user.uuid ? null : user.uuid)}
                    />
                {/if}
            {/each}
        </div>
    {/if}
</ul>

<style>
    .users {
        @apply gap-y-1;
    }
</style>
