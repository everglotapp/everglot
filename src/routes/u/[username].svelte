<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { stores } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import Post from "../../comp/feed/Post.svelte"

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
    import { ANDROID_WEBVIEW_USER_AGENT } from "../../constants"

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
</script>

<svelte:head />

<Localized id="u-username-browser-window-title" let:text args={{ username }}>
    <BrowserTitle title={text} />
</Localized>

<div class="flex container max-w-2xl font-secondary pt-4 sm:pt-8 items-center">
    {#key newAvatarUrl}
        <div
            in:scale|local={{ delay: 400, duration: 100 }}
            class="mb-4 mr-8"
            style="border-radius: 50%; width: 128px; height: 128px;"
        >
            <Avatar
                username={username || ""}
                url={$userProfileStore.fetching && newAvatarUrl
                    ? newAvatarUrl
                    : avatarUrl || ""}
                size={128}
            />
        </div>
    {/key}
    <div class="flex flex-wrap items-center">
        {#if displayName}
            <span class="text-2xl font-primary font-bold"
                >{displayName || ""}</span
            >&nbsp;<span class="text-xl font-primary text-gray-bitdark"
                >({username || ""})</span
            >
        {:else}
            <span class="text-2xl font-primary font-bold">{username || ""}</span
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
            <h3>Languages</h3>
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
            <h3>About Me</h3>
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
                    />
                </div>
            {/if}
        {/each}
    </div>
{/if}

<style>
    .tabs {
        @apply border-gray-bitlight;
        @apply border-b-2;
    }

    .tabs > button {
        @apply text-primary;
        @apply font-bold;
        @apply px-4;
        @apply py-3;
    }

    .tabs > button[aria-selected="true"] {
        @apply border-primary;
        @apply border-b-2;
    }

    h3 {
        @apply mb-3;
    }
</style>
