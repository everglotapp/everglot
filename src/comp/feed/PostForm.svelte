<script lang="ts">
    import { onDestroy, onMount, createEventDispatcher } from "svelte"
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
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { stores as fluentStores } from "@nubolab-ffwd/svelte-fluent/src/internal/FluentProvider.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import Modal from "../util/Modal.svelte"
    import {
        createPost,
        createPostRecording,
    } from "../../routes/_helpers/posts"
    import { getSupportedMimeTypes } from "../../routes/_helpers/posts/recording"
    import { GAMIFY_POST_LOCALES, SupportedLocale } from "../../constants"

    export let shownPromptUuid: string | null
    export let locale: SupportedLocale | null

    const dispatch = createEventDispatcher()

    const { translate } = fluentStores()!

    let recording: boolean = false
    let recordingStarted: number | null = null
    let preferredMimeType: string | null = null
    let updateRecordingDurationInterval: number | null = null
    let updateAudioTimingsInterval: number | null = null

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

    let newPostBody: string | undefined
    async function handlePost() {
        if (!newPostBody || !newPostBody.length || !locale) {
            return
        }

        const res = await createPost(
            newPostBody,
            locale,
            null,
            shownPromptUuid || null
        )
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                newPostBody = ""
                dispatch("postSuccess")
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
                            dispatch("postSuccess")
                        } else {
                            dispatch("postFailure")
                        }
                    } else {
                        dispatch("postFailure")
                    }
                }
            } else {
                dispatch("postFailure")
            }
        } else {
            dispatch("postFailure")
        }
    }

    onMount(() => {
        const supportedMimeTypes = getSupportedMimeTypes("audio")
        if (supportedMimeTypes.length) {
            preferredMimeType = supportedMimeTypes[0]
        }

        setInterval(updateRecordingDuration, 250)
        setInterval(updateAudioTimings, 250)
    })

    onDestroy(() => {
        clearUpdateRecordingDurationInterval()
        clearUpdateAudioTimingsInterval()
    })

    $: bodyInputPlaceholder = $translate(
        "index-post-form-body-input-placeholder"
    )

    $: gamificationSupported = locale
        ? (GAMIFY_POST_LOCALES as readonly string[]).includes(locale as string)
        : false

    $: if (!gamificationSupported) {
        gamify = false
    }

    enum PostGameType {
        GuessCase,
        GuessGender,
        Cloze,
    }
    let gameType: PostGameType | null = null
    function handleCloseGamify() {
        gamify = false
        gameType = null
        selection = null
    }

    function handleBodyKeyup(event: Event) {
        newPostBody = event.target?.innerHTML
        tryHandleBodyTextSelection()
    }
    function handleBodyMouseup() {
        tryHandleBodyTextSelection()
    }
    let bodyInputNode: HTMLElement
    let gamify: boolean = false
    let willHandleSelect: boolean = false
    let selection: Selection | null = null
    function tryHandleBodyTextSelection() {
        if (!willHandleSelect) {
            return
        }
        if (
            !gamify ||
            gameType === null ||
            ![
                PostGameType.GuessCase,
                PostGameType.GuessGender,
                PostGameType.Cloze,
            ].includes(gameType)
        ) {
            return
        }
        const windowSelection = window.getSelection()
        if (windowSelection && windowSelection.type === "Range") {
            const { focusNode: node } = windowSelection
            if (
                node &&
                node.nodeType === Node.TEXT_NODE &&
                node.parentNode === bodyInputNode
            ) {
                selection = windowSelection
            }
        }
        willHandleSelect = false
    }
    function handleBodySelectStart() {
        willHandleSelect = true
    }
    $: selectionStart = selection ? selection.focusOffset : null
    $: selectionEnd = selection ? selection.anchorOffset : undefined
    $: selectionNode = selection ? (selection.focusNode as Text) : null
    let selectedText: string | null = null
    $: if (selectionNode) {
        selectedText = selectionNode.data.substring(
            selectionStart || 0,
            selectionEnd
        )
    } else {
        selectedText = null
    }
</script>

{#if gamify && gameType === null}
    <Modal>
        <div
            class="relative bg-gray-lightest rounded-lg shadow-md overflow-hidden"
        >
            <div class="absolute right-0 top-3">
                <ButtonSmall
                    on:click={() => (gamify = false)}
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    ><XIcon size="18" class="text-gray my-1" /></ButtonSmall
                >
            </div>
            <div
                class="py-4 pl-8 pr-16 font-bold text-gray-bitdark border-gray-light border-b"
            >
                Which game do you want to create?
            </div>
            <div class="bg-white flex flex-col items-center py-4 px-4">
                <ButtonLarge
                    on:click={() => (gameType = PostGameType.GuessCase)}
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY"
                    className="mb-2">Guess the Case</ButtonLarge
                >
                <ButtonLarge
                    on:click={() => (gameType = PostGameType.GuessGender)}
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY"
                    className="mb-2">Guess the Gender</ButtonLarge
                >
                <ButtonLarge
                    on:click={() => (gameType = PostGameType.Cloze)}
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY">Cloze</ButtonLarge
                >
            </div>
        </div>
    </Modal>
{/if}
<div class="container max-w-2xl mb-2 pb-4 px-2">
    <div class="flex flex-col items-end justify-center w-full flex-wrap">
        {#if gamify && gameType !== null}
            <div
                class="flex items-center justify-between pt-1 pb-2 px-2 text-sm text-gray-bitdark font-bold text-left w-full font-secondary relative"
            >
                <span class="flex items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        class="mr-2"
                        role="img"
                        width="18"
                        height="18"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 16 16"
                        ><g fill="currentColor"
                            ><path
                                d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"
                            /><path
                                d="M5.5 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
                            /></g
                        ></svg
                    >Gamify: Select parts of your post.</span
                >
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    on:click={handleCloseGamify}
                    className="close-gamify-button flex items-center"
                >
                    <XIcon size="16" strokeWidth={1} class="mr-1" />
                    <span>Cancel</span>
                </ButtonSmall>
            </div>
        {/if}
        <div
            bind:this={bodyInputNode}
            class="body-input"
            contenteditable={gamify ? "false" : "true"}
            aria-multiline
            role="textbox"
            placeholder={bodyInputPlaceholder}
            aria-placeholder={bodyInputPlaceholder}
            on:keyup={handleBodyKeyup}
            on:mouseup={handleBodyMouseup}
            on:selectstart={handleBodySelectStart}
        />
        <div class="relative w-full">
            {#if selectedText !== null}
                <div
                    class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center"
                    style="margin-bottom: -1rem;"
                >
                    <div
                        class="bg-white shadow-lg rounded-lg z-20 flex flex-col items-center"
                    >
                        {#if gameType === PostGameType.GuessCase}
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                on:click={() => (selection = null)}
                                className="mb-1 w-full flex justify-center"
                            >
                                Nominativ
                            </ButtonSmall>
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                on:click={() => (selection = null)}
                                className="mb-1 w-full flex justify-center"
                            >
                                Genitiv
                            </ButtonSmall>
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                on:click={() => (selection = null)}
                                className="mb-1 w-full flex justify-center"
                            >
                                Dativ
                            </ButtonSmall>
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                on:click={() => (selection = null)}
                                className="mb-1 w-full flex justify-center"
                            >
                                Akkusativ
                            </ButtonSmall>
                            <hr class="w-full" />
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                color="SECONDARY"
                                on:click={() => (selection = null)}
                                className="flex justify-center items-center w-full text-sm"
                            >
                                <XIcon
                                    size="16"
                                    strokeWidth={1}
                                    class="mr-1"
                                />Cancel
                            </ButtonSmall>
                        {/if}
                    </div>
                </div>
            {/if}
        </div>
        <div>
            <div class="flex items-center flex-wrap justify-end relative">
                {#if gamificationSupported && !gamify && newPostBody && newPostBody.length}
                    <ButtonLarge
                        className="flex mb-1 items-center justify-self-start"
                        tag="button"
                        variant="OUTLINED"
                        on:click={() => (gamify = true)}
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            aria-hidden="true"
                            class="mr-2"
                            role="img"
                            width="18"
                            height="18"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 16 16"
                            ><g fill="currentColor"
                                ><path
                                    d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z"
                                /><path
                                    d="M5.5 4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0z"
                                /></g
                            ></svg
                        >Gamify</ButtonLarge
                    >
                {/if}
                <ButtonLarge
                    className={"ml-1 mb-1 items-center" +
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
                        />{:else}<MicIcon size="20" class="mr-2" /><Localized
                            id="index-post-form-record-button"
                        />{/if}</ButtonLarge
                >
                {#if recording}
                    <ButtonSmall
                        className="items-center mb-1 recording ml-0 mr-1"
                        tag="button"
                        variant="TEXT"
                        on:click={handleUserRecordCancel}
                        ><XIcon size="20" class="text-gray" /></ButtonSmall
                    >
                {/if}
                <ButtonLarge
                    className="items-center mb-1"
                    tag="button"
                    on:click={() => handlePost()}
                    ><SendIcon size="18" class="mr-2" /><Localized
                        id="index-post-form-post-button"
                    /></ButtonLarge
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

<style>
    [placeholder]:empty::before {
        content: attr(placeholder);

        @apply text-gray;
    }

    [placeholder]:empty:focus::before {
        content: "";
    }

    .body-input {
        word-wrap: anywhere;
        overflow-wrap: anywhere;
        white-space: break-spaces;
        min-height: 6rem;

        @apply w-full;
        @apply overflow-hidden;
        @apply overflow-ellipsis;
        @apply py-2;
        @apply px-4;
        @apply mb-2;
        @apply border;
        @apply border-gray-light;
        @apply bg-gray-lightest;
        @apply rounded-lg;
    }

    :global(.close-gamify-button) {
        @apply text-gray-bitdark;
    }

    :global(.recording) {
        @apply px-2 !important;
    }
</style>
