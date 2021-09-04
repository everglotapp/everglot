<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { stores } from "@sapper/app"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import BrowserTitle from "../../comp/layout/BrowserTitle.svelte"
    import ButtonSmall from "../../comp/util/ButtonSmall.svelte"
    import ButtonLarge from "../../comp/util/ButtonLarge.svelte"
    import ErrorMessage from "../../comp/util/ErrorMessage.svelte"
    import PageTitle from "../../comp/typography/PageTitle.svelte"

    import { query, operationStore } from "@urql/svelte"
    import { UserProfile, UserType } from "../../types/generated/graphql"
    import type { UserProfileQuery } from "../../types/generated/graphql"
    import { Gender } from "../../users"
    import Avatar from "../../comp/users/Avatar.svelte"
    import { currentUserStore } from "../../stores/currentUser"
    import {
        ANDROID_WEBVIEW_USER_AGENT,
        USER_UPLOAD_AVATAR_FILE_FORM_FIELD,
    } from "../../constants"

    const { page } = stores()

    const userProfileStore = operationStore<UserProfileQuery>(UserProfile)
    userProfileStore.variables = {
        username: $page.params.username,
    }
    query(userProfileStore)

    $: userProfile =
        $userProfileStore.data && !$userProfileStore.error
            ? $userProfileStore.data.userByUsername
            : null
    $: userLanguages =
        userProfile?.userLanguages?.nodes
            .filter(Boolean)
            .map((node) => node!) || []

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

    $: username = userProfile?.username
    $: displayName = userProfile?.displayName
    $: gender = userProfile?.gender
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
</script>

<svelte:head />

<Localized id="u-username-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<div class="flex">
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
                size={128}
            />
        </div>
    {/key}
    <div>
        {displayName || ""} ({username || ""})
    </div>
</div>
