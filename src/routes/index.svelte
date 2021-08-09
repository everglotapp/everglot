<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { scale } from "svelte/transition"
    import { goto } from "@sapper/app"
    import Time, { svelteTime } from "svelte-time"
    import {
        HeartIcon,
        MessageCircleIcon,
        MicIcon,
        XIcon,
        CheckIcon,
        SendIcon,
        PlayIcon,
        PauseIcon,
        TrashIcon,
    } from "svelte-feather-icons"
    import { userHasCompletedProfile } from "../stores"
    import { currentUserStore, currentUserUuid } from "../stores/currentUser"
    import { allPostsStore, allPosts } from "../stores/feed"

    import { query } from "@urql/svelte"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import Avatar from "../comp/users/Avatar.svelte"

    query(currentUserStore)
    query(allPostsStore)

    let redirectTimeout: number | null = null
    let updateRecordingDurationInterval: number | null = null
    let updateAudioTimingsInterval: number | null = null

    function clearRedirectTimeout(): void {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    }

    function clearUpdateRecordingDurationInterval(): void {
        if (updateRecordingDurationInterval) {
            clearInterval(updateRecordingDurationInterval)
            updateRecordingDurationInterval = null
        }
    }

    function clearUpdateAudioTimingsInterval(): void {
        if (updateAudioTimingsInterval) {
            clearInterval(updateAudioTimingsInterval)
            updateAudioTimingsInterval = null
        }
    }

    $: if ($userHasCompletedProfile) {
        clearRedirectTimeout()
    }

    onMount(() => {
        if ($currentUserStore.stale) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    if (!$userHasCompletedProfile) {
                        goto("/signup", { replaceState: true, noscroll: false })
                        clearRedirectTimeout()
                    }
                }, 800)
            }
        }
        setInterval(updateRecordingDuration, 250)
        setInterval(updateAudioTimings, 250)
    })

    onDestroy(() => {
        clearRedirectTimeout()
        clearUpdateRecordingDurationInterval()
        clearUpdateAudioTimingsInterval()
    })

    interface Post {
        body: string | undefined
        author: {
            username: string
            uuid: string
            avatarUrl: string
        }
        uuid: string
        createdAt: Date
        postLikes: {
            totalCount: number
            nodes: { user: { uuid: string } }[]
        }
        replies: {
            totalCount: number
            posts: Post[]
        }
    }

    $: posts = $allPosts
        ? $allPosts
              .map((post) => ({
                  ...post,
                  replies: {
                      totalCount: 0,
                      posts: [],
                  },
              }))
              .filter((post) => !post.parentPost)
        : []

    async function handleLike(post: Post) {
        const { uuid } = post

        const endpoint = doesUserLike(post)
            ? `/posts/${uuid}/unlike`
            : `/posts/${uuid}/like`
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
                return
            }
        }
    }

    let recording: boolean = false
    let recordingStarted: number | null = null
    let recordedChunks: BlobPart[] = []
    $: recordedBlob =
        !recordedChunks.length || typeof Blob === "undefined"
            ? null
            : new Blob(recordedChunks, {
                  type: "audio/ogg; codecs=opus",
              })
    let mediaRecorder: MediaRecorder | undefined
    let stopRecordingAfterReceivingData: boolean = false
    async function handleUserRecordStart(event: MouseEvent) {
        let stream

        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            })

            const options = { mimeType: "audio/ogg; codecs=opus" }
            mediaRecorder = new MediaRecorder(stream, options)

            mediaRecorder.ondataavailable = function handleRecordDataAvailable(
                event: MediaRecorderEventMap["dataavailable"]
            ) {
                if (
                    (recording || stopRecordingAfterReceivingData) &&
                    event.data.size > 0
                ) {
                    recordedChunks.push(event.data)
                    recordedChunks = recordedChunks
                }
                if (stopRecordingAfterReceivingData) {
                    recording = false
                    stopRecordingAfterReceivingData = false
                    mediaRecorder?.stop()
                }
            }
            mediaRecorder.onstart = () => {
                recording = true
                recordingStarted = Date.now()
            }
            mediaRecorder.onstop = () => {
                recording = false
                recordingStarted = null
            }

            mediaRecorder.start()
        } catch {}
        if (event.target) {
            ;(<HTMLButtonElement>event.target).blur()
        }
    }

    function handleUserRecordFinish() {
        stopRecordingAfterReceivingData = true
        mediaRecorder?.requestData()
    }

    function handleUserRecordCancel() {
        recording = false
        recordingStarted = null
        stopRecordingAfterReceivingData = false
        mediaRecorder?.stop()
        recordedChunks = []
    }

    let recordingDuration: number = 0
    function updateRecordingDuration() {
        recordingDuration = recordingStarted ? Date.now() - recordingStarted : 0
    }

    let audioUrl: string | null = null
    $: {
        recordedBlob // dependency
        if (recordedBlob) {
            audioUrl = URL.createObjectURL(recordedBlob)
        } else {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }
            audioUrl = null
        }
    }

    let audioElement: HTMLAudioElement | undefined
    function handlePlayRecording() {
        if (!audioElement) {
            return
        }
        audioElement.play()
    }
    function handlePauseRecording() {
        if (!audioElement) {
            return
        }
        audioElement.pause()
    }
    let audioCurrentTime: number | null = null
    let audioDuration: number | null = null
    let audioPaused: boolean = true
    function updateAudioTimings() {
        if (!audioElement) {
            audioCurrentTime = null
            audioDuration = null
            return
        }
        let { currentTime, duration } = audioElement
        audioCurrentTime = currentTime * 1000
        audioDuration =
            Number.isNaN(duration) || !Number.isFinite(duration)
                ? null
                : audioElement.duration * 1000
        audioPaused =
            audioElement.paused ||
            (audioElement.currentTime > 0 && audioElement.ended)
    }

    let showReplies: Record<string, boolean> = {}
    let newPostBody: string | undefined
    async function createPost(body: string, parentPostUuid: string | null) {
        return fetch("/posts/create", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                body: formatPostBodyForCreate(body),
                parentPostUuid,
            }),
        })
    }
    async function handlePost() {
        if (!newPostBody || !newPostBody.length) {
            return
        }

        const res = await createPost(newPostBody, null)
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                newPostBody = ""
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
    function formatPostBodyForCreate(body: string): string {
        const formatted = body
            .replace(/\<br\>/g, "")
            .replace(/\<br\/\>/g, "")
            .replace(/\<br \/\>/g, "")
            .replace(/\<div\>(.*?)\<\/div\>/g, function (_a, b) {
                return b + "\n"
            })
        console.log({ body, formatted })
        return formatted
    }
    async function handleReply(parentUuid: string) {
        const res = await createPost(newReplyBody[parentUuid], parentUuid)
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                // success
                newReplyBody[parentUuid] = ""
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

    function doesUserLike(post: Post) {
        return (
            post.postLikes &&
            post.postLikes.nodes &&
            post.postLikes.nodes.some(
                (node) =>
                    node && node.user && $currentUserUuid === node.user.uuid
            )
        )
    }

    let newReplyBody: Record<string, string> = {}
</script>

<div class="container max-w-3xl mb-2 pt-8 pb-4 px-2">
    <div class="flex items-end justify-center w-full flex-wrap sm:flex-nowrap">
        <div
            class="overflow-hidden overflow-ellipsis py-2 px-4 border border-gray rounded-lg"
            contenteditable
            aria-multiline
            role="textbox"
            style="width: 28rem; word-wrap: anywhere; overflow-wrap: anywhere; white-space: break-spaces;"
            placeholder="Tell us your story …"
            aria-placeholder="Tell us your story …"
            bind:innerHTML={newPostBody}
        />
        <div>
            <div class="flex items-center justify-end relative">
                <ButtonSmall
                    className={"ml-1 items-center" +
                        (recording ? " recording" : " mr-1")}
                    tag="button"
                    variant={recording ? "TEXT" : "OUTLINED"}
                    disabled={!recording && audioUrl !== null}
                    on:click={recording
                        ? handleUserRecordFinish
                        : handleUserRecordStart}
                    >{#if recording}<CheckIcon
                            size="18"
                            strokeWidth={3}
                        />{:else}<MicIcon
                            size="18"
                            class="mr-2"
                        />Record{/if}</ButtonSmall
                >
                {#if recording}
                    <ButtonSmall
                        className="items-center recording ml-0 mr-1"
                        tag="button"
                        variant="TEXT"
                        on:click={handleUserRecordCancel}
                        ><XIcon size="18" class="text-gray" /></ButtonSmall
                    >
                {/if}
                <ButtonSmall
                    className="items-center"
                    tag="button"
                    on:click={() => handlePost()}
                    ><SendIcon size="18" class="mr-2" />Post</ButtonSmall
                >
                {#if recording}
                    <div
                        class="absolute pt-1 px-3 flex text-sm text-gray-bitdark"
                        style="left: 0.125rem; top: 2.5rem;"
                    >
                        <MicIcon size="18" class="mr-1" />
                        <Time
                            timestamp={recordingDuration}
                            format="m:ss"
                            live={100}
                        />
                    </div>
                {:else if audioUrl}
                    <div
                        class="absolute pt-1 px-3 flex text-sm text-gray-bitdark"
                        style="left: 0.125rem; top: 2.5rem;"
                    >
                        {#if audioPaused}
                            <ButtonSmall
                                className="items-center recording ml-0 mr-1"
                                tag="button"
                                variant="TEXT"
                                on:click={handlePlayRecording}
                                ><PlayIcon size="18" /></ButtonSmall
                            >
                        {:else}
                            <ButtonSmall
                                className="items-center recording ml-0 mr-1"
                                tag="button"
                                variant="TEXT"
                                on:click={handlePauseRecording}
                                ><PauseIcon size="18" /></ButtonSmall
                            >
                        {/if}
                        <ButtonSmall
                            className="items-center recording ml-0 mr-1"
                            tag="button"
                            variant="TEXT"
                            on:click={handleUserRecordCancel}
                            ><TrashIcon
                                size="18"
                                class="text-danger"
                            /></ButtonSmall
                        >
                        <div class="flex items-center">
                            {#if audioCurrentTime !== null}
                                <Time
                                    timestamp={audioCurrentTime}
                                    format="m:ss"
                                    live={100}
                                />
                            {/if}
                            {#if audioDuration !== null}
                                &nbsp;/&nbsp;
                                <Time
                                    timestamp={audioDuration}
                                    format="m:ss"
                                    live={100}
                                />
                            {/if}
                        </div>
                    </div>
                    <audio
                        src={audioUrl}
                        bind:this={audioElement}
                        class="mb-2 ml-1 rounded-lg"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>
<div class="container max-w-2xl p-2 gap-y-1">
    {#each posts as post (post.uuid)}
        <div
            class="feed-item py-3 sm:py-4 sm:px-3 gap-y-1"
            class:liked={post && doesUserLike(post)}
            class:not-liked={!post || !doesUserLike(post)}
            in:scale={{ duration: 200 }}
        >
            <div class="flex flex-row">
                <div class="pr-4">
                    <Avatar
                        username={post.author.username}
                        url={post.author.avatarUrl}
                    />
                </div>
                <div class="w-full">
                    <div class="mb-1 flex items-center justify-between">
                        <span class="text-gray-bitdark font-bold"
                            >{post.author.username}</span
                        >
                        <time
                            use:svelteTime={{
                                timestamp: post.createdAt,
                                format:
                                    new Date(post.createdAt).getDate() ===
                                    new Date().getDate()
                                        ? "h:mm A"
                                        : new Date(
                                              post.createdAt
                                          ).getFullYear() ===
                                          new Date().getFullYear()
                                        ? "D MMM h:mm A"
                                        : "D MMM YYYY h:mm A",
                            }}
                            title={post.createdAt.toLocaleString()}
                            class="text-sm text-gray-bitdark"
                        />
                    </div>
                    <div>
                        {#each (post.body || "").split("\n") as bodyPart}
                            {bodyPart}<br />
                        {/each}
                    </div>
                </div>
            </div>
            <div class="flex flex-row pt-1 justify-end items-center">
                <div class="flex relative mr-1">
                    {#if showReplies[post.uuid]}
                        <div
                            contenteditable
                            bind:textContent={newReplyBody[post.uuid]}
                            placeholder="Reply"
                            class="border border-gray-bitlight rounded-lg py-1 pl-2 pr-13"
                            style="min-width: min(48vw, 417px);"
                        />
                        <div
                            class="absolute right-0 top-0 bottom-0 flex items-center"
                        >
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                className="reply-send-button"
                                on:click={() => handleReply(post.uuid)}
                                ><SendIcon size="16" /></ButtonSmall
                            >
                        </div>
                    {/if}
                </div>
                <ButtonSmall
                    className="reply-button items-center justify-center recording ml-0 mr-1"
                    tag="button"
                    variant={showReplies[post.uuid] ? "TEXT" : "OUTLINED"}
                    color={showReplies[post.uuid] ? "SECONDARY" : "PRIMARY"}
                    on:click={() =>
                        (showReplies[post.uuid] =
                            typeof showReplies[post.uuid] === "undefined"
                                ? true
                                : !showReplies[post.uuid])}
                    >{#if showReplies[post.uuid]}
                        <XIcon size="16" /><span>Close</span>
                    {:else}<MessageCircleIcon
                            size="16"
                        /><!--<span
                        class="ml-1 font-bold text-sm text-gray-bitdark select-none"
                        >Reply&nbsp;</span
                    >--><span
                            class="text-sm text-gray-bitdark font-bold select-none rounded-lg"
                            >{post.postsByParentPostId?.totalCount || 0}</span
                        >{/if}</ButtonSmall
                >
                <ButtonSmall
                    className="like-button flex items-center justify-center cursor-pointer rounded-lg bg-gray-lightest"
                    on:click={() => handleLike(post)}
                    tag="button"
                    variant="TEXT"
                >
                    <HeartIcon size="18" />
                    <span
                        class="text-sm font-bold text-gray-bitdark select-none"
                        >{post.postLikes ? post.postLikes.totalCount : 0}</span
                    >
                </ButtonSmall>
            </div>
            {#if showReplies[post.uuid]}
                {#each post.postsByParentPostId?.nodes as reply (reply.uuid)}
                    <div
                        class="flex flex-row ml-8 pl-4 pt-4 border-l-2 border-gray-verylight"
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
            {/if}
        </div>
    {/each}
</div>

<style>
    [placeholder]:empty::before {
        content: attr(placeholder);

        @apply text-gray;
    }

    [placeholder]:empty:focus::before {
        content: "";
    }

    .feed-item:not(:last-child) {
        @apply border-b;
        @apply border-gray-200;
    }

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

    :global(.recording) {
        @apply px-2 !important;
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
