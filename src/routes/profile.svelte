<script lang="ts">
    import { scale } from "svelte/transition"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"

    import { query, operationStore } from "@urql/svelte"
    import type { UserProfileQuery } from "../types/generated/graphql"
    import { UserProfile } from "../types/generated/graphql"
    import { Gender } from "../users"
    import Avatar from "../comp/users/Avatar.svelte"

    const userProfileStore = operationStore<UserProfileQuery>(UserProfile)
    query(userProfileStore)

    $: userProfile =
        $userProfileStore.data && !$userProfileStore.error
            ? $userProfileStore.data.currentUser
            : null
    $: userLanguages =
        userProfile?.userLanguages?.nodes
            .filter(Boolean)
            .map((node) => node!) || []
    $: groupUsers =
        userProfile?.groupUsers?.nodes.filter(Boolean).map((node) => node!) ||
        []
</script>

<svelte:head>
    <title>My Profile – Everglot</title>
</svelte:head>

<div
    class="container flex gap-x-4 flex-wrap justify-center md:justify-start py-16 w-full max-w-sm md:max-w-4xl"
>
    {#if $userProfileStore.fetching}
        <div>loading</div>
    {:else if $userProfileStore.error}
        <div>error</div>
    {:else}
        <div><h2>My Profile</h2></div>
        <div class="container flex flex-row flex-wrap">
            <div class="md:w-1/2">
                <h4>Email:</h4>
                <div class="mb-4">{userProfile?.email}</div>
                <div><a href="/changepassword">Change my password</a></div>
                <h4>Username:</h4>
                <div>{userProfile?.username}</div>
                <h4>Gender:</h4>
                <div>
                    {#if userProfile?.gender == Gender.MALE}
                        Male
                    {:else if userProfile?.gender == Gender.FEMALE}
                        Female
                    {:else if userProfile?.gender == Gender.OTHER}
                        Other
                    {:else}
                        Unknown
                    {/if}
                </div>
            </div>
            <div class="md:w-1/2">
                <div style="border-radius: 50%; width: 96px; height: 96px;">
                    <Avatar
                        username={userProfile?.username || ""}
                        url={userProfile?.avatarUrl || ""}
                        size={96}
                    />
                </div>
            </div>
        </div>
        <div>
            <h4>My Languages:</h4>
            {#each userLanguages as language}
                <div>
                    {language.language?.englishName}
                    {#if language?.native}
                        (Native)
                    {:else}
                        ({language?.languageSkillLevel?.name})
                    {/if}
                </div>
            {/each}

            <h4>My Groups:</h4>
            {#each groupUsers as group}
                <div>
                    {group.group?.groupName}
                    ({group.group?.language?.englishName}
                    {group.group?.languageSkillLevel?.name})
                    {group.userType}
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    h4 {
        margin-top: 1rem;
        margin-bottom: 0.25rem;
    }

    .sidebar {
        min-width: 16rem;

        @apply py-8;
        @apply flex-shrink;
    }

    .languages button {
        border-left-width: 3px;

        @apply border-transparent;
        @apply flex;
        @apply w-full;
        @apply py-2;
        @apply px-3;
        @apply items-center;
    }

    .languages button:hover {
        @apply bg-primary-lightest;
    }

    .languages button[aria-selected="true"] {
        @apply text-primary;
        @apply border-primary;
    }

    .groups {
        @apply flex-grow;
    }

    .groups .name {
        @apply mr-3;
        @apply align-middle;
    }

    .groups .members-count {
        @apply text-sm;
        @apply align-middle;
    }
</style>
