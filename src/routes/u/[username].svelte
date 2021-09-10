<script lang="ts">
    import { stores } from "@sapper/app"
    import { scale } from "svelte/transition"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import ProfileHeader from "../../comp/users/ProfileHeader.svelte"
    import Post from "../../comp/feed/Post.svelte"

    import { query, operationStore } from "@urql/svelte"
    import {
        UserByUsernamePosts,
        UserProfile,
        CurrentUserProfile,
        UserType,
    } from "../../types/generated/graphql"
    import type {
        UserByUsernamePostsQuery,
        UserProfileQuery,
        CurrentUserProfileQuery,
    } from "../../types/generated/graphql"
    import { currentUser, currentUserUuid } from "../../stores/currentUser"
    import ErrorMessage from "../../comp/util/ErrorMessage.svelte"
    import ButtonSmall from "../../comp/util/ButtonSmall.svelte"
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
    import Spinner from "../../comp/util/Spinner.svelte"

    const { page } = stores()

    let username: string = $page.params.username

    const userProfileStore = operationStore<UserProfileQuery>(UserProfile)
    userProfileStore.variables = {
        username,
    }
    query(userProfileStore)

    const currentUserProfileStore =
        operationStore<CurrentUserProfileQuery>(CurrentUserProfile)
    currentUserProfileStore.context = { paused: true }
    query(currentUserProfileStore)

    const userPostsStore =
        operationStore<UserByUsernamePostsQuery>(UserByUsernamePosts)
    userPostsStore.variables = {
        username,
    }
    query(userPostsStore)

    $: if ($page.params.username !== username) {
        username = $page.params.username
        if (username) {
            preventRefreshBio = false
            newBio = null
            userProfileStore.variables = {
                username,
            }
            userPostsStore.variables = {
                username,
            }
            if ($currentUser && username === $currentUser.username) {
                refreshCurrentUserProfile()
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

    $: currentUserProfile =
        $currentUserProfileStore.data && !$currentUserProfileStore.error
            ? $currentUserProfileStore.data.currentUser || null
            : null
    $: currentUserGroupUsers =
        currentUserProfile?.groupUsers?.nodes
            .filter(Boolean)
            .map((node) => node!) || []

    enum ProfileTab {
        About,
        Squeeks,
    }
    let tab: ProfileTab = ProfileTab.About

    const refreshProfile = () => {
        $userProfileStore.context = {
            ...$userProfileStore.context,
            paused: true,
        }
        $userProfileStore.context = {
            ...$userProfileStore.context,
            paused: false,
        }
    }

    const refreshCurrentUserProfile = () => {
        $currentUserProfileStore.context = {
            ...$currentUserProfileStore.context,
            paused: true,
        }
        $currentUserProfileStore.context = {
            ...$currentUserProfileStore.context,
            paused: false,
        }
    }

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

    let editBio: boolean = false
    let newBio: string | null = null
    let preventRefreshBio = false
    $: if (
        !$currentUserProfileStore.fetching &&
        $currentUserProfileStore.data
    ) {
        if (!preventRefreshBio) {
            if (!editBio) {
                newBio = bio
            }
        }
        preventRefreshBio = true
    }

    let errorId: string | undefined
    async function handleUpdateBio() {
        if (newBio === null) {
            return
        }
        console.log({
            method: "POST",
            body: JSON.stringify({ bio: newBio }),
        })
        const onSuccess = () => {
            refreshCurrentUserProfile()
            refreshProfile()
        }
        const onFailure = () => {
            // refreshCurrentUserProfile()
            // refreshProfile()
        }
        try {
            const response = await fetch("/profile/bio", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ bio: newBio }),
            })
            const res = await response.json()
            if (res && res.success) {
                onSuccess()
            } else {
                errorId = "profile-bio-update-failed"
                onFailure()
            }
        } catch (e) {
            errorId = "profile-bio-update-failed"
            onFailure()
        }
        editBio = false
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
                    {#if userIsCurrentUser}
                        <div class="pb-8">
                            <h2>Email</h2>
                            {#if $currentUserProfileStore.data && currentUserProfile}
                                <span
                                    >{currentUserProfile.email ||
                                        "unknown"}</span
                                >
                            {:else}
                                <span>…</span>
                            {/if}
                        </div>
                    {/if}
                    <div class="pb-8">
                        <h2>Languages</h2>
                        <ul>
                            {#each userLanguages as language}
                                <li
                                    class="font-bold text-gray-bitdark list-none"
                                >
                                    {language.language
                                        ? language.language.englishName
                                        : ""}
                                    {#if language && language.native}
                                        <Localized
                                            id="profile-language-native-hint"
                                        />
                                    {:else}
                                        ({language &&
                                        language.languageSkillLevel
                                            ? language.languageSkillLevel
                                                  .name || ""
                                            : ""})
                                    {/if}
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
                <div class="pt-4 sm:pt-8 pb-4 px-4 flex-1">
                    <div class="pb-8">
                        <h2 class="flex items-center">
                            About Me{#if userIsCurrentUser}<ButtonSmall
                                    tag="button"
                                    variant="TEXT"
                                    color="PRIMARY"
                                    className="flex items-center text-sm ml-1"
                                    on:click={() => (editBio = true)}
                                    >change</ButtonSmall
                                >{/if}
                        </h2>
                        {#if editBio}
                            <div
                                in:scale={{ duration: 100 }}
                                out:scale={{ duration: 100 }}
                            >
                                <textarea
                                    rows={5}
                                    bind:value={newBio}
                                    class="w-full"
                                />
                                <div class="flex items-center justify-end pt-1">
                                    <ButtonLarge
                                        tag="button"
                                        variant="TEXT"
                                        color="SECONDARY"
                                        className="flex items-center text-sm"
                                        on:click={() => (editBio = false)}
                                        >Cancel</ButtonLarge
                                    >
                                    <ButtonLarge
                                        tag="button"
                                        variant="FILLED"
                                        color="PRIMARY"
                                        className="flex items-center text-sm ml-1"
                                        on:click={handleUpdateBio}
                                        >Save</ButtonLarge
                                    >
                                </div>
                            </div>
                        {:else}
                            <p class="m-0">
                                {#if bio && bio.length}
                                    {#each (bio || "").split("\n") as bioPart}
                                        {bioPart}<br />
                                    {/each}
                                {:else}<span class="text-gray"
                                        >We're all eagerly waiting for {displayName ||
                                            username}
                                        to introduce themselves.</span
                                    >{/if}
                            </p>
                        {/if}
                    </div>
                    {#if userIsCurrentUser && currentUserGroupUsers.length}
                        <div class="pb-8">
                            <h2>Groups</h2>
                            {#each currentUserGroupUsers as groupUser}
                                {#if groupUser.group}
                                    <li class="list-none">
                                        <ButtonSmall
                                            href={`/chat?group=${groupUser.group.uuid}`}
                                            variant="TEXT"
                                            color="SECONDARY"
                                            className="group-item flex justify-start"
                                        >
                                            <span
                                                class="group-item-name font-sans overflow-hidden overflow-ellipsis pr-8"
                                            >
                                                {groupUser.group
                                                    .groupName}</span
                                            >
                                            <span
                                                class="group-item-lang font-sans font-normal"
                                            >
                                                {#if groupUser.userType === UserType.Global}
                                                    {groupUser.group.language
                                                        ? groupUser.group
                                                              .language
                                                              .englishName
                                                        : ""}
                                                {:else}
                                                    {groupUser.group.language
                                                        ? groupUser.group
                                                              .language
                                                              .englishName
                                                        : ""}
                                                    {groupUser.group
                                                        .languageSkillLevel
                                                        ? groupUser.group
                                                              .languageSkillLevel
                                                              .name
                                                        : ""}
                                                {/if}</span
                                            >
                                        </ButtonSmall>
                                    </li>
                                {/if}
                            {/each}
                        </div>
                    {/if}
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

    :global(.group-item) {
        min-width: 320px;
    }

    :global(.group-item) .group-item-name {
        width: 180px;

        @screen sm {
            width: 250px;
        }
    }

    h2 {
        @apply mb-3;

        @screen sm {
            @apply mb-2;
        }
    }
</style>
