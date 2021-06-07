<script lang="ts">
    import { scale } from "svelte/transition"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"

    import { query, operationStore } from "@urql/svelte"
    import { UserProfile, UserType } from "../types/generated/graphql"
    import type { UserProfileQuery } from "../types/generated/graphql"
    import { Gender } from "../users"
    import Avatar from "../comp/users/Avatar.svelte"
    import { groupUuid, currentUserStore } from "../stores"

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

    let errorId: string | null = null

    let newAvatarUrl: string | null = null
    let avatarForm: HTMLFormElement
    async function handleUploadAvatar(e: Event) {
        e.preventDefault()
        errorId = null
        newAvatarUrl = null
        const formData = new FormData(avatarForm)
        await fetch("/profile/picture", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.success) {
                    newAvatarUrl = result.meta.avatarUrl
                    $userProfileStore.context = {
                        requestPolicy: "cache-and-network",
                        pause: true,
                    }
                    $userProfileStore.context = {
                        requestPolicy: "cache-and-network",
                        pause: false,
                    }
                    $currentUserStore.context = {
                        requestPolicy: "cache-and-network",
                        pause: true,
                    }
                    $currentUserStore.context = {
                        requestPolicy: "cache-and-network",
                        pause: false,
                    }
                } else {
                    errorId = "profile-avatar-upload-failed"
                }
            })
            .catch(() => {
                errorId = "profile-avatar-upload-failed"
            })
    }

    $: email = userProfile?.email
    $: username = userProfile?.username
    $: gender = userProfile?.gender
    $: avatarUrl = userProfile?.avatarUrl
</script>

<svelte:head />

<Localized id="profile-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container gap-x-4 py-16 px-2 w-full max-w-sm md:max-w-xl">
    {#if $userProfileStore.error}
        <ErrorMessage>
            <Localized id="profile-error" />
        </ErrorMessage>
    {:else}
        <PageTitle><Localized id="profile-title" /></PageTitle>
        {#if errorId}
            <ErrorMessage>
                <Localized id={errorId} />
            </ErrorMessage>
        {/if}
        <div class="flex flex-row flex-wrap-reverse">
            <div class="w-full md:w-1/2">
                <h4><Localized id="profile-email" /></h4>
                <div class="mb-4">{email || ""}</div>
                <div class="hidden">
                    <a href="/changepassword">
                        <Localized id="profile-change-password" />
                    </a>
                </div>
                <h4><Localized id="profile-username" /></h4>
                <div>{username || ""}</div>
                <h4><Localized id="profile-gender" /></h4>
                <div>
                    {#if gender == Gender.MALE}
                        <Localized id="profile-gender-male" />
                    {:else if gender == Gender.FEMALE}
                        <Localized id="profile-gender-female" />
                    {:else if gender == Gender.OTHER}
                        <Localized id="profile-gender-other" />
                    {:else}
                        <Localized id="profile-gender-unknown" />
                    {/if}
                </div>
            </div>
            <div class="w-full md:w-1/2">
                {#key newAvatarUrl}
                    <div
                        in:scale|local={{ delay: 400, duration: 100 }}
                        class="mx-auto mb-4"
                        style="border-radius: 50%; width: 96px; height: 96px;"
                    >
                        <Avatar
                            username={username || ""}
                            url={$userProfileStore.fetching && newAvatarUrl
                                ? newAvatarUrl
                                : avatarUrl || ""}
                            size={96}
                        />
                    </div>
                {/key}

                <form
                    action="/profile/picture"
                    enctype="multipart/form-data"
                    method="post"
                    bind:this={avatarForm}
                    on:submit={handleUploadAvatar}
                >
                    <div>
                        <input
                            type="file"
                            name="avatar"
                            accept="image/png,image/jpeg"
                            required
                            class="mb-2"
                        />
                        <ButtonLarge
                            tag="button"
                            type="submit"
                            variant="TEXT"
                            className="w-full justify-center mb-2"
                            >Upload Avatar</ButtonLarge
                        >
                        <p class="text-gray-bitdark text-sm">
                            Avatars must be smaller than 5 MB in size.
                        </p>
                    </div>
                </form>
            </div>
        </div>
        <div class="container">
            <h4><Localized id="profile-languages" /></h4>
            <ul>
                {#each userLanguages as language}
                    <li>
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

            <h4><Localized id="profile-groups" /></h4>
            <ul>
                {#each groupUsers as group}
                    {#if group.group}
                        <li>
                            <ButtonSmall
                                href={`/chat?group=${group.group.uuid}`}
                                on:click={() => {
                                    if (group.group) {
                                        $groupUuid = group.group.uuid
                                    }
                                }}
                                variant="TEXT"
                                color="SECONDARY"
                            >
                                {group.group.groupName}
                                {#if group.userType === UserType.Global}
                                    ({group.group.language
                                        ? group.group.language.englishName
                                        : ""})
                                {:else}
                                    ({group.group.language
                                        ? group.group.language.englishName
                                        : ""}
                                    {group.group.languageSkillLevel
                                        ? group.group.languageSkillLevel.name
                                        : ""})
                                {/if}
                            </ButtonSmall>
                        </li>
                    {/if}
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
</style>
