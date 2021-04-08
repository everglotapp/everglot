<script lang="ts">
    import { mutation } from "@urql/svelte"
    import { groupUuid } from "../../stores"
    import {
        currentGroupIsGlobal,
        chatUsers,
        chatLearners,
        chatNativeSpeakers,
        groupChatStore,
    } from "../../stores/chat"

    import { allGroupsStore } from "../../stores/groups"

    import MemberListItem from "./MemberListItem.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"

    import type { JoinGlobalGroupMutation } from "../../types/generated/graphql"
    import { JoinGlobalGroup } from "../../types/generated/graphql"

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })
    async function handleJoinGroup() {
        const res = await joinGlobalGroup({
            groupUuid: $groupUuid,
        })
        if (res.data) {
            $groupChatStore.context = {
                requestPolicy: "network-only",
                pause: true,
            }
            $groupChatStore.context = {
                requestPolicy: "network-only",
                pause: false,
            }
        } else {
            // TODO: Show error feedback
        }
    }

    let showBioUuid: number | null = null
</script>

<ul class="users">
    {#if $allGroupsStore.error}
        <i>error</i>
    {:else if !$allGroupsStore.data}
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        <div class="bg-gray-lightest mx-auto h-8 mb-1" />
    {:else if $currentGroupIsGlobal && !$chatUsers.length}
        <div class="text-center py-5 font-bold text-base text-gray-bitdark">
            <p>So far nobody is here 😥</p>
            <p>
                Why don't you go ahead and join this group to get the ball
                rolling? Somebody always has to go first!
            </p>
            <div class="px-8">
                <ButtonSmall
                    className="w-full justify-center"
                    tag="button"
                    variant="OUTLINED"
                    on:click={handleJoinGroup}>Join group</ButtonSmall
                >
            </div>
        </div>
    {:else if $currentGroupIsGlobal}
        <div class="mb-4">
            {#each $chatUsers as user, i (user.uuid)}
                {#if user}
                    <MemberListItem
                        id={`group-global-member-${i}`}
                        uuid={user.uuid}
                        avatarUrl={user.avatarUrl}
                        username={user.username}
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
                        uuid={user.uuid}
                        avatarUrl={user.avatarUrl}
                        username={user.username}
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
                        uuid={user.uuid}
                        avatarUrl={user.avatarUrl}
                        username={user.username}
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
