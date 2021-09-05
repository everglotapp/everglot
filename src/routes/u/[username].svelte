<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { stores } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import Post from "../../comp/feed/Post.svelte"
    import EscapeKeyListener from "../../comp/util/EscapeKeyListener.svelte"
    import ClickAwayListener from "../../comp/util/ClickAwayListener.svelte"
    import Modal from "../../comp/util/Modal.svelte"

    import { query, operationStore } from "@urql/svelte"
    import {
        UserByUsernamePosts,
        UserProfile,
    } from "../../types/generated/graphql"
    import type {
        UserProfileQuery,
        UserByUsernamePostsQuery,
    } from "../../types/generated/graphql"
    import Avatar from "../../comp/users/Avatar.svelte"
    import {
        ANDROID_WEBVIEW_USER_AGENT,
        ENLARGEN_PROFILE_PICTURE_BUTTON_ID,
    } from "../../constants"

    const { page } = stores()

    const username = $page.params.username

    const userProfileStore = operationStore<UserProfileQuery>(UserProfile)
    userProfileStore.variables = {
        username,
    }
    query(userProfileStore)

    const userPostsStore =
        operationStore<UserByUsernamePostsQuery>(UserByUsernamePosts)
    userPostsStore.variables = {
        username,
    }
    query(userPostsStore)

    $: userProfile =
        $userProfileStore.data && !$userProfileStore.error
            ? $userProfileStore.data.userByUsername
            : null
    $: userLanguages =
        userProfile?.userLanguages?.nodes
            .filter(Boolean)
            .map((node) => node!) || []

    $: userPosts =
        $userPostsStore.data && !$userPostsStore.error
            ? $userPostsStore.data.userByUsername?.authoredPosts.nodes
                  .filter(Boolean)
                  .map((node) => node!) || []
            : []

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

    $: displayName = userProfile?.displayName
    $: bio = userProfile?.bio
    $: avatarUrl = userProfile?.avatarUrl

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

    $: newAvatarUrl = avatarUrl

    enum ProfileTab {
        About,
        Squeeks,
    }
    let tab: ProfileTab = ProfileTab.About

    const AVATAR_SIZE = 160

    const refreshPosts = () => {
        $userPostsStore.context = {
            ...$userPostsStore.context,
            paused: true,
        }
        $userPostsStore.context = {
            ...$userPostsStore.context,
            paused: false,
        }
    }

    function handlePostReplySuccess() {
        refreshPosts()
    }

    function handlePostLikeSuccess() {
        refreshPosts()
    }

    $: shownAvatarUrl =
        $userProfileStore.fetching && newAvatarUrl ? newAvatarUrl : avatarUrl
    let showLargeProfilePictureUrl: string | null = null
</script>

<svelte:head />

<Localized id="u-username-browser-window-title" let:text args={{ username }}>
    <BrowserTitle title={text} />
</Localized>

<div class="flex container max-w-2xl font-secondary pt-4 sm:pt-8 items-center">
    {#key newAvatarUrl}
        <div
            id={ENLARGEN_PROFILE_PICTURE_BUTTON_ID}
            in:scale|local={{ delay: 400, duration: 100 }}
            class="mb-4 mr-8 cursor-pointer"
            class:cursor-pointer={shownAvatarUrl != null}
            style={`border-radius: 50%; width: ${AVATAR_SIZE}px; height: ${AVATAR_SIZE}px;`}
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
</div>

<div class="tabs container max-w-2xl">
    <button
        aria-selected={tab === ProfileTab.About}
        on:click={() => (tab = ProfileTab.About)}>About</button
    >
    <button
        aria-selected={tab === ProfileTab.Squeeks}
        on:click={() => (tab = ProfileTab.Squeeks)}>Squeeks</button
    >
</div>
{#if tab === ProfileTab.About}
    <div class="flex flex-wrap-reverse container max-w-2xl">
        <div class="pt-8 pb-4 px-4">
            <h2>Languages</h2>
            <ul>
                {#each userLanguages as language}
                    <li class="font-bold text-gray-bitdark">
                        {language.language ? language.language.englishName : ""}
                        {#if language && language.native}
                            <Localized id="profile-language-native-hint" />
                        {:else}
                            ({language && language.languageSkillLevel
                                ? language.languageSkillLevel.name || ""
                                : ""})
                        {/if}
                    </li>
                {/each}
            </ul>
        </div>
        <div class="pt-8 pb-4 px-4">
            <h2>About Me</h2>
            <p>
                {#if bio && bio.length}{bio}{:else}<span
                        class="text-gray italic">(empty)</span
                    >{/if}
            </p>
        </div>
    </div>
{:else if tab === ProfileTab.Squeeks}
    <div class="container max-w-2xl py-2 px-3 sm:px-0 gap-y-1">
        {#each userPosts as post (post.uuid)}
            {#if post.author}
                <div class="post">
                    <Post
                        uuid={post.uuid}
                        body={post.body}
                        author={post.author}
                        likes={post.likes}
                        replies={post.replies}
                        recordings={post.recordings}
                        createdAt={post.createdAt}
                        prompt={post.prompt}
                        language={post.language}
                        linkToAuthorProfile={false}
                        on:replySuccess={handlePostReplySuccess}
                        on:likeSuccess={handlePostLikeSuccess}
                    />
                </div>
            {/if}
        {/each}
    </div>
{/if}

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
    .tabs {
        @apply border-gray-light;
        @apply border-b-4;
    }

    .tabs > button {
        @apply text-primary;
        @apply font-bold;
        @apply px-4;
        @apply pt-3;
        @apply pb-2;

        margin-bottom: -4px;
    }

    .tabs > button[aria-selected="true"] {
        @apply border-primary;
        @apply border-b-4;
    }

    h2 {
        @apply mb-3;
    }
</style>
