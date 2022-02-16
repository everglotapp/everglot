<script lang="ts">
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"

    import Avatar from "../users/Avatar.svelte"
    import { PostGameType } from "../../types/generated/graphql"
    import { InAppParamsTypeV1 } from "../../server/notifications/params/v1"
    import type { CurrentUserInAppNotificationNode } from "../../stores/notifications"

    export let metadata: CurrentUserInAppNotificationNode["metadata"]
    export let type: CurrentUserInAppNotificationNode["type"]
    export let createdAt: CurrentUserInAppNotificationNode["createdAt"]

    $: post = metadata?.post
    $: postAuthor = post?.author
    $: parentPost = post?.parentPost
    $: parentPostGame = parentPost?.games.nodes?.[0]
    $: user = metadata?.user

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
    $: needsParentPost = [
        InAppParamsTypeV1.PostReply,
        InAppParamsTypeV1.PostUserMention,
    ].includes(type as InAppParamsTypeV1)
    $: needsUser = [
        InAppParamsTypeV1.PostCorrection,
        InAppParamsTypeV1.PostLike,
        InAppParamsTypeV1.PostReply,
        InAppParamsTypeV1.PostUserMention,
        InAppParamsTypeV1.UserFollowership,
    ].includes(type as InAppParamsTypeV1)

    $: valid = Boolean(
        metadata &&
            (!needsPost || post) &&
            (!needsParentPost || parentPost) &&
            (!needsUser || user)
    )

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

{#if metadata && valid}
    <a href={link || ""} class="flex rounded-lg hover:bg-primary-lightest">
        <div
            class="flex flex-1 justify-start w-full overflow-hidden text-ellipsis px-4 pt-2 pb-3 flex-row items-center border-b"
            in:scale={{ duration: 100 }}
        >
            <div class="avatar">
                {#if type === InAppParamsTypeV1.PostUserMention}
                    {#if postAuthor && postAuthor.username}
                        <Avatar
                            username={postAuthor.username}
                            uuid={postAuthor.uuid}
                            url={postAuthor.avatarUrl}
                            size={56}
                        />
                    {/if}
                {:else if user && user.username && user.avatarUrl}
                    <Avatar
                        username={user.username}
                        uuid={user.uuid}
                        url={user.avatarUrl}
                        size={56}
                    />
                {/if}
            </div>
            <div class="main flex-col items-start">
                <div class="description font-bold text-gray">
                    {#if type === InAppParamsTypeV1.PostReply}
                        {#if parentPost && user}
                            <span class="text-gray-bitdark"
                                >{user.displayName || user.username}</span
                            >
                            replied to your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(parentPost.body)}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostCorrection}
                        {#if post && user}
                            <span class="text-gray-bitdark"
                                >{user.displayName || user.username}</span
                            >
                            suggested a correction for your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(post.body)}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostLike}
                        {#if post && user}
                            <span class="text-gray-bitdark"
                                >{user.displayName || user.username}</span
                            >
                            likes your squeek:
                            <span class="text-gray-bitdark"
                                >{formatPostPreview(post.body)}</span
                            >
                        {/if}
                    {:else if type === InAppParamsTypeV1.PostUserMention}
                        {#if parentPost && postAuthor}
                            <span class="text-gray-bitdark"
                                >{postAuthor.displayName ||
                                    postAuthor.username}</span
                            >
                            tagged you under a squeek{#if parentPostGame && parentPostGame && (!parentPostGame.revealedByCurrentUser || parentPostGame.gameType !== PostGameType.Cloze)}:
                                <span class="text-gray-bitdark"
                                    >{formatPostPreview(parentPost.body)}</span
                                >{/if}
                        {/if}
                    {:else if type === InAppParamsTypeV1.UserFollowership}
                        {#if user}
                            <span class="text-gray-bitdark"
                                >{user.displayName || user.username}</span
                            > started following you
                        {/if}
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
