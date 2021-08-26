<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"
    import Time from "svelte-time"
    import {
        MicIcon,
        XIcon,
        CheckIcon,
        SendIcon,
        PlayIcon,
        PauseIcon,
        TrashIcon,
    } from "svelte-feather-icons"
    import { query } from "@urql/svelte"

    import { userHasCompletedProfile } from "../stores"
    import { allPostsStore, allPosts } from "../stores/feed"
    import { currentUserStore } from "../stores/currentUser"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import Post from "../comp/feed/Post.svelte"
    import { createPost, createPostRecording } from "./_helpers/posts"
    import { getSupportedMimeTypes } from "./_helpers/posts/recording"

    query(allPostsStore)
    query(currentUserStore)

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

    let preferredMimeType: string | null = null
    onMount(() => {
        const supportedMimeTypes = getSupportedMimeTypes("audio")
        if (supportedMimeTypes.length) {
            preferredMimeType = supportedMimeTypes[0]
        }

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

    $: posts = $allPosts
        ? $allPosts
              .filter((post) => post && !post.parentPost)
              .map((post) => post!)
        : []

    let recording: boolean = false
    let recordingStarted: number | null = null

    let recordedChunks: BlobPart[] = []
    $: recordedBlob =
        !recordedChunks.length ||
        typeof Blob === "undefined" ||
        !preferredMimeType
            ? null
            : new Blob(recordedChunks, {
                  type: preferredMimeType,
              })
    let mediaRecorder: MediaRecorder | undefined
    let stopRecordingAfterReceivingData: boolean = false
    async function handleUserRecordStart(event: MouseEvent) {
        let stream

        try {
            if (!navigator.mediaDevices) {
                throw new Error("No support for mediaDevices")
            }
            if (!window.MediaRecorder) {
                throw new Error("No support for MediaRecorder")
            }
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            })

            if (!preferredMimeType) {
                throw new Error(
                    "No MIME types are supported for recording audio"
                )
            }
            const options = { mimeType: preferredMimeType }
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
        } catch (e) {
            console.error(e)
            return
        }
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

    let newPostBody: string | undefined
    async function handlePost() {
        if (!newPostBody || !newPostBody.length) {
            return
        }

        const res = await createPost(newPostBody, null)
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                newPostBody = ""
                refreshPosts()
                if (recordedBlob) {
                    const res2 = await createPostRecording(
                        response.meta.post.uuid,
                        recordedBlob
                    )
                    // TODO: only reset this upon successful upload?
                    // TODO: give user feedback on failure
                    recordedChunks = []
                    if (res2.status === 200) {
                        const response2 = await res2.json()
                        if (response2.success) {
                            refreshPosts()
                        }
                    }
                }
            }
        }
    }

    const refreshPosts = () => {
        $allPostsStore.context = {
            ...$allPostsStore.context,
            paused: true,
        }
        $allPostsStore.context = {
            ...$allPostsStore.context,
            paused: false,
        }
    }
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
                        style="max-width: 100%"
                    />
                {/if}
            </div>
        </div>
    </div>
</div>
<div class="container max-w-2xl p-2 gap-y-1">
    {#each posts as post (post.uuid)}
        {#if post.author}
            <div class="post">
                <Post
                    uuid={post.uuid}
                    body={post.body}
                    author={post.author}
                    likes={post.likes}
                    replies={post.replies}
                    recordings={post.recordings}
                    createdAt={post.createdAt}
                />
            </div>
        {/if}
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

    .post:not(:last-child) {
        @apply border-b;
        @apply border-gray-200;
    }

    :global(.recording) {
        @apply px-2 !important;
    }
</style>
