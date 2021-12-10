<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { scale } from "svelte/transition"
    import { v4 as uuidv4 } from "uuid"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import Avatar from "./Avatar.svelte"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import Modal from "../util/Modal.svelte"
    import ErrorMessage from "../util/ErrorMessage.svelte"

    import {
        ANDROID_WEBVIEW_USER_AGENT,
        USER_UPLOAD_AVATAR_FILE_FORM_FIELD,
    } from "../../constants"
    import type {
        Maybe,
        UserByUsernameFollowershipsQuery,
    } from "../../types/generated/graphql"
    import { currentUserUuid } from "../../stores/currentUser"
    import { toggleFollow } from "../../routes/_helpers/users"

    export let displayName: Maybe<string>
    export let username: Maybe<string>
    export let avatarUrl: Maybe<string>
    export let userUuid: Maybe<string>
    export let isCurrentUser: boolean

    export let followers: NonNullable<
        NonNullable<
            NonNullable<
                NonNullable<
                    UserByUsernameFollowershipsQuery["userByUsername"]
                >["followers"]["nodes"]
            >[number]
        >["follower"]
    >[]

    $: currentUserIsFollowing =
        !isCurrentUser &&
        $currentUserUuid !== null &&
        followers
            .map((follower) => follower.uuid as string)
            .includes($currentUserUuid)

    const AVATAR_SIZE = 160

    // Hide these in mobile webviews until file uploads work.
    let hideUploadAvatarForm = false
    let fileInputId: string
    let avatarId: string
    onMount(() => {
        if (navigator.userAgent === ANDROID_WEBVIEW_USER_AGENT) {
            /**
             * @see https://github.com/flutter/plugins/pull/3225
             */
            hideUploadAvatarForm = true
        }
        newAvatarUrl = avatarUrl
        fileInputId = uuidv4()
        avatarId = uuidv4()
    })

    let tmpFollowed = false
    let tmpUnfollowed = false
    async function handleFollow() {
        if (tmpFollowed || tmpUnfollowed) {
            return
        }
        if (!userUuid) {
            return
        }
        if (currentUserIsFollowing) {
            tmpUnfollowed = true
        } else {
            tmpFollowed = true
        }
        const res = await toggleFollow({
            uuid: userUuid,
            followedByCurrentUser: currentUserIsFollowing,
        })
        const onSuccess = () => {
            dispatch(tmpFollowed ? "followSuccess" : "unfollowSuccess")
        }
        const onFailure = () => {
            dispatch(tmpFollowed ? "followFailure" : "unfollowFailure")
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

    $: shownAvatarUrl = newAvatarUrl !== null ? newAvatarUrl : avatarUrl
    // @ts-expect-error
    $: username, (newAvatarUrl = null)
    let showLargeProfilePictureUrl: string | null = null

    const dispatch = createEventDispatcher()
    let errorId: string | null = null

    let newAvatarUrl: string | null = null
    let avatarForm: HTMLFormElement
    async function handleUploadAvatar(e: Event) {
        e.preventDefault()
        errorId = null
        newAvatarUrl = null
        const formData = new FormData(avatarForm)
        const onSuccess = () => {
            dispatch("uploadProfilePictureSuccess")
        }
        const onFailure = () => {
            dispatch("uploadProfilePictureFailure")
        }
        try {
            const response = await fetch("/profile/picture", {
                method: "POST",
                body: formData,
            })
            const res = await response.json()
            if (res && res.success) {
                newAvatarUrl = res.meta.avatarUrl
                onSuccess()
            } else {
                errorId = "profile-avatar-upload-failed"
                onFailure()
            }
        } catch (e) {
            errorId = "profile-avatar-upload-failed"
            onFailure()
        }
    }
</script>

<div class="flex container max-w-2xl">
    {#if errorId}
        <div class="mb-4 sm:mb-16">
            <ErrorMessage>
                <Localized id={errorId} />
            </ErrorMessage>
        </div>
    {/if}
</div>
<div
    class="flex container max-w-2xl font-secondary pt-4 sm:pt-8 items-center relative"
>
    {#key newAvatarUrl}
        <div
            in:scale|local={{ delay: 400, duration: 100 }}
            class="avatar-container flex mb-4 mr-4 sm:mr-8 ml-3 sm:ml-0 cursor-pointer relative"
            class:cursor-pointer={shownAvatarUrl != null}
            style={`border-radius: 50%; max-height: 33vw; max-width: 33vw;`}
        >
            <Avatar
                id={avatarId}
                username={username || ""}
                url={shownAvatarUrl || ""}
                uuid={userUuid}
                size={AVATAR_SIZE}
                on:click={() => {
                    if (shownAvatarUrl != null) {
                        showLargeProfilePictureUrl = shownAvatarUrl
                    }
                }}
            />
            {#if !hideUploadAvatarForm && $currentUserUuid && isCurrentUser}
                <label
                    for={fileInputId}
                    class="absolute bg-gray-light text-black cursor-pointer p-2 border-2 border-white"
                    style="right: 15%; bottom: -13px; border-radius: 50%;"
                    ><svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="18px"
                        height="18px"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                        ><g fill="currentColor"
                            ><path
                                d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"
                            /><path
                                d="M8 11a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0a.5.5 0 0 1 1 0z"
                            /></g
                        ></svg
                    ></label
                >
                <form
                    action="/profile/picture"
                    enctype="multipart/form-data"
                    method="post"
                    bind:this={avatarForm}
                    class="hidden"
                >
                    <input
                        id={fileInputId}
                        type="file"
                        name={USER_UPLOAD_AVATAR_FILE_FORM_FIELD}
                        accept="image/png,image/jpeg"
                        required
                        on:change={handleUploadAvatar}
                    />
                </form>
            {/if}
        </div>
    {/key}
    <div
        class="flex flex-wrap items-center flex-grow overflow-hidden text-ellipsis whitespace-nowrap"
    >
        <div class="flex flex-col flex-grow w-full">
            <div class="flex flex-wrap items-center">
                {#if displayName}
                    <span
                        class="text-2xl font-primary font-bold overflow-hidden text-ellipsis mr-2"
                        title={displayName || ""}>{displayName || ""}</span
                    ><span
                        class="text-xl font-primary text-gray-bitdark overflow-hidden text-ellipsis"
                        title={username || ""}>({username || ""})</span
                    >
                {:else}
                    <span
                        class="text-2xl font-primary font-bold overflow-hidden text-ellipsis"
                        title={username || ""}>{username || ""}</span
                    >
                {/if}
            </div>
            <div class="mt-1">
                <span
                    ><span class="inline-block">
                        <span class="text-gray-bitdark font-bold"
                            >{followers.length}</span
                        ></span
                    ><span class="mx-2">Followers</span></span
                >
                {#if !isCurrentUser}
                    <ButtonSmall
                        tag="button"
                        on:click={handleFollow}
                        variant={currentUserIsFollowing && !tmpUnfollowed
                            ? "OUTLINED"
                            : "FILLED"}
                        color={currentUserIsFollowing && !tmpUnfollowed
                            ? "SECONDARY"
                            : "PRIMARY"}
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
        elementId={[avatarId, "large-profile-picture-view"]}
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
