<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../components/layout/BrowserTitle.svelte"
    import ButtonSmall from "../components/util/ButtonSmall.svelte"
    import ButtonLarge from "../components/util/ButtonLarge.svelte"
    import ErrorMessage from "../components/util/ErrorMessage.svelte"
    import PageTitle from "../components/typography/PageTitle.svelte"

    import { query, operationStore } from "@urql/svelte"
    import { CurrentUserProfile, UserType } from "../types/generated/graphql"
    import type { CurrentUserProfileQuery } from "../types/generated/graphql"
    import { Gender } from "../users"
    import Avatar from "../components/users/Avatar.svelte"
    import { currentUserStore } from "../stores/currentUser"
    import {
        ANDROID_WEBVIEW_USER_AGENT,
        USER_UPLOAD_AVATAR_FILE_FORM_FIELD,
    } from "../constants"

    const currentUserProfileStore =
        operationStore<CurrentUserProfileQuery>(CurrentUserProfile)
    query(currentUserProfileStore)

    $: userProfile =
        $currentUserProfileStore.data && !$currentUserProfileStore.error
            ? $currentUserProfileStore.data.currentUser
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
        try {
            const response = await fetch("/profile/picture", {
                method: "POST",
                body: formData,
            })
            const res = await response.json()
            if (res && res.success) {
                newAvatarUrl = res.meta.avatarUrl
                $currentUserProfileStore.context = {
                    requestPolicy: "cache-and-network",
                    pause: true,
                }
                $currentUserProfileStore.context = {
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
        } catch (e) {
            errorId = "profile-avatar-upload-failed"
        }
    }

    $: email = userProfile?.email
    $: unconfirmedEmail = userProfile?.unconfirmedEmail
    $: username = userProfile?.username
    $: displayName = userProfile?.displayName
    $: gender = userProfile?.gender
    $: avatarUrl = userProfile?.avatarUrl
    $: uuid = userProfile?.uuid

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
</script>

<svelte:head />

<Localized id="profile-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="container gap-x-4 py-16 px-2 w-full max-w-sm md:max-w-xl">
    {#if $currentUserProfileStore.error}
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
                <div class="mb-4 flex flex-col gap-y-2">
                    {#if email}
                        <span>{email}</span>
                    {/if}
                    {#if unconfirmedEmail}
                        <span class="text-gray flex items-center"
                            ><svg
                                class="mr-2 fill-gray"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24px"
                                viewBox="0 0 24 24"
                                width="24px"
                                fill="#000000"
                                ><path d="M0 0h24v24H0V0z" fill="none" /><path
                                    d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z"
                                /></svg
                            >{unconfirmedEmail}</span
                        >
                    {/if}
                </div>
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
                            url={$currentUserProfileStore.fetching &&
                            newAvatarUrl
                                ? newAvatarUrl
                                : avatarUrl || ""}
                            {uuid}
                            size={96}
                        />
                    </div>
                {/key}
                {#if !hideUploadAvatarForm}
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
                                name={USER_UPLOAD_AVATAR_FILE_FORM_FIELD}
                                accept="image/png,image/jpeg"
                                required
                                class="mb-2 max-w-full"
                            />
                            <ButtonLarge
                                tag="button"
                                type="submit"
                                variant="TEXT"
                                className="w-full justify-center mb-2"
                                ><Localized id="Upload Avatar" /></ButtonLarge
                            >
                            <p class="text-gray-bitdark text-sm">
                                <Localized
                                    id="profile-avatar-max-size"
                                    args={{ maxSize: "5 MB" }}
                                />
                            </p>
                        </div>
                    </form>
                {/if}
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
            <ul class="max-w-sm">
                {#each groupUsers as group}
                    {#if group.group}
                        <li>
                            <ButtonSmall
                                href={`/chat?group=${group.group.uuid}`}
                                variant="TEXT"
                                color="SECONDARY"
                                className="w-full flex justify-between"
                            >
                                <span
                                    class="font-sans overflow-hidden text-ellipsis pr-8"
                                >
                                    {group.group.groupName}</span
                                >
                                <span class="font-sans font-normal">
                                    {#if group.userType === UserType.Global}
                                        ({group.group.language
                                            ? group.group.language.englishName
                                            : ""})
                                    {:else}
                                        ({group.group.language
                                            ? group.group.language.englishName
                                            : ""}
                                        {group.group.languageSkillLevel
                                            ? group.group.languageSkillLevel
                                                  .name
                                            : ""})
                                    {/if}</span
                                >
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
