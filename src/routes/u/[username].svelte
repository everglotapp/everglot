<script lang="ts">
    import { stores } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import ProfileHeader from "../../comp/users/ProfileHeader.svelte"
    import Post from "../../comp/feed/Post.svelte"

    import { query, operationStore } from "@urql/svelte"
    import {
        UserByUsernamePosts,
        UserProfile,
    } from "../../types/generated/graphql"
    import type {
        UserByUsernamePostsQuery,
        UserProfileQuery,
    } from "../../types/generated/graphql"
    import { currentUserUuid } from "../../stores/currentUser"
    import ErrorMessage from "../../comp/util/ErrorMessage.svelte"
    import Spinner from "../../comp/util/Spinner.svelte"

    const { page } = stores()

    let username: string = $page.params.username

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

    $: if ($page.params.username !== username) {
        username = $page.params.username
        if (username) {
            userProfileStore.variables = {
                username,
            }
            userPostsStore.variables = {
                username,
            }
        }
    }

    $: userProfile =
        $userProfileStore.data && !$userProfileStore.error
            ? $userProfileStore.data.userByUsername || null
            : null
    $: userIsCurrentUser = Boolean(
        $currentUserUuid !== null &&
            userProfile &&
            $currentUserUuid === userProfile.uuid
    )
    $: userLanguages =
        userProfile?.userLanguages?.nodes
            .filter(Boolean)
            .map((node) => node!) || []
    $: userUuid = userProfile?.uuid

    $: userPosts =
        $userPostsStore.data && !$userPostsStore.error
            ? $userPostsStore.data.userByUsername?.authoredPosts.nodes
                  .filter(Boolean)
                  .map((node) => node!) || []
            : []

    $: displayName = userProfile?.displayName || null
    $: bio = userProfile?.bio || null
    $: avatarUrl = userProfile?.avatarUrl || null

    enum ProfileTab {
        About,
        Squeeks,
    }
    let tab: ProfileTab = ProfileTab.About

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
    function handlePostUnlikeSuccess() {
        refreshPosts()
    }
</script>

{#if username}
    <Localized
        id="u-username-browser-window-title"
        let:text
        args={{ username }}
    >
        <BrowserTitle title={text} />
    </Localized>

    {#if userProfile === null}
        {#if $userProfileStore.fetching}
            <div
                class="container max-w-2xl my-16 flex items-center justify-center"
            >
                <Spinner />
            </div>
        {:else}
            <div class="container max-w-2xl my-4">
                <ErrorMessage>User {username} not found.</ErrorMessage>
            </div>
        {/if}
    {:else}
        <ProfileHeader
            {userUuid}
            {avatarUrl}
            {displayName}
            {username}
            isCurrentUser={userIsCurrentUser}
        />

        <div class="tabs container max-w-2xl mb-4">
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
            <div
                class="flex flex-wrap-reverse md:flex-nowrap container max-w-2xl"
            >
                <div class="pt-4 sm:pt-8 pb-4 px-4" style="flex: 0 0 240px;">
                    <h2>Languages</h2>
                    <ul>
                        {#each userLanguages as language}
                            <li class="font-bold text-gray-bitdark">
                                {language.language
                                    ? language.language.englishName
                                    : ""}
                                {#if language && language.native}
                                    <Localized
                                        id="profile-language-native-hint"
                                    />
                                {:else}
                                    ({language && language.languageSkillLevel
                                        ? language.languageSkillLevel.name || ""
                                        : ""})
                                {/if}
                            </li>
                        {/each}
                    </ul>
                </div>
                <div class="pt-4 sm:pt-8 pb-4 px-4">
                    <h2>About Me</h2>
                    <p>
                        {#if bio && bio.length}{bio}{:else}<span
                                class="text-gray"
                                >We're all eagerly waiting for {displayName ||
                                    username}
                                to introduce themselves.</span
                            >{/if}
                    </p>
                </div>
            </div>
        {:else if tab === ProfileTab.Squeeks}
            <div class="container max-w-2xl py-2 px-3 sm:px-0 gap-y-1">
                {#if !userPosts.length}
                    <span class="text-gray"
                        >So far, {displayName || username} has not posted any squeeks.</span
                    >
                {/if}
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
                                on:unlikeSuccess={handlePostUnlikeSuccess}
                            />
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    {/if}
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

        @screen sm {
            @apply mb-2;
        }
    }
</style>
