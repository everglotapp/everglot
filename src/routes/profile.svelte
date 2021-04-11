<script lang="ts">
    import { scale } from "svelte/transition"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { query, operationStore } from "@urql/svelte"
    import { UserProfile, UserType } from "../types/generated/graphql"
    import type { UserProfileQuery } from "../types/generated/graphql"
    import { Gender } from "../users"
    import Avatar from "../comp/users/Avatar.svelte"
    import { groupUuid } from "../stores"

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

<div class="container gap-x-4 py-16 px-2 w-full max-w-sm md:max-w-md">
    {#if $userProfileStore.fetching}
        <div />
    {:else if $userProfileStore.error}
        <ErrorMessage>Failed to load your profile</ErrorMessage>
    {:else}
        <PageTitle>My Profile</PageTitle>
        <div class="flex flex-row flex-wrap-reverse">
            <div class="w-full md:w-2/3">
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
            <div class="w-full md:w-1/3">
                <div
                    in:scale|local={{ delay: 400, duration: 100 }}
                    class="mx-auto"
                    style="border-radius: 50%; width: 96px; height: 96px;"
                >
                    <Avatar
                        username={userProfile?.username || ""}
                        url={userProfile?.avatarUrl || ""}
                        size={96}
                    />
                </div>
            </div>
        </div>
        <div class="container">
            <h4>My Languages:</h4>
            <ul>
                {#each userLanguages as language}
                    <li>
                        {language.language?.englishName}
                        {#if language?.native}
                            (Native)
                        {:else}
                            ({language?.languageSkillLevel?.name})
                        {/if}
                    </li>
                {/each}
            </ul>

            <h4>My Groups:</h4>
            <ul>
                {#each groupUsers as group}
                    <li>
                        <ButtonSmall
                            href={`/chat?group=${group.group?.uuid}`}
                            on:click={() => ($groupUuid = group.group?.uuid)}
                            variant="TEXT"
                            color="SECONDARY"
                        >
                            {group.group?.groupName}
                            {#if group.userType === UserType.Global}
                                ({group.group?.language?.englishName})
                            {:else}
                                ({group.group?.language?.englishName}
                                {group.group?.languageSkillLevel?.name})
                            {/if}
                        </ButtonSmall>
                    </li>
                {/each}
            </ul>
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
