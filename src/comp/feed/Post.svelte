<script lang="ts">
    import { scale } from "svelte/transition"
    import { svelteTime } from "svelte-time"
    import {
        HeartIcon,
        MessageCircleIcon,
        XIcon,
        SendIcon,
    } from "svelte-feather-icons"
    import { query } from "@urql/svelte"

    import Avatar from "../users/Avatar.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"

    import { currentUserStore, currentUserUuid } from "../../stores/currentUser"

    import type { AllPostsQuery } from "../../types/generated/graphql"
    import { createPost } from "../../routes/_helpers/posts"
    import { allPostsStore } from "../../stores/feed"
    import { USER_UPLOADED_RECORDINGS_BASE_PATH } from "../../constants"

    query(currentUserStore)

    type PostNode = NonNullable<NonNullable<AllPostsQuery["posts"]>["nodes"][0]>

    export let uuid: string
    export let body: string
    export let createdAt: Date
    export let author: NonNullable<PostNode["author"]>
    export let likes: PostNode["likes"]
    export let replies: PostNode["replies"]
    export let recordings: PostNode["recordings"]

    $: replyNodes = replies.nodes.filter(Boolean).map((reply) => reply!)

    $: liked =
        likes &&
        likes.nodes &&
        likes.nodes.some(
            (node) => node && node.user && $currentUserUuid === node.user.uuid
        )

    async function handleReply() {
        if (!newReplyBody) {
            return
        }
        const res = await createPost(newReplyBody, uuid)
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                // success
                newReplyBody = ""
                $allPostsStore.context = {
                    ...$allPostsStore.context,
                    paused: true,
                }
                $allPostsStore.context = {
                    ...$allPostsStore.context,
                    paused: false,
                }
            }
        }
    }
    let showReplies: boolean = false
    let newReplyBody: string | undefined

    async function handleLike() {
        if (tmpLiked || tmpUnliked) {
            return
        }
        const endpoint = liked ? `/posts/${uuid}/unlike` : `/posts/${uuid}/like`
        if (liked) {
            tmpUnliked = true
        } else {
            tmpLiked = true
        }
        const res = await fetch(endpoint, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                // success
                $allPostsStore.context = {
                    ...$allPostsStore.context,
                    paused: true,
                }
                $allPostsStore.context = {
                    ...$allPostsStore.context,
                    paused: false,
                }
                setTimeout(() => {
                    tmpLiked = false
                    tmpUnliked = false
                }, 250)
                return
            }
        }
        tmpLiked = false
        tmpUnliked = false
    }
    let tmpLiked = false
    let tmpUnliked = false
</script>

<div
    class="feed-item py-3 sm:py-4 sm:px-3 gap-y-1"
    class:liked={liked || tmpLiked}
    class:not-liked={!liked || tmpUnliked}
    in:scale={{ duration: 200 }}
>
    <div class="flex flex-row">
        <div class="pr-4">
            <Avatar username={author.username} url={author.avatarUrl} />
        </div>
        <div class="w-full">
            <div class="mb-1 flex items-center justify-between">
                <span class="text-gray-bitdark font-bold"
                    >{author.username}</span
                >
                <time
                    use:svelteTime={{
                        timestamp: createdAt,
                        format:
                            new Date(createdAt).getDate() ===
                            new Date().getDate()
                                ? "h:mm A"
                                : new Date(createdAt).getFullYear() ===
                                  new Date().getFullYear()
                                ? "D MMM h:mm A"
                                : "D MMM YYYY h:mm A",
                    }}
                    title={createdAt.toLocaleString()}
                    class="text-sm text-gray-bitdark"
                />
            </div>
            <div>
                {#each (body || "").split("\n") as bodyPart}
                    {bodyPart}<br />
                {/each}
            </div>
            {#if recordings.totalCount && recordings.nodes[0]}
                <div>
                    <audio
                        src={`${USER_UPLOADED_RECORDINGS_BASE_PATH}/${
                            recordings.nodes[0].filename
                        }${
                            recordings.nodes[0].extension
                                ? "." + recordings.nodes[0].extension
                                : ""
                        }`}
                        controls
                    />
                </div>
            {/if}
        </div>
    </div>
    <div class="flex flex-row pt-1 justify-end items-center">
        <div class="flex relative mr-1">
            {#if showReplies}
                <div
                    contenteditable
                    bind:textContent={newReplyBody}
                    placeholder="Reply"
                    class="border border-gray-bitlight rounded-lg py-1 pl-2 pr-13 origin-right"
                    style="min-width: min(48vw, 417px);"
                    in:scale={{ duration: 150 }}
                    out:scale={{ duration: 150 }}
                />
                <div
                    class="absolute right-0 top-0 bottom-0 flex items-center origin-right"
                    in:scale={{ duration: 150 }}
                    out:scale={{ duration: 150 }}
                >
                    <ButtonSmall
                        tag="button"
                        variant="TEXT"
                        className="reply-send-button"
                        on:click={() => handleReply()}
                        ><SendIcon size="16" /></ButtonSmall
                    >
                </div>
            {/if}
        </div>
        <ButtonSmall
            className="reply-button items-center justify-center recording ml-0 mr-1"
            tag="button"
            variant={showReplies ? "TEXT" : "OUTLINED"}
            color={showReplies ? "SECONDARY" : "PRIMARY"}
            on:click={() => (showReplies = !showReplies)}
            >{#if showReplies}
                <XIcon size="16" /><span>Close</span>
            {:else}<MessageCircleIcon size="16" /><span
                    class="text-sm text-gray-bitdark font-bold select-none rounded-lg"
                    >{replies?.totalCount || 0} replies</span
                >{/if}</ButtonSmall
        >
        <ButtonSmall
            className="like-button flex items-center justify-center cursor-pointer rounded-lg bg-gray-lightest"
            on:click={() => handleLike()}
            tag="button"
            variant="TEXT"
        >
            <HeartIcon size="18" />
            <span class="text-sm font-bold text-gray-bitdark select-none"
                >{likes ? likes.totalCount : 0}</span
            >
        </ButtonSmall>
    </div>
    {#if showReplies}
        <div
            class="origin-top-right"
            class:pb-4={replies?.totalCount && replies?.totalCount > 0}
            in:scale={{ duration: 150 }}
            out:scale={{ duration: 150 }}
        >
            {#each replyNodes as reply (reply.uuid)}
                <div
                    class="flex flex-row ml-8 pl-4 pt-4 border-l-2 border-gray-verylight"
                    in:scale|local={{ duration: 200 }}
                >
                    <div class="pr-4">
                        <Avatar
                            username={reply.author.username}
                            url={reply.author.avatarUrl}
                            size={36}
                        />
                    </div>
                    <div class="w-full">
                        <div class="mb-1 flex items-center justify-between">
                            <span class="text-gray-bitdark font-bold"
                                >{reply.author.username}</span
                            >
                            <time
                                use:svelteTime={{
                                    timestamp: reply.createdAt,
                                    format: "DD-MM-YYYY h:mm A",
                                }}
                                title={reply.createdAt.toLocaleString()}
                                class="text-sm text-gray-bitdark"
                            />
                        </div>
                        <div>{reply.body}</div>
                    </div>
                </div>
            {/each}
        </div>
    {/if}
</div>

<style>
    :global(.reply-button) {
        min-width: 50px;
    }

    :global(.reply-button svg) {
        @apply text-gray-bitdark;
        @apply mr-2;
    }

    .liked :global(.like-button) {
        @apply bg-primary-lightest;
    }

    :global(.like-button) {
        @apply px-2 !important;

        min-width: 54px;
    }

    :global(.like-button svg) {
        @apply mr-2;
    }

    .liked :global(.like-button svg) {
        animation: like-animation 200ms cubic-bezier(0.455, 0.03, 0.515, 0.955);
        fill: theme("colors.red.600");

        @apply text-red-500;
    }

    .not-liked :global(.like-button svg) {
        @apply text-gray;
    }

    :global(.reply-send-button) {
        @apply rounded-tl-none !important;
        @apply rounded-bl-none !important;
    }

    :global(.reply-send-button:focus) {
        @apply border-transparent !important;
        @apply bg-transparent !important;
    }

    @keyframes like-animation {
        0% {
            transform: scale(1);
            fill: theme("colors.red.100");
            stroke: theme("colors.red.100");
        }

        50% {
            transform: scale(1.15);
            fill: theme("colors.red.600");
            stroke: theme("colors.red.600");
        }

        100% {
            transform: scale(1);
            fill: theme("colors.red.600");
            stroke: theme("colors.red.600");
        }
    }
</style>
