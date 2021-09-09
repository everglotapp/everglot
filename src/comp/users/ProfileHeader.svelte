<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { fade, scale } from "svelte/transition"

    import { operationStore, query } from "@urql/svelte"

    import Avatar from "./Avatar.svelte"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import Modal from "../util/Modal.svelte"

    import {
        ANDROID_WEBVIEW_USER_AGENT,
        ENLARGEN_PROFILE_PICTURE_BUTTON_ID,
    } from "../../constants"
    import type {
        Maybe,
        UserByUsernameFollowershipsQuery,
    } from "../../types/generated/graphql"
    import { UserByUsernameFollowerships } from "../../types/generated/graphql"
    import { currentUserUuid } from "../../stores/currentUser"

    export let displayName: Maybe<string>
    export let username: Maybe<string>
    export let avatarUrl: Maybe<string>
    export let userUuid: Maybe<string>
    export let isCurrentUser: boolean

    const userFollowershipsStore =
        operationStore<UserByUsernameFollowershipsQuery>(
            UserByUsernameFollowerships
        )
    userFollowershipsStore.variables = {
        username,
    }
    query(userFollowershipsStore)

    $: userFollowerships =
        $userFollowershipsStore.data && !$userFollowershipsStore.error
            ? $userFollowershipsStore.data.userByUsername
            : null
    $: _followedUsers =
        userFollowerships?.followedUsers.nodes
            .filter(Boolean)
            .map((node) => node!.user)
            .filter(Boolean)
            .map((user) => user!) || []
    $: followers =
        userFollowerships?.followers.nodes
            .filter(Boolean)
            .map((node) => node!.follower)
            .filter(Boolean)
            .map((user) => user!) || []
    $: currentUserIsFollowing =
        !isCurrentUser &&
        $currentUserUuid !== null &&
        followers
            .map((follower) => follower.uuid as string)
            .includes($currentUserUuid)

    const AVATAR_SIZE = 160

    // Hide these in mobile webviews until file uploads work.
    let hideUploadAvatarForm = false
    onMount(() => {
        if (navigator.userAgent === ANDROID_WEBVIEW_USER_AGENT) {
            /**
             * @see https://github.com/flutter/plugins/pull/3225
             */
            hideUploadAvatarForm = true
        }
    })

    const refreshFollowerships = () => {
        $userFollowershipsStore.context = {
            ...$userFollowershipsStore.context,
            paused: true,
        }
        $userFollowershipsStore.context = {
            ...$userFollowershipsStore.context,
            paused: false,
        }
    }

    let tmpFollowed = false
    let tmpUnfollowed = false
    async function handleFollow() {
        if (tmpFollowed || tmpUnfollowed) {
            return
        }
        if (!userUuid) {
            return
        }
        const endpoint = currentUserIsFollowing
            ? `/u/${userUuid}/unfollow`
            : `/u/${userUuid}/follow`
        if (currentUserIsFollowing) {
            tmpUnfollowed = true
        } else {
            tmpFollowed = true
        }
        const res = await fetch(endpoint, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const onSuccess = () => {
            dispatch(tmpFollowed ? "followSuccess" : "unfollowSuccess")
            refreshFollowerships()
        }
        const onFailure = () => {
            dispatch(tmpFollowed ? "followFailure" : "unfollowFailure")
            refreshFollowerships()
        }
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                onSuccess()
                setTimeout(() => {
                    tmpFollowed = false
                    tmpUnfollowed = false
                }, 250)
                return
            } else {
                onFailure()
            }
        } else {
            onFailure()
        }
        tmpFollowed = false
        tmpUnfollowed = false
    }

    $: newAvatarUrl = avatarUrl
    // $: shownAvatarUrl =
    //     $userProfileStore.fetching && newAvatarUrl ? newAvatarUrl : avatarUrl
    // TODO: change this after update works
    $: shownAvatarUrl = newAvatarUrl
    let showLargeProfilePictureUrl: string | null = null

    const dispatch = createEventDispatcher()
    // let errorId: string | null = null

    // let newAvatarUrl: string | null = null
    // let avatarForm: HTMLFormElement
    // async function handleUploadAvatar(e: Event) {
    //     e.preventDefault()
    //     errorId = null
    //     newAvatarUrl = null
    //     const formData = new FormData(avatarForm)
    //     try {
    //         const response = await fetch("/profile/picture", {
    //             method: "POST",
    //             body: formData,
    //         })
    //         const res = await response.json()
    //         if (res && res.success) {
    //             newAvatarUrl = res.meta.avatarUrl
    //             $userProfileStore.context = {
    //                 requestPolicy: "cache-and-network",
    //                 pause: true,
    //             }
    //             $userProfileStore.context = {
    //                 requestPolicy: "cache-and-network",
    //                 pause: false,
    //             }
    //             $currentUserStore.context = {
    //                 requestPolicy: "cache-and-network",
    //                 pause: true,
    //             }
    //             $currentUserStore.context = {
    //                 requestPolicy: "cache-and-network",
    //                 pause: false,
    //             }
    //         } else {
    //             errorId = "profile-avatar-upload-failed"
    //         }
    //     } catch (e) {
    //         errorId = "profile-avatar-upload-failed"
    //     }
    // }
</script>

<div
    class="flex container max-w-2xl font-secondary pt-4 sm:pt-8 items-center relative"
>
    {#key newAvatarUrl}
        <div
            id={ENLARGEN_PROFILE_PICTURE_BUTTON_ID}
            in:scale|local={{ delay: 400, duration: 100 }}
            class="avatar-container flex mb-4 mr-4 sm:mr-8 ml-3 sm:ml-0 cursor-pointer"
            class:cursor-pointer={shownAvatarUrl != null}
            style={`border-radius: 50%; max-height: 33vw; max-width: 33vw;`}
            on:click={() => {
                if (shownAvatarUrl != null) {
                    showLargeProfilePictureUrl = shownAvatarUrl
                }
            }}
        >
            <Avatar
                username={username || ""}
                url={shownAvatarUrl || ""}
                size={AVATAR_SIZE}
            />
        </div>
    {/key}
    <div class="flex flex-wrap items-center flex-grow">
        <div class="flex flex-col flex-grow">
            {#if $currentUserUuid && isCurrentUser}
                <div class="self-end pr-2">
                    <ButtonSmall
                        variant="FILLED"
                        color="PRIMARY"
                        href="/profile">Change Avatar</ButtonSmall
                    >
                </div>
            {/if}
            <div class="flex flex-wrap items-center">
                {#if displayName}
                    <span
                        class="text-2xl font-primary font-bold overflow-hidden overflow-ellipsis mr-2"
                        title={displayName || ""}>{displayName || ""}</span
                    ><span
                        class="text-xl font-primary text-gray-bitdark overflow-hidden overflow-ellipsis"
                        title={username || ""}>({username || ""})</span
                    >
                {:else}
                    <span
                        class="text-2xl font-primary font-bold overflow-hidden overflow-ellipsis"
                        title={username || ""}>{username || ""}</span
                    >
                {/if}
            </div>
            <div class="mt-1">
                <span
                    ><span class="mr-1">Followers:</span><span
                        class="inline-block"
                        style="min-width: 24px; width: 32px; margin-left: 2px; margin-right: 2px;"
                        >{#key $userFollowershipsStore.fetching}<span
                                in:fade={{ duration: 100, delay: 150 }}
                                out:fade|local={{ duration: 100 }}
                                class="text-gray-bitdark font-bold"
                                >{followers.length}</span
                            >{/key}</span
                    ></span
                >
                {#if !isCurrentUser}
                    <ButtonSmall
                        tag="button"
                        on:click={handleFollow}
                        variant="OUTLINED"
                        className="flex items-center"
                    >
                        {#if (currentUserIsFollowing && !tmpUnfollowed) || tmpFollowed}
                            Unfollow
                        {:else}
                            Follow
                        {/if}
                    </ButtonSmall>
                {/if}
            </div>
        </div>
    </div>
</div>

{#if showLargeProfilePictureUrl && typeof window !== "undefined"}
    <EscapeKeyListener on:keydown={() => (showLargeProfilePictureUrl = null)} />
    <ClickAwayListener
        elementId={[
            ENLARGEN_PROFILE_PICTURE_BUTTON_ID,
            "large-profile-picture-view",
        ]}
        on:clickaway={() => (showLargeProfilePictureUrl = null)}
    />
    <Modal>
        <div
            class="grid place-items-center w-full h-full"
            id="large-profile-picture-view"
        >
            <img
                src={showLargeProfilePictureUrl}
                alt="Enlargened profile"
                role="presentation"
                style="border-radius: 50%; max-width: 95vw; max-height: 90vh; box-shadow: 1px 1px 3px #393939, 1px 1px 9px #777; background: radial-gradient(circle at center, #fff 0, #fff 50%, #dcdcdc 100%);"
            />
        </div>
    </Modal>
{/if}

<style>
    .avatar-container > :global(div) {
        max-width: 33vw;
        max-height: 33vw;
        width: auto;
        height: auto;
    }
</style>
