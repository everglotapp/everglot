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
    import { v4 as uuidv4 } from "uuid"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import Modal from "../util/Modal.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import {
        createPost,
        createPostRecording,
        formatPostBody,
    } from "../../routes/_helpers/posts"
    import { getSupportedMimeTypes } from "../../routes/_helpers/posts/recording"
    import {
        GAMIFY_POST_LOCALES,
        PostGameKind,
        BodyPartKind,
        GUESS_CASE_LOCALES,
        GUESS_CASE_OPTIONS,
        GUESS_GENDER_LOCALES,
        GUESS_GENDER_OPTIONS,
    } from "../../constants"
    import type {
        SupportedLocale,
        PostGameSelectionRange,
    } from "../../constants"
    import { getBodyParts } from "../../routes/_helpers/posts/selections"

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

        const res = await createPost({
            body: newPostBody,
            locale,
            parentPostUuid: null,
            promptUuid: shownPromptUuid || null,
        })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                newPostBody = ""
                if (writableBodyInputNode) {
                    writableBodyInputNode.innerHTML = ""
                }
                handleCloseGamify()
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

    let bodyInputId: string
    let selectionDropdownId: string
    onMount(() => {
        const supportedMimeTypes = getSupportedMimeTypes("audio")
        if (supportedMimeTypes.length) {
            preferredMimeType = supportedMimeTypes[0]
        }

        bodyInputId = uuidv4()
        selectionDropdownId = uuidv4()

        document.addEventListener(
            "selectionchange",
            handleDocumentSelectionChange
        )

        setInterval(updateRecordingDuration, 250)
        setInterval(updateAudioTimings, 250)
    })

    onDestroy(() => {
        clearUpdateRecordingDurationInterval()
        clearUpdateAudioTimingsInterval()
        document.removeEventListener(
            "selectionchange",
            handleDocumentSelectionChange
        )
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

    let gameType: PostGameKind | null = null
    function handleSelectGameType(kind: PostGameKind) {
        gameType = kind
        removeAllSelections()
    }
    function handleCloseGamify() {
        gamify = false
        gameType = null
        selection = null
        pickedRanges = []
    }
    function removeAllSelections() {
        const s = window.getSelection
            ? window.getSelection()
            : document.selection
        if (!s) {
            selection = null
            return
        }
        if (s.removeAllRanges) {
            s.removeAllRanges()
        } else if (s.empty) {
            s.empty()
        }
        selection = null
    }

    function handleSelectionDropdownClickaway(
        event: CustomEvent<{ event: MouseEvent }>
    ) {
        if (!willHandleSelect && event.detail.event.button === 0) {
            console.log("clickaway", {
                willHandleSelect,
                selection,
                selectionDropdownId,
            })
            selection = null
        }
    }
    function handleBodyKeyup(event: Event) {
        newPostBody = event.target?.innerHTML
        console.log("keyup", { willHandleSelect })
        tryHandleBodyTextSelection()
    }
    let preventAutoSelectionHandling: boolean = false
    function handleBodyMouseup() {
        console.log("mouseup", { willHandleSelect })
        preventAutoSelectionHandling = false
        if (!willHandleSelect) {
            // secondary click away handler
            selection = null
        }
        tryHandleBodyTextSelection()
    }
    function handleBodyMousedown() {
        console.log("mousedown", { willHandleSelect })
        preventAutoSelectionHandling = true
        tryClearAutoSelectionTimeout()
    }
    let writableBodyInputNode: HTMLElement
    let readonlyBodyInputNode: HTMLElement
    let selectionParentNode: HTMLElement
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
                PostGameKind.GuessCase,
                PostGameKind.GuessGender,
                PostGameKind.Cloze,
            ].includes(gameType)
        ) {
            return
        }
        const s = window.getSelection
            ? window.getSelection()
            : document.selection
        if (s && !s.isCollapsed && s.type === "Range") {
            const { focusNode: node } = s
            if (
                node &&
                node.nodeType === Node.TEXT_NODE &&
                node.parentNode === readonlyBodyInputNode
            ) {
                selection = s
            }
        }
        willHandleSelect = false
    }
    function handleBodySelectStart() {
        console.log("selectstart", { willHandleSelect })
        willHandleSelect = true
    }
    let autoSelectionTimeout: number | null = null
    function handleDocumentSelectionChange() {
        console.log("selectionchange", {
            willHandleSelect,
            currentSelection: window.getSelection(),
            autoSelectionTimeout,
        })
        if (typeof window === "undefined") {
            return
        }
        const currentSelection = window.getSelection()
        if (!currentSelection) {
            return
        }
        if (
            !selection ||
            currentSelection.focusOffset !== selection.focusOffset
        ) {
            selection = currentSelection
            tryClearAutoSelectionTimeout()
            if (!preventAutoSelectionHandling) {
                autoSelectionTimeout = window.setTimeout(() => {
                    if (!preventAutoSelectionHandling) {
                        console.log("autoSelectionTimeout expired, handling")
                        tryHandleBodyTextSelection()
                        autoSelectionTimeout = null
                    }
                }, 500)
            }
        }
    }
    function tryClearAutoSelectionTimeout() {
        if (!autoSelectionTimeout) {
            return
        }
        window.clearTimeout(autoSelectionTimeout)
        autoSelectionTimeout = null
    }
    $: selectionRange =
        selection && selection.rangeCount ? selection.getRangeAt(0) : null
    $: selectionStart = selectionRange?.startOffset || null
    $: selectionEnd = selectionRange ? selectionRange.endOffset - 1 : undefined
    $: selectionNode = selection ? (selection.focusNode as Text) : null
    let selectedText: string | null = null
    $: if (
        selectionNode &&
        selectionNode.data &&
        (selectionStart || 0) != selectionEnd
    ) {
        selectedText = selectionNode.data.substring(
            selectionStart || 0,
            selectionEnd
        )
    } else {
        selectedText = null
    }
    $: selectionBoundingRect = selectionRange?.getBoundingClientRect() || null
    $: selectionParentBoundingRect =
        selectionParentNode?.getBoundingClientRect() || null

    let pickedRanges: PostGameSelectionRange[] = []
    $: availableGuessCaseOptions =
        locale && (GUESS_CASE_LOCALES as readonly string[]).includes(locale)
            ? Object.entries(GUESS_CASE_OPTIONS[locale as GuessCaseLocale]).map(
                  (entry) => ({ value: entry[0], localizationId: entry[1] })
              )
            : []
    $: availableGuessGenderOptions =
        locale && (GUESS_GENDER_LOCALES as readonly string[]).includes(locale)
            ? Object.entries(
                  GUESS_GENDER_OPTIONS[locale as GuessGenderLocale]
              ).map((entry) => ({ value: entry[0], localizationId: entry[1] }))
            : []

    $: formattedNewPostBody = formatPostBody(newPostBody || "")

    $: displayedNewPostBodyParts =
        gamify && pickedRanges
            ? getBodyParts(formattedNewPostBody, pickedRanges)
            : []
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
                class="py-4 pl-8 pr-16 font-bold text-gray-dark border-gray-light border-b font-secondary"
            >
                Which kind of game to create?
            </div>
            <div class="bg-white flex flex-col items-center py-4 px-4">
                <ButtonLarge
                    on:click={() =>
                        handleSelectGameType(PostGameKind.GuessCase)}
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY"
                    className="mb-2">Guess the Case</ButtonLarge
                >
                <ButtonLarge
                    on:click={() =>
                        handleSelectGameType(PostGameKind.GuessGender)}
                    tag="button"
                    variant="OUTLINED"
                    color="PRIMARY"
                    className="mb-2">Guess the Gender</ButtonLarge
                >
                <ButtonLarge
                    on:click={() => handleSelectGameType(PostGameKind.Cloze)}
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
        <div bind:this={selectionParentNode} class="w-full">
            {#if gamify && gameType !== null && selectedText !== null && selectionBoundingRect && selectionParentBoundingRect}
                <div id={selectionDropdownId} class="relative w-full">
                    <div
                        class="absolute flex items-center justify-center"
                        style={`
                    top: ${Math.max(
                        0,
                        selectionBoundingRect.bottom -
                            selectionParentBoundingRect.top
                    )}px;
                    right: ${Math.max(
                        0,
                        -(
                            selectionBoundingRect.right -
                            selectionParentBoundingRect.right
                        )
                    )}px;`}
                    >
                        <div
                            class="bg-white shadow-lg border border-gray-light rounded-lg z-20 flex flex-col items-center"
                        >
                            {#if gameType === PostGameKind.GuessCase}
                                {#each availableGuessCaseOptions as option}
                                    <ButtonSmall
                                        tag="button"
                                        variant="TEXT"
                                        on:click={() => {
                                            pickedRanges = [
                                                ...pickedRanges,
                                                {
                                                    start: selectionStart || 0,
                                                    end:
                                                        selectionEnd ||
                                                        selectedText.length - 1,
                                                    option: option.value,
                                                },
                                            ]
                                            removeAllSelections()
                                        }}
                                        className="mb-1 w-full flex justify-center"
                                    >
                                        <Localized
                                            id={`post-game-guess-case-${option.localizationId}`}
                                        />
                                    </ButtonSmall>
                                {/each}
                            {:else if gameType === PostGameKind.GuessGender}
                                {#each availableGuessGenderOptions as option}
                                    <ButtonSmall
                                        tag="button"
                                        variant="TEXT"
                                        on:click={() => {
                                            pickedRanges = [
                                                ...pickedRanges,
                                                {
                                                    start: selectionStart || 0,
                                                    end:
                                                        selectionEnd ||
                                                        selectedText.length - 1,
                                                    option: option.value,
                                                },
                                            ]
                                            removeAllSelections()
                                        }}
                                        className="mb-1 w-full flex justify-center"
                                    >
                                        <Localized
                                            id={`post-game-guess-gender-${option.localizationId}`}
                                        />
                                    </ButtonSmall>
                                {/each}
                            {:else if gameType === PostGameKind.Cloze}
                                <ButtonSmall
                                    tag="button"
                                    variant="TEXT"
                                    on:click={() => {
                                        pickedRanges = [
                                            ...pickedRanges,
                                            {
                                                start: selectionStart || 0,
                                                end:
                                                    selectionEnd ||
                                                    selectedText.length - 1,
                                            },
                                        ]
                                        removeAllSelections()
                                    }}
                                    className="mb-1 w-full flex justify-center"
                                >
                                    <Localized id="post-game-cloze-new-gap" />
                                </ButtonSmall>
                            {/if}
                            <hr class="w-full" />
                            <ButtonSmall
                                tag="button"
                                variant="TEXT"
                                color="SECONDARY"
                                on:click={() => removeAllSelections()}
                                className="flex justify-center items-center w-full text-sm"
                            >
                                <XIcon
                                    size="16"
                                    strokeWidth={1}
                                    class="mr-1"
                                />Cancel
                            </ButtonSmall>
                        </div>
                    </div>
                    <ClickAwayListener
                        elementId={[bodyInputId, selectionDropdownId]}
                        on:clickaway={handleSelectionDropdownClickaway}
                    />
                    <EscapeKeyListener on:keydown={() => (selection = null)} />
                </div>
            {/if}
            <div
                bind:this={readonlyBodyInputNode}
                id={gamify ? bodyInputId : undefined}
                class="body-input"
                class:hidden={!gamify}
                aria-multiline
                role="textbox"
                placeholder={bodyInputPlaceholder}
                aria-placeholder={bodyInputPlaceholder}
                on:keyup={handleBodyKeyup}
                on:mousedown={handleBodyMousedown}
                on:mouseup={handleBodyMouseup}
                on:selectstart={handleBodySelectStart}
                on:selectionchange={handleDocumentSelectionChange}
            >
                {#if gamify}
                    {#each displayedNewPostBodyParts as bodyPart}
                        {#if bodyPart.kind === BodyPartKind.LineBreak}
                            <br />
                        {:else if bodyPart.kind === BodyPartKind.Selected}
                            <span
                                class="bg-primary-lightest border-primary border-b px-1 py-1 cursor-pointer"
                                style="margin-left: 1px; margin-right: 1px;"
                                >{bodyPart.value}</span
                            >
                        {:else if bodyPart.kind === BodyPartKind.Text}
                            {bodyPart.value}
                        {/if}
                    {/each}
                {/if}
            </div>
            <div
                bind:this={writableBodyInputNode}
                id={gamify ? undefined : bodyInputId}
                class="body-input"
                class:hidden={gamify}
                contenteditable
                aria-multiline
                role="textbox"
                placeholder={bodyInputPlaceholder}
                aria-placeholder={bodyInputPlaceholder}
                on:keyup={handleBodyKeyup}
            />
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
