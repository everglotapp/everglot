<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { query } from "@urql/svelte"
    import { svelteTime } from "svelte-time"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import {
        currentUserInAppNotificationsStore,
        inAppNotifications,
    } from "../stores/notifications"
    import { InAppParamsTypeV1 } from "../server/notifications/params/v1"

    import Avatar from "../components/users/Avatar.svelte"
    import ButtonSmall from "../components/util/ButtonSmall.svelte"
    import { toggleFollow } from "./_helpers/users"
    import type { Maybe } from "../types/generated/graphql"

    query(currentUserInAppNotificationsStore)
    onMount(() => {
        refreshNotifications()
    })

    function refreshNotifications() {
        currentUserInAppNotificationsStore.context = {
            ...currentUserInAppNotificationsStore.context,
            pause: true,
        }
        currentUserInAppNotificationsStore.context = {
            ...currentUserInAppNotificationsStore.context,
            pause: false,
        }
    }

    async function handleFollow(user: {
        uuid: string
        followedByCurrentUser: Maybe<boolean> | undefined
    }) {
        const res = await toggleFollow(user)
        refreshNotifications()
    }
</script>

<div class="container max-w-4xl sm:py-8">
    {#if $inAppNotifications}
        {#each $inAppNotifications as notification (notification.uuid)}
            <div
                class="px-4 pt-2 pb-3 flex flex-row flex-wrap justify-around items-center border-b"
                in:scale={{ duration: 100 }}
            >
                {#if notification.metadata && notification.metadata.user}
                    <a
                        href={`/u/${notification.metadata.user.username}`}
                        style="flex: 1;"
                        ><Avatar
                            username={notification.metadata.user.username}
                            uuid={notification.metadata.user.uuid}
                            url={notification.metadata.user.avatarUrl}
                            size={64}
                        /></a
                    >
                    <div style="min-width: 200px; flex: 2;">
                        <div class="flex flex-col font-bold items-start">
                            <a
                                href={`/u/${notification.metadata.user.username}`}
                                class="text-gray-bitdark mb-1"
                                >{notification.metadata.user.displayName ||
                                    notification.metadata.user.username}</a
                            >
                            <ButtonSmall
                                tag="button"
                                on:click={() =>
                                    notification.metadata &&
                                    notification.metadata.user &&
                                    handleFollow(notification.metadata.user)}
                                variant="OUTLINED"
                                color={notification.metadata.user
                                    .followedByCurrentUser
                                    ? "SECONDARY"
                                    : "PRIMARY"}
                                className="flex items-center"
                            >
                                {#if notification.metadata.user.followedByCurrentUser}
                                    <Localized id="user-unfollow" />
                                {:else}
                                    <Localized id="user-follow" />
                                {/if}
                            </ButtonSmall>
                        </div>
                    </div>
                {/if}
                <div
                    class="font-bold text-gray px-8"
                    style="min-width: 320px; flex: 4;"
                >
                    {#if notification.type === InAppParamsTypeV1.PostReply}
                        {#if notification.metadata && notification.metadata.post && notification.metadata.post.parentPost}
                            replied to your <a
                                href={`/s/${notification.metadata.post.parentPost.snowflakeId}`}
                                class="text-gray-bitdark">squeek</a
                            >{#if notification.metadata.post.parentPost.language}
                                {" "}in
                                <span class="text-gray-bitdark"
                                    ><Localized
                                        id={`locale-${notification.metadata.post.parentPost.language.alpha2}`}
                                    /></span
                                >{/if}
                        {/if}
                    {:else if notification.type === InAppParamsTypeV1.PostCorrection}
                        {#if notification.metadata && notification.metadata.post}
                            suggested a correction for your <a
                                href={`/s/${notification.metadata.post.snowflakeId}`}
                                class="text-gray-bitdark">squeek</a
                            >{#if notification.metadata.post.language}
                                {" "}in
                                <span class="text-gray-bitdark"
                                    ><Localized
                                        id={`locale-${notification.metadata.post.language.alpha2}`}
                                    /></span
                                >{/if}
                        {/if}
                    {:else if notification.type === InAppParamsTypeV1.PostLike}
                        {#if notification.metadata && notification.metadata.post}
                            likes your <a
                                href={`/s/${notification.metadata.post.snowflakeId}`}
                                class="text-gray-bitdark">squeek</a
                            >{#if notification.metadata.post.language}
                                {" "}in
                                <span class="text-gray-bitdark"
                                    ><Localized
                                        id={`locale-${notification.metadata.post.language.alpha2}`}
                                    /></span
                                >{/if}
                        {/if}
                    {:else if notification.type === InAppParamsTypeV1.PostUserMention}
                        {#if notification.metadata && notification.metadata.post && notification.metadata.post.parentPost}
                            tagged you in a comment under a <a
                                href={`/s/${notification.metadata.post.parentPost.snowflakeId}`}
                                class="text-gray-bitdark">squeek</a
                            >{#if notification.metadata.post.parentPost.language}
                                {" "}in
                                <span class="text-gray-bitdark"
                                    ><Localized
                                        id={`locale-${notification.metadata.post.parentPost.language.alpha2}`}
                                    /></span
                                >{/if}
                        {/if}
                    {:else if notification.type === InAppParamsTypeV1.UserFollowership}
                        started following you
                    {/if}
                </div>
                <div style="flex: 1; min-width: 146px;">
                    <time
                        use:svelteTime={{
                            timestamp: notification.createdAt,
                            format:
                                new Date(notification.createdAt).getDate() ===
                                new Date().getDate()
                                    ? "h:mm A"
                                    : new Date(
                                          notification.createdAt
                                      ).getFullYear() ===
                                      new Date().getFullYear()
                                    ? "D MMM h:mm A"
                                    : "D MMM YYYY h:mm A",
                        }}
                        title={notification.createdAt.toLocaleString()}
                        class="text-gray-bitdark"
                    />
                </div>
            </div>
        {/each}
    {/if}
</div>
