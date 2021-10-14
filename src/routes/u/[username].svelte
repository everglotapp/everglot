<script lang="ts">
    import { stores } from "@sapper/app"
    import { scale } from "svelte/transition"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import ProfileHeader from "../../comp/users/ProfileHeader.svelte"
    import Post from "../../comp/feed/Post.svelte"
    import Avatar from "../../comp/users/Avatar.svelte"

    import { query, operationStore } from "@urql/svelte"
    import { XIcon, CheckIcon } from "svelte-feather-icons"
    import {
        Maybe,
        UserByUsernamePosts,
        UserProfile,
        UserType,
    } from "../../types/generated/graphql"
    import type {
        UserByUsernamePostsQuery,
        UserProfileQuery,
    } from "../../types/generated/graphql"
    import { currentUser, currentUserUuid } from "../../stores/currentUser"
    import ErrorMessage from "../../comp/util/ErrorMessage.svelte"
    import ButtonSmall from "../../comp/util/ButtonSmall.svelte"
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
    import Spinner from "../../comp/util/Spinner.svelte"
    import {
        currentUserProfileStore,
        userFollowershipsStore,
    } from "../../stores/profile"

    const { page } = stores()

    let username: string = $page.params.username

    const userProfileStore = operationStore<UserProfileQuery>(UserProfile)
    userProfileStore.context = { paused: true }
    userProfileStore.variables = {
        username,
    }
    query(userProfileStore)

    currentUserProfileStore.context = { paused: true }
    query(currentUserProfileStore)

    const userPostsStore =
        operationStore<UserByUsernamePostsQuery>(UserByUsernamePosts)
    userPostsStore.variables = {
        username,
    }
    query(userPostsStore)

    userFollowershipsStore.variables = { username }
    query(userFollowershipsStore)
    $: if (username) {
        userFollowershipsStore.context = {
            paused: true,
        }
        userFollowershipsStore.variables = {
            username,
        }
        userFollowershipsStore.context = {
            paused: false,
        }
    } else {
        userFollowershipsStore.context = {
            paused: true,
        }
    }

    $: if ($page.params.username !== username) {
        username = $page.params.username
        tab = ProfileTab.About
        if (username) {
            preventRefreshBio = false
            newBio = null
            userProfileStore.variables = {
                username,
            }
            userPostsStore.variables = {
                username,
            }
            refreshProfile()
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

    $: userFollowerships =
        $userFollowershipsStore.data && !$userFollowershipsStore.error
            ? $userFollowershipsStore.data.userByUsername
            : null
    $: followedUsers =
        userFollowerships?.followedUsers.nodes
            .filter(Boolean)
            .map((node) => node!.user)
            .filter(Boolean)
            .map((user) => user!)
            .sort((_a, b) =>
                $currentUserUuid === null
                    ? 0
                    : b.uuid === $currentUserUuid
                    ? 1
                    : -1
            ) || []
    $: followers =
        userFollowerships?.followers.nodes
            .filter(Boolean)
            .map((node) => node!.follower)
            .filter(Boolean)
            .map((user) => user!)
            .sort((_a, b) =>
                $currentUserUuid === null
                    ? 0
                    : b.uuid === $currentUserUuid
                    ? 1
                    : -1
            ) || []

    enum ProfileTab {
        About,
        Squeeks,
        Followers,
        Following,
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

    function handlePostReplySuccess() {
        refreshPosts()
    }

    function handlePostLikeSuccess() {
        refreshPosts()
    }
    function handlePostUnlikeSuccess() {
        refreshPosts()
    }

    function handleFollowSuccess() {
        refreshFollowerships()
    }
    function handleUnfollowSuccess() {
        refreshFollowerships()
    }

    let editBio: boolean = false
    let newBio: string | null = null
    let preventRefreshBio = false
    $: if (
        !$currentUserProfileStore.fetching &&
        $currentUserProfileStore.data &&
        currentUserProfile
    ) {
        if (!preventRefreshBio) {
            if (!editBio) {
                newBio = currentUserProfile.bio
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
            preventRefreshBio = false
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

    async function handleFollow(user: {
        uuid: any
        followedByCurrentUser?: Maybe<boolean>
    }) {
        if (!user.uuid) {
            return
        }
        const endpoint = user.followedByCurrentUser
            ? `/u/${user.uuid}/unfollow`
            : `/u/${user.uuid}/follow`

        const res = await fetch(endpoint, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const onSuccess = () => {
            refreshFollowerships()
        }
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                onSuccess()
                return
            } else {
                // onFailure()
            }
        } else {
            // onFailure()
        }
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
            {followers}
            on:followSuccess={handleFollowSuccess}
            on:unfollowSuccess={handleUnfollowSuccess}
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
            <button
                aria-selected={tab === ProfileTab.Followers}
                on:click={() => (tab = ProfileTab.Followers)}>Followers</button
            >
            <button
                aria-selected={tab === ProfileTab.Following}
                on:click={() => (tab = ProfileTab.Following)}>Following</button
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
                <div class="pt-4 sm:pt-8 pb-4 px-4" style="flex: 1 1 400px;">
                    <div class="pb-8">
                        <h2 class="flex items-center">
                            About Me{#if userIsCurrentUser}<ButtonSmall
                                    tag="button"
                                    variant="TEXT"
                                    color={editBio ? "SECONDARY" : "PRIMARY"}
                                    className="flex items-center text-sm ml-1"
                                    on:click={() => (editBio = !editBio)}
                                    >{#if editBio}cancel{:else}edit{/if}</ButtonSmall
                                >{/if}
                        </h2>
                        {#if editBio}
                            <form
                                in:scale={{ duration: 100 }}
                                out:scale={{ duration: 100 }}
                                on:submit|preventDefault={handleUpdateBio}
                            >
                                <textarea
                                    rows={5}
                                    bind:value={newBio}
                                    class="w-full font-sans"
                                />
                                <div class="flex items-center justify-end pt-1">
                                    <ButtonLarge
                                        tag="button"
                                        variant="TEXT"
                                        color="SECONDARY"
                                        className="flex items-center text-sm"
                                        on:click={() => (editBio = false)}
                                        ><XIcon
                                            size="20"
                                            class="mr-2"
                                        />Cancel</ButtonLarge
                                    >
                                    <ButtonLarge
                                        tag="button"
                                        type="submit"
                                        variant="FILLED"
                                        color="PRIMARY"
                                        className="flex items-center text-sm ml-1"
                                        ><CheckIcon
                                            size="20"
                                            class="mr-2"
                                        />Save</ButtonLarge
                                    >
                                </div>
                            </form>
                        {:else}
                            <p
                                class="m-0"
                                in:scale|local={{ duration: 60, delay: 150 }}
                            >
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
                                games={post.games}
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
        {:else if tab === ProfileTab.Followers}
            <div
                class="flex flex-col flex-wrap-reverse md:flex-nowrap container max-w-2xl"
            >
                {#if !followers.length}
                    <div class="py-4 px-2 text-gray w-full text-center">
                        Nobody is following {displayName || username}, yet ☹️
                    </div>
                {/if}
                <ul class="flex flex-col w-full">
                    {#each followers as follower (follower.uuid)}
                        <li
                            class="flex w-full items-center pt-2 pb-3 px-4"
                            in:scale|local={{ duration: 100 }}
                            out:scale|local={{ duration: 100 }}
                        >
                            <div class="pr-3 sm:pr-4">
                                <a href={`/u/${follower.username}`}>
                                    <Avatar
                                        username={follower.username ||
                                            undefined}
                                        url={follower.avatarUrl || undefined}
                                        uuid={follower.uuid || null}
                                        size={48}
                                    /></a
                                >
                            </div>
                            <div
                                class="flex flex-col flex-nowrap flex-1 text-gray-bitdark"
                            >
                                <div>
                                    <a
                                        href={`/u/${follower.username}`}
                                        class="text-gray-bitdark"
                                        >{follower.displayName ||
                                            follower.username}</a
                                    >
                                </div>
                                {#if follower.bio}<div class="bio">
                                        {follower.bio}
                                    </div>{/if}
                            </div>
                            {#if $currentUserUuid !== null && follower.uuid !== $currentUserUuid}
                                <div
                                    class="flex items-center justify-center text-gray-bitdark"
                                >
                                    <ButtonSmall
                                        tag="button"
                                        on:click={() => handleFollow(follower)}
                                        variant={follower.followedByCurrentUser
                                            ? "OUTLINED"
                                            : "FILLED"}
                                        color={follower.followedByCurrentUser
                                            ? "SECONDARY"
                                            : "PRIMARY"}
                                        className="flex items-center"
                                    >
                                        {#if follower.followedByCurrentUser}
                                            Unfollow
                                        {:else}
                                            Follow
                                        {/if}
                                    </ButtonSmall>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        {:else if tab === ProfileTab.Following}
            <div
                class="flex flex-col flex-wrap-reverse md:flex-nowrap container max-w-2xl"
            >
                {#if !followedUsers.length}
                    <div class="py-4 px-2 text-gray w-full text-center">
                        {displayName || username} is not following anyone.
                    </div>
                {/if}
                <ul class="flex flex-col w-full">
                    {#each followedUsers as followedUser (followedUser.uuid)}
                        <li
                            class="flex w-full items-center pt-2 pb-3 px-4"
                            in:scale|local={{ duration: 100 }}
                            out:scale|local={{ duration: 100 }}
                        >
                            <div class="pr-3 sm:pr-4">
                                <a href={`/u/${followedUser.username}`}>
                                    <Avatar
                                        username={followedUser.username ||
                                            undefined}
                                        url={followedUser.avatarUrl ||
                                            undefined}
                                        uuid={followedUser.uuid || null}
                                        size={48}
                                    /></a
                                >
                            </div>
                            <div
                                class="flex flex-col flex-nowrap flex-1 text-gray-bitdark"
                            >
                                <div>
                                    <a
                                        href={`/u/${followedUser.username}`}
                                        class="text-gray-bitdark"
                                        >{followedUser.displayName ||
                                            followedUser.username}</a
                                    >
                                </div>
                                {#if followedUser.bio}<div class="bio">
                                        {followedUser.bio}
                                    </div>{/if}
                            </div>
                            {#if $currentUserUuid !== null && followedUser.uuid !== $currentUserUuid}
                                <div
                                    class="flex items-center justify-center text-gray-bitdark"
                                >
                                    <ButtonSmall
                                        tag="button"
                                        on:click={() =>
                                            handleFollow(followedUser)}
                                        variant={followedUser.followedByCurrentUser
                                            ? "OUTLINED"
                                            : "FILLED"}
                                        color={followedUser.followedByCurrentUser
                                            ? "SECONDARY"
                                            : "PRIMARY"}
                                        className="flex items-center"
                                    >
                                        {#if followedUser.followedByCurrentUser}
                                            Unfollow
                                        {:else}
                                            Follow
                                        {/if}
                                    </ButtonSmall>
                                </div>
                            {/if}
                        </li>
                    {/each}
                </ul>
            </div>
        {/if}
    {/if}
{/if}

<style>
    .tabs {
        @apply border-gray-light;
        @apply border-b-4;
        @apply flex;
        @apply flex-nowrap;
        @apply overflow-x-auto;

        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .tabs::-webkit-scrollbar {
        display: none;
    }

    .tabs > button {
        @apply text-primary;
        @apply font-bold;
        @apply relative;

        padding: 0.75rem 0.7rem 0.5rem;
        font-size: 0.95rem;

        @screen sm {
            @apply pt-3;
            @apply pb-2;
            @apply px-3;
            @apply text-base;
        }
    }

    .tabs > button[aria-selected="true"]::after {
        @apply bg-primary;
        @apply absolute;
        @apply left-0;
        @apply right-0;

        height: 4px;
        bottom: -2px;
        content: "";
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

    .bio {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>
