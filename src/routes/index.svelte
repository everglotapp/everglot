<script lang="ts">
    import { onMount, onDestroy } from "svelte"
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
    import { currentUserStore } from "../stores/currentUser"

    import { query } from "@urql/svelte"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import Avatar from "../comp/users/Avatar.svelte"

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

    let feedItems = [
        {
            body: "Hello everyone, nice to meet you",
            author: {
                username: "senyao",
                uuid: "61c313a5-db4e-462c-9e95-b408e3cbc48e",
                avatarUrl:
                    "https://app.everglot.com/images/uploads/avatars/CS0QdMjS6p737TNiT4vjSq606EmRLqgkdaHEcNtPsv0.jpeg",
            },
            uuid: "cc7b4b21-49ce-4258-8aeb-605eda404128",
            createdAt: new Date(Date.now() - 2342342),
            likes: {
                totalCount: 4,
            },
            replies: {
                totalCount: 1,
            },
        },
        {
            body: "This app is cool",
            author: {
                username: "hys",
                uuid: "7a87ebd1-91ad-4d98-b541-118f60e497bf",
                avatarUrl:
                    "https://app.everglot.com/images/uploads/avatars/cXtFyhpb6juXuHm5sToeixx8ywxDdHraeBlfgnc7PVE.jpeg",
            },
            uuid: "87a7de02-1a5f-4791-a893-882ca1cc3c67",
            createdAt: new Date(Date.now() - 290425742),
            likes: {
                totalCount: 0,
            },
            replies: {
                totalCount: 2,
            },
        },
    ]
    type FeedItem = typeof feedItems[number]

    let userLikes: Record<string, boolean> = {}

    function handleLike(feedItem: FeedItem) {
        const { uuid } = feedItem
        if (userLikes.hasOwnProperty(uuid)) {
            userLikes[uuid] = !userLikes[uuid]
            feedItems.find((item) => item.uuid === uuid)!.likes.totalCount +=
                userLikes[uuid] ? 1 : -1
        } else {
            userLikes[uuid] = true
            feedItems.find((item) => item.uuid === uuid)!.likes.totalCount += 1
        }
        feedItems = feedItems // update
        userLikes = userLikes // update
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
                    on:click={() => {
                        console.log("send")
                    }}><SendIcon size="18" class="mr-2" />Post</ButtonSmall
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
    {#each feedItems as feedItem (feedItem.uuid)}
        <div
            class="feed-item py-3 sm:py-4 sm:px-3 gap-y-1"
            class:liked={userLikes[feedItem.uuid]}
            class:not-liked={!userLikes[feedItem.uuid]}
        >
            <div class="flex flex-row">
                <div class="pr-4">
                    <Avatar
                        username={feedItem.author.username}
                        url={feedItem.author.avatarUrl}
                    />
                </div>
                <div class="w-full">
                    <div class="mb-1 flex items-center justify-between">
                        <span class="text-gray-bitdark font-bold"
                            >{feedItem.author.username}</span
                        >
                        <time
                            use:svelteTime={{
                                timestamp: feedItem.createdAt,
                                format: "DD-MM-YYYY h:mm A",
                            }}
                            title={feedItem.createdAt.toLocaleString()}
                            class="text-sm text-gray-bitdark"
                        />
                    </div>
                    <div>{feedItem.body}</div>
                </div>
            </div>
            <div class="flex flex-row pt-1 justify-end items-center">
                <ButtonSmall
                    className="reply-button items-center recording ml-0 mr-1"
                    tag="button"
                    variant="TEXT"
                    on:click={() => {}}
                    ><MessageCircleIcon
                        size="16"
                    /><!--<span
                        class="ml-1 font-bold text-sm text-gray-bitdark select-none"
                        >Reply&nbsp;</span
                    >--><span
                        class="text-sm text-gray-bitdark font-bold select-none rounded-lg"
                        >{feedItem.replies.totalCount}</span
                    ></ButtonSmall
                >
                <ButtonSmall
                    className="like-button flex items-center cursor-pointer rounded-lg bg-gray-lightest"
                    on:click={() => handleLike(feedItem)}
                    tag="button"
                    variant="TEXT"
                >
                    <HeartIcon size="18" />
                    <span
                        class="text-sm font-bold text-gray-bitdark select-none"
                        >{feedItem.likes.totalCount}</span
                    >
                </ButtonSmall>
            </div>
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

    :global(.reply-button svg) {
        @apply text-gray-bitdark;
        @apply mr-2;
    }

    .liked :global(.like-button) {
        @apply bg-primary-lightest;
    }

    :global(.like-button) {
        @apply px-2 !important;
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
