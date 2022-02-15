<script lang="ts">
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"

    import Avatar from "../users/Avatar.svelte"
    import { PostGameType } from "../../types/generated/graphql"
    import type { Notification } from "../../types/generated/graphql"
    import { InAppParamsTypeV1 } from "../../server/notifications/params/v1"
    import type { CurrentUserInAppNotificationNode } from "../../stores/notifications"

    export let metadata: CurrentUserInAppNotificationNode["metadata"]
    export let type: NonNullable<Notification>["type"]
    export let createdAt: NonNullable<Notification>["createdAt"]

    const POST_PREVIEW_LENGTH = 45
    function formatPostPreview(body: string): string {
        if (body.length <= POST_PREVIEW_LENGTH - 1) {
            return body
        } else {
            return body.substr(0, POST_PREVIEW_LENGTH - 1) + "…"
        }
    }

    $: needsPost = [
        InAppParamsTypeV1.PostCorrection,
        InAppParamsTypeV1.PostLike,
        InAppParamsTypeV1.PostReply,
    ].includes(type as InAppParamsTypeV1)
    $: needsUser = [
        InAppParamsTypeV1.PostCorrection,
        InAppParamsTypeV1.PostLike,
        InAppParamsTypeV1.PostReply,
        InAppParamsTypeV1.PostUserMention,
        InAppParamsTypeV1.UserFollowership,
    ].includes(type as InAppParamsTypeV1)

    $: valid =
        metadata &&
        (needsPost ? metadata?.post : true) &&
        (needsUser ? metadata?.user : true)

    function getLink(): string {
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

    $: link = valid ? getLink() : null
</script>

{#if valid && metadata}
    <a href={link || ""} class="flex rounded-lg hover:bg-primary-lightest">
        <div
            class="flex flex-1 justify-start w-full overflow-hidden text-ellipsis px-4 pt-2 pb-3 flex-row items-center border-b"
            in:scale={{ duration: 100 }}
        >
            <div class="avatar">
                {#if type === InAppParamsTypeV1.PostUserMention}
                    {#if metadata.post && metadata.post.author && metadata.post.author.username}
                        <Avatar
                            username={metadata.post.author.username}
                            uuid={metadata.post.author.uuid}
                            url={metadata.post.author.avatarUrl}
                            size={56}
                        />
                    {/if}
                {:else if metadata.user?.username && metadata.user?.avatarUrl}
                    <Avatar
                        username={metadata.user.username}
                        uuid={metadata.user.uuid}
                        url={metadata.user.avatarUrl}
                        size={56}
                    />
                {/if}
            </div>
            <div class="main flex-col items-start">
                <div class="description font-bold text-gray">
                    {#if type === InAppParamsTypeV1.PostReply}
                        {#if metadata && metadata.post && metadata.post.parentPost}
                            <span class="text-gray-bitdark"
                                >{metadata.user?.displayName ||
                                    metadata.user?.username}</span
                            >
                            replied to your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(
                                    metadata.post.parentPost.body
                                )}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostCorrection}
                        {#if metadata && metadata.post}
                            <span class="text-gray-bitdark"
                                >{metadata.user?.displayName ||
                                    metadata.user?.username}</span
                            >
                            suggested a correction for your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(metadata.post.body)}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostLike}
                        {#if metadata && metadata.post}
                            <span class="text-gray-bitdark"
                                >{metadata.user?.displayName ||
                                    metadata.user?.username}</span
                            >
                            likes your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(metadata.post.body)}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostUserMention}
                        {#if metadata && metadata.post && metadata.post.parentPost && metadata.post.author}
                            <span class="text-gray-bitdark"
                                >{metadata.post.author.displayName ||
                                    metadata.post.author.username}</span
                            >
                            tagged you under a squeek{#if metadata.post.parentPost.games.nodes.length && metadata.post.parentPost.games.nodes[0] && (!metadata.post.parentPost.games.nodes[0].revealedByCurrentUser || metadata.post.parentPost.games.nodes[0].gameType !== PostGameType.Cloze)}:
                                <span class="text-gray-bitdark"
                                    >{formatPostPreview(
                                        metadata.post.parentPost.body
                                    )}</span
                                >{/if}
                        {/if}
                    {:else if type === InAppParamsTypeV1.UserFollowership}
                        <span class="text-gray-bitdark"
                            >{metadata.user?.displayName ||
                                metadata.user?.username}</span
                        > started following you
                    {/if}
                </div>
                <div class="time">
                    <time
                        use:svelteTime={{
                            timestamp: createdAt,
                            relative: true,
                        }}
                        title={createdAt.toLocaleString()}
                        class="text-gray text-sm"
                    />
                </div>
            </div>
        </div>
    </a>
{/if}

<style>
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
