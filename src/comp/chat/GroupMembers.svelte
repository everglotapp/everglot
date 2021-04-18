<script lang="ts">
    import { mutation } from "@urql/svelte"
    import { Localized, Overlay } from "@nubolab-ffwd/svelte-fluent"
    import { groupUuid } from "../../stores"
    import {
        currentGroupIsGlobal,
        currentUserIsGroupMember,
        chatUsers,
        chatLearners,
        chatNativeSpeakers,
        groupChatStore,
    } from "../../stores/chat"

    import { allGroupsStore } from "../../stores/groups"

    import MemberListItem from "./MemberListItem.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ErrorMessage from "../util/ErrorMessage.svelte"

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

{#if $allGroupsStore.error}
    <ErrorMessage>
        <Localized id="chat-sidebar-members-error" />
    </ErrorMessage>
{:else}
    <ul class="users">
        {#if !$allGroupsStore.data || (!$chatUsers.length && $groupChatStore.fetching)}
            <div class="bg-gray-lightest mx-auto h-8 mb-1" />
            <div class="bg-gray-lightest mx-auto h-8 mb-1" />
            <div class="bg-gray-lightest mx-auto h-8 mb-1" />
            <div class="bg-gray-lightest mx-auto h-8 mb-1" />
            <div class="bg-gray-lightest mx-auto h-8 mb-1" />
        {:else if $currentGroupIsGlobal && !$chatUsers.length && $groupChatStore.data && !$groupChatStore.error}
            <div class="text-center py-5 font-bold text-base text-gray-bitdark">
                <Overlay id="chat-sidebar-members-nobody-prompt">
                    <p data-l10n-name="nobody" />
                    <p data-l10n-name="prompt" />
                </Overlay>
            </div>
            <div class="px-8">
                <ButtonSmall
                    className="w-full justify-center"
                    tag="button"
                    variant="OUTLINED"
                    on:click={handleJoinGroup}
                    ><Localized
                        id="chat-sidebar-members-join-group"
                    /></ButtonSmall
                >
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
                                    showBioUuid === user.uuid
                                        ? null
                                        : user.uuid)}
                        />
                    {/if}
                {/each}
                {#if !$currentUserIsGroupMember && $groupChatStore.data && !$groupChatStore.error}
                    <div class="px-8">
                        <ButtonSmall
                            className="w-full justify-center"
                            tag="button"
                            variant="OUTLINED"
                            on:click={handleJoinGroup}
                        >
                            <Localized id="chat-sidebar-members-join-group" />
                        </ButtonSmall>
                    </div>
                {/if}
            </div>
        {:else}
            <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">
                <Localized id="chat-sidebar-members-native" />
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
                                    showBioUuid === user.uuid
                                        ? null
                                        : user.uuid)}
                        />
                    {/if}
                {/each}
            </div>
            <h4 class="text-gray-bitdark text-sm font-bold text-left mb-1">
                <Localized id="chat-sidebar-members-native" />
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
                                    showBioUuid === user.uuid
                                        ? null
                                        : user.uuid)}
                        />
                    {/if}
                {/each}
            </div>
        {/if}
    </ul>
{/if}

<style>
    .users {
        @apply gap-y-1;
    }
</style>
