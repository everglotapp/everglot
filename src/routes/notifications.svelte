<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import { query } from "@urql/svelte"
    import { svelteTime } from "svelte-time"
    // import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import {
        currentUserInAppNotificationsStore,
        inAppNotifications,
    } from "../stores/notifications"
    import { InAppParamsTypeV1 } from "../server/notifications/params/v1"

    import Avatar from "../components/users/Avatar.svelte"
    import { PostGameType } from "../types/generated/graphql"

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

    function notificationLink({
        type,
        metadata,
    }: {
        type?: string | undefined | null
        metadata?: null | any
    }): string {
        if (
            (type as InAppParamsTypeV1) === InAppParamsTypeV1.UserFollowership
        ) {
            return metadata && metadata.user
                ? `/u/${metadata.user.username}`
                : ""
        } else if (
            [
                InAppParamsTypeV1.PostLike,
                InAppParamsTypeV1.PostCorrection,
            ].includes(type as InAppParamsTypeV1)
        ) {
            return metadata && metadata.post
                ? `/s/${metadata.post.snowflakeId}`
                : ""
        } else if (
            [
                InAppParamsTypeV1.PostReply,
                InAppParamsTypeV1.PostUserMention,
            ].includes(type as InAppParamsTypeV1)
        ) {
            return metadata && metadata.post && metadata.post.parentPost
                ? `/s/${metadata.post.parentPost.snowflakeId}`
                : ""
        }
        return ""
    }

    let links: Record<string, string>
    $: links = $inAppNotifications
        ? $inAppNotifications.reduce(
              (map, notification) =>
                  notification
                      ? {
                            ...map,
                            [notification.uuid]: notificationLink(notification),
                        }
                      : map,
              {}
          )
        : {}

    const POST_PREVIEW_LENGTH = 45
    function formatPostPreview(body: string): string {
        if (body.length <= POST_PREVIEW_LENGTH - 1) {
            return body
        } else {
            return body.substr(0, POST_PREVIEW_LENGTH - 1) + "…"
        }
    }
</script>

<div class="container max-w-2xl sm:py-8">
    {#if $inAppNotifications}
        {#each $inAppNotifications as notification (notification.uuid)}
            {#if notification.metadata && notification.metadata.user}
                <a href={links[notification.uuid] || ""} class="wrapper">
                    <div
                        class="flex flex-1 justify-start w-full overflow-hidden overflow-ellipsis px-4 pt-2 pb-3 flex-row items-center border-b"
                        in:scale={{ duration: 100 }}
                    >
                        <div class="avatar">
                            {#if notification.type === InAppParamsTypeV1.PostUserMention}
                                {#if notification.metadata.post && notification.metadata.post.author && notification.metadata.post.author.username && notification.metadata.post.author.avatarUrl}
                                    <Avatar
                                        username={notification.metadata.post
                                            .author.username}
                                        uuid={notification.metadata.post.author
                                            .uuid}
                                        url={notification.metadata.post.author
                                            .avatarUrl}
                                        size={56}
                                    />
                                {/if}
                            {:else if notification.metadata.user.username && notification.metadata.user.avatarUrl}
                                <Avatar
                                    username={notification.metadata.user
                                        .username}
                                    uuid={notification.metadata.user.uuid}
                                    url={notification.metadata.user.avatarUrl}
                                    size={56}
                                />
                            {/if}
                        </div>
                        <div class="main flex-col items-start">
                            <div class="description font-bold text-gray">
                                {#if notification.type === InAppParamsTypeV1.PostReply}
                                    {#if notification.metadata && notification.metadata.post && notification.metadata.post.parentPost}
                                        <span class="text-gray-bitdark"
                                            >{notification.metadata.user
                                                .displayName ||
                                                notification.metadata.user
                                                    .username}</span
                                        >
                                        replied to your squeek:
                                        <span class="text-gray-bitdark"
                                            >{formatPostPreview(
                                                notification.metadata.post
                                                    .parentPost.body
                                            )}</span
                                        >
                                    {/if}
                                {:else if notification.type === InAppParamsTypeV1.PostCorrection}
                                    {#if notification.metadata && notification.metadata.post}
                                        <span class="text-gray-bitdark"
                                            >{notification.metadata.user
                                                .displayName ||
                                                notification.metadata.user
                                                    .username}</span
                                        >
                                        suggested a correction for your squeek:
                                        <span class="text-gray-bitdark"
                                            >{formatPostPreview(
                                                notification.metadata.post.body
                                            )}</span
                                        >
                                    {/if}
                                {:else if notification.type === InAppParamsTypeV1.PostLike}
                                    {#if notification.metadata && notification.metadata.post}
                                        <span class="text-gray-bitdark"
                                            >{notification.metadata.user
                                                .displayName ||
                                                notification.metadata.user
                                                    .username}</span
                                        >
                                        likes your squeek:
                                        <span class="text-gray-bitdark"
                                            >{formatPostPreview(
                                                notification.metadata.post.body
                                            )}</span
                                        >
                                    {/if}
                                {:else if notification.type === InAppParamsTypeV1.PostUserMention}
                                    {#if notification.metadata && notification.metadata.post && notification.metadata.post.parentPost && notification.metadata.post.author}
                                        <span class="text-gray-bitdark"
                                            >{notification.metadata.post.author
                                                .displayName ||
                                                notification.metadata.post
                                                    .author.username}</span
                                        >
                                        tagged you under a squeek{#if notification.metadata.post.parentPost.games.nodes.length && notification.metadata.post.parentPost.games.nodes[0] && (!notification.metadata.post.parentPost.games.nodes[0].revealedByCurrentUser || notification.metadata.post.parentPost.games.nodes[0].gameType !== PostGameType.Cloze)}:
                                            <span class="text-gray-bitdark"
                                                >{formatPostPreview(
                                                    notification.metadata.post
                                                        .parentPost.body
                                                )}</span
                                            >{/if}
                                    {/if}
                                {:else if notification.type === InAppParamsTypeV1.UserFollowership}
                                    <span class="text-gray-bitdark"
                                        >{notification.metadata.user
                                            .displayName ||
                                            notification.metadata.user
                                                .username}</span
                                    > started following you
                                {/if}
                            </div>
                            <div class="time">
                                <time
                                    use:svelteTime={{
                                        timestamp: notification.createdAt,
                                        relative: true,
                                    }}
                                    title={notification.createdAt.toLocaleString()}
                                    class="text-gray text-sm"
                                />
                            </div>
                        </div>
                    </div>
                </a>
            {/if}
        {/each}
    {/if}
</div>

<style>
    .wrapper {
        @apply flex;
        @apply rounded-lg;
    }

    .wrapper:hover {
        @apply bg-primary-lightest;
    }

    .avatar {
        flex: 0 0 90px;
    }

    .main {
        @apply flex;
        @apply w-full;
    }

    .description {
        flex: 1 0 auto;
        max-width: 100%;
    }

    .time {
        @apply self-end;
    }
</style>
