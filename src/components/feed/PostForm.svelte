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

    import GameRangeDropdown from "./GameRangeDropdown.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import Modal from "../util/Modal.svelte"
    import ClickAwayListener from "../util/ClickAwayListener.svelte"
    import EscapeKeyListener from "../util/EscapeKeyListener.svelte"
    import selectable, { SelectionEvent } from "../util/selectable"
    import {
        createPost,
        createPostRecording,
        formatPostBody,
    } from "../../routes/_helpers/posts"
    import { getSupportedMimeTypes } from "../../routes/_helpers/posts/recording"
    import { BodyPartType } from "../../constants"
    import type {
        SupportedLocale,
        PostGameRange,
        GuessCaseOption,
        GuessGenderOption,
        GuessCaseRange,
        GuessGenderRange,
    } from "../../constants"
    import { getBodyParts } from "../../routes/_helpers/posts/selections"
    import { PostGameType } from "../../types/generated/graphql"
    import {
        localeIsSupported,
        localeSupportsGuessCaseGames,
        localeSupportsGuessGenderGames,
        localeSupportsPostGamification,
    } from "../../helpers/locales"

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
            body: formattedNewPostBody,
            locale,
            parentPostUuid: null,
            promptUuid: shownPromptUuid || null,
            gameType: gamify && gameRanges.length ? gameType : null,
            ranges: gamify && gameType !== null ? gameRanges : null,
        })
        if (res.status === 200) {
            const response = await res.json()
            if (response.success) {
                newPostBody = ""
                if (writableBodyInputNode) {
                    writableBodyInputNode.innerHTML = ""
                }
                handleCloseGamify()
                dispatch("postSuccess", response.meta)
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
    let rangeOptionsDropdownId: string
    onMount(() => {
        const supportedMimeTypes = getSupportedMimeTypes("audio")
        if (supportedMimeTypes.length) {
            preferredMimeType = supportedMimeTypes[0]
        }

        bodyInputId = uuidv4()
        rangeOptionsDropdownId = uuidv4()

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
        ? localeSupportsPostGamification(locale)
        : false
    $: guessCaseSupported = locale
        ? localeSupportsGuessCaseGames(locale)
        : false
    $: guessGenderSupported = locale
        ? localeSupportsGuessGenderGames(locale)
        : false
    $: clozeSupported = locale ? localeIsSupported(locale) : false

    $: if (!gamificationSupported) {
        gamify = false
    }

    let newPostBodyByLocale: Partial<
        Record<SupportedLocale, string | undefined>
    > = {}
    let previousLocale: SupportedLocale | null = null
    $: if (locale !== previousLocale) {
        if (previousLocale) {
            if (!gamify) {
                newPostBodyByLocale[previousLocale] =
                    writableBodyInputNode.innerHTML
            }
            if (locale) {
                newPostBody = newPostBodyByLocale[locale]
                writableBodyInputNode.innerHTML = newPostBody || ""
            } else {
                newPostBody = undefined
                writableBodyInputNode.innerHTML = ""
            }
            newPostBodyByLocale = newPostBodyByLocale
        }
        clearAllSelections()
        handleCloseGamify()
        previousLocale = locale
    }

    let gameType: PostGameType | null = null
    function handleSelectGameType(kind: PostGameType) {
        gameType = kind
        clearAllSelections()
    }
    function handleCloseGamify() {
        gamify = false
        gameType = null
        gameRanges = []
        clearAllSelections()
    }
    function clearAllSelections() {
        selectionStart = null
        selectionEnd = null
        selectedText = null
        selectionRange = null
        const s = window.getSelection
            ? window.getSelection() // @ts-ignore
            : document.selection
        if (!s) {
            return
        }
        if (s.removeAllRanges) {
            s.removeAllRanges()
        } else if (s.empty) {
            s.empty()
        }
    }

    function handleBodyKeyup(_event: KeyboardEvent) {
        newPostBody = writableBodyInputNode.innerHTML
    }

    let selectedText: string | null = null
    let selectionStart: number | null = null
    let selectionEnd: number | null = null
    let selectionRange: Range | null = null
    function handleSelection(event: SelectionEvent) {
        // console.log("selection changed", event.detail)
        selectionStart = event.detail.start
        selectionEnd = event.detail.end
        selectedText = event.detail.text
        selectionRange = event.detail.range
    }

    const dragTypeIsForbidden = (type: string) =>
        type === "text/uri-list" ||
        type === "application/x-moz-nativeimage" ||
        type.startsWith("image/")
    function handleBodyDragover(event: DragEvent) {
        // console.log("dragover", { event })
        const types = event.dataTransfer?.types || []
        if (types.some(dragTypeIsForbidden)) {
            // console.log("Forbidden dragover!")
            event.preventDefault()
        } else {
            // console.log("Allowed dragover!")
        }
    }
    function handleBodyDrop(event: DragEvent) {
        const types = event.dataTransfer?.types || []
        if (types.some(dragTypeIsForbidden)) {
            // console.log("Forbidden drop!")
            event.preventDefault()
        } else {
            // console.log("Allowed drop!")
        }
        setTimeout(() => (newPostBody = writableBodyInputNode.innerHTML), 50)
        // console.log("drop", { event })
    }
    let writableBodyInputNode: HTMLElement
    let readonlyBodyInputNode: HTMLElement
    let gamify: boolean = false

    $: selectionOverlapsPickedRange =
        selectionStart !== null && selectionEnd !== null
            ? gameRanges.some(
                  (range) =>
                      (selectionStart! >= range.start &&
                          selectionStart! <= range.end) ||
                      (selectionEnd! >= range.start &&
                          selectionEnd! <= range.end) ||
                      (selectionStart! <= range.start &&
                          selectionEnd! >= range.end)
              )
            : null

    let editBodyPartUuid: string | null = null
    $: editedRangeIndex =
        editBodyPartUuid === null
            ? null
            : gameRanges.findIndex((range) => range.uuid === editBodyPartUuid)
    $: editedRange =
        editedRangeIndex === null || editedRangeIndex === -1
            ? null
            : gameRanges[editedRangeIndex]
    $: showSelectionDropdown =
        gamify &&
        gameType !== null &&
        ((selectedText !== null &&
            selectedText.length &&
            selectionStart !== null &&
            selectionEnd !== null &&
            selectionOverlapsPickedRange === false) ||
            editBodyPartUuid !== null)

    let gameRanges: PostGameRange[] = []

    $: formattedNewPostBody = formatPostBody(newPostBody || "")

    $: displayedNewPostBodyParts = gamify
        ? getBodyParts(formattedNewPostBody, gameRanges)
        : []

    function addRange(range: PostGameRange) {
        gameRanges = [...gameRanges, range]
    }

    function handleEditBodyPart(uuid: string) {
        // console.log("handleEditBodyPart", { uuid })
        editBodyPartUuid = uuid
        // Highlight picked body part that is being edited.
        const bodyPartNode = document.getElementById(uuid)
        if (bodyPartNode) {
            clearAllSelections()
            // @ts-ignore
            if (document.body.createTextRange) {
                // @ts-ignore
                const range = document.body.createTextRange()
                range.moveToElementText(bodyPartNode)
                range.select()
            } else if (window.getSelection) {
                const s = window.getSelection()
                if (s) {
                    const range = document.createRange()
                    range.selectNodeContents(bodyPartNode)
                    s.removeAllRanges()
                    s.addRange(range)
                }
            }
        }
    }

    function updateRange(uuid: string, rangePatch: Partial<PostGameRange>) {
        const i = gameRanges.findIndex((range) => range.uuid === uuid)
        if (i === -1) {
            // This should never happen as editBodyPartUuid is generated client-side.
            return
        }
        gameRanges[i] = { ...gameRanges[i], ...rangePatch }
        gameRanges = gameRanges
    }

    function removeRange(uuid: string) {
        const i = gameRanges.findIndex((range) => range.uuid === uuid)
        if (i === -1) {
            // This should never happen as editBodyPartUuid is generated client-side.
            return
        }
        gameRanges.splice(i, 1)
        gameRanges = gameRanges
    }

    function handlePickGuessCaseOption(
        event: CustomEvent<{ option: { value: keyof GuessCaseOption } }>
    ) {
        const option = event.detail.option
        if (editBodyPartUuid === null) {
            addRange({
                uuid: uuidv4(),
                start: selectionStart as number,
                end: selectionEnd as number,
                option: option.value,
            } as GuessCaseRange)
        } else {
            updateRange(editBodyPartUuid, {
                option: option.value,
            } as GuessCaseRange)
            editBodyPartUuid = null
        }
        clearAllSelections()
    }

    function handlePickGuessGenderOption(
        event: CustomEvent<{ option: { value: keyof GuessGenderOption } }>
    ) {
        const option = event.detail.option
        if (editBodyPartUuid === null) {
            addRange({
                uuid: uuidv4(),
                start: selectionStart as number,
                end: selectionEnd as number,
                option: option.value,
            } as GuessGenderRange)
        } else {
            updateRange(editBodyPartUuid, {
                option: option.value,
            } as GuessGenderRange)
            editBodyPartUuid = null
        }
        clearAllSelections()
    }

    function handleAddClozeEntry() {
        if (editBodyPartUuid === null) {
            addRange({
                uuid: uuidv4(),
                start: selectionStart as number,
                end: selectionEnd as number,
            })
        }
        clearAllSelections()
    }

    let ignoringSelectionChanges: boolean | null = null
    function handleIgnoringSelectionChangesUpdated(
        event: CustomEvent<boolean>
    ) {
        // console.log("handleIgnoringSelectionChangesUpdated", {
        //     event,
        // })
        ignoringSelectionChanges = event.detail
    }

    function handleGameRangeDropdownClickaway(
        event: CustomEvent<{ event: MouseEvent }>
    ) {
        // console.log("clickaway", {
        //     ignoringSelectionChanges,
        //     selectionRange,
        //     selectionStart,
        //     selectionEnd,
        //     selectedText,
        //     rangeOptionsDropdownId,
        // })
        if (ignoringSelectionChanges && event.detail.event.button === 0) {
            clearAllSelections()
        }
    }

    let forceRecalculateDropdownPosition = false
    $: {
        gamify
        gameType
        shownPromptUuid
        newPostBody
        forceRecalculateDropdownPosition = true
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
                class="py-4 pl-8 pr-16 font-bold text-gray-dark border-gray-light border-b font-secondary"
            >
                <Localized id="post-game-create-modal-title" />
            </div>
            <div class="bg-white flex flex-col items-center py-4 px-4">
                {#if guessCaseSupported}
                    <ButtonLarge
                        on:click={() =>
                            handleSelectGameType(PostGameType.GuessCase)}
                        tag="button"
                        variant="OUTLINED"
                        color="PRIMARY"
                        className="mb-2"
                        ><Localized
                            id="post-game-create-modal-guess-case"
                        /></ButtonLarge
                    >
                {/if}
                {#if guessGenderSupported}
                    <ButtonLarge
                        on:click={() =>
                            handleSelectGameType(PostGameType.GuessGender)}
                        tag="button"
                        variant="OUTLINED"
                        color="PRIMARY"
                        className="mb-2"
                        ><Localized
                            id="post-game-create-modal-guess-gender"
                        /></ButtonLarge
                    >
                {/if}
                {#if clozeSupported}
                    <ButtonLarge
                        on:click={() =>
                            handleSelectGameType(PostGameType.Cloze)}
                        tag="button"
                        variant="OUTLINED"
                        color="PRIMARY"
                        ><Localized
                            id="post-game-create-modal-cloze"
                        /></ButtonLarge
                    >
                {/if}
            </div>
        </div>
    </Modal>
{/if}
<div class="container max-w-2xl mb-2 pb-4 px-2">
    <div
        class="flex flex-col items-end justify-center w-full flex-wrap"
        on:dragover={(e) => {
            if (e.target !== writableBodyInputNode) {
                e.preventDefault()
            }
        }}
        on:drop={(e) => {
            if (e.target !== writableBodyInputNode) {
                e.preventDefault()
            }
        }}
    >
        {#if gamify && gameType !== null}
            <div
                class="flex items-center justify-between pt-1 pb-2 px-2 text-sm text-gray-bitdark font-bold text-left w-full font-secondary relative"
            >
                <span class="flex items-center">
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 40 40"
                        fill="none"
                        class="mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M31.8 11C30.6 9 28.4 8 26 8H14C11.6 8 9.4 9 8.2 11C3.6 18 2.6 28.6 5.8 30.8C9 33 16.2 23.4 20 23.4C23.8 23.4 30.8 33 34.2 30.8C37.4 28.6 36.4 18 31.8 11ZM16 18H14V20H12V18H10V16H12V14H14V16H16V18ZM26.8 19C26.8 20 26 20.8 25 20.8C24 20.8 23.2 20 23.2 19C23.2 18 24 17.2 25 17.2C26 17.2 26.8 18 26.8 19ZM30.6 15C30.6 16 29.8 16.8 28.8 16.8C27.8 16.8 27 16 27 15C27 14 27.8 13.2 28.8 13.2C29.8 13.2 30.6 14 30.6 15Z"
                            fill="currentColor"
                        />
                    </svg>Gamify: Select parts of your post.</span
                >
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    on:click={handleCloseGamify}
                    className="close-gamify-button flex items-center"
                >
                    <XIcon size="16" strokeWidth={1} class="mr-1" />
                    <Localized id={`post-game-cancel`} />
                </ButtonSmall>
            </div>
        {/if}
        <div class="w-full">
            {#if showSelectionDropdown && locale !== null && gameType !== null}
                <GameRangeDropdown
                    id={rangeOptionsDropdownId}
                    anchor={selectionRange}
                    container={readonlyBodyInputNode || null}
                    {locale}
                    {gameType}
                    {editedRange}
                    on:cancel={() => clearAllSelections()}
                    on:remove={() => {
                        if (editBodyPartUuid !== null) {
                            removeRange(editBodyPartUuid)
                            editBodyPartUuid = null
                            clearAllSelections()
                        }
                    }}
                    forceRecalculatePosition={forceRecalculateDropdownPosition}
                    on:positionRecalculated={() =>
                        (forceRecalculateDropdownPosition = false)}
                    showRemove={editBodyPartUuid !== null}
                    on:guessCaseOptionPicked={handlePickGuessCaseOption}
                    on:guessGenderOptionPicked={handlePickGuessGenderOption}
                    on:clozeEntryAdded={handleAddClozeEntry}
                />
                <ClickAwayListener
                    elementId={[bodyInputId, rangeOptionsDropdownId]}
                    on:clickaway={handleGameRangeDropdownClickaway}
                />
                <EscapeKeyListener on:keydown={() => clearAllSelections()} />
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
                tabindex={1}
                use:selectable={{
                    disabled:
                        !gamify ||
                        gameType === null ||
                        ![
                            PostGameType.GuessCase,
                            PostGameType.GuessGender,
                            PostGameType.Cloze,
                        ].includes(gameType),
                }}
                on:selection={handleSelection}
                on:ignoringSelectionChangesUpdated={handleIgnoringSelectionChangesUpdated}
                on:keyup={handleBodyKeyup}
                on:drop|preventDefault
                on:paste|preventDefault
            >
                {#if gamify}
                    {#each displayedNewPostBodyParts as bodyPart}
                        {#if bodyPart.type === BodyPartType.LineBreak}
                            <br />
                        {:else if bodyPart.type === BodyPartType.Range}
                            <span
                                id={bodyPart.uuid}
                                class="bg-primary-lightest border-primary border-b px-1 py-1 cursor-pointer"
                                style="margin-left: 1px; margin-right: 1px;"
                                on:click={() =>
                                    bodyPart.uuid &&
                                    handleEditBodyPart(bodyPart.uuid)}
                                >{bodyPart.value}</span
                            >
                        {:else if bodyPart.type === BodyPartType.Text}
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
                tabindex={1}
                on:keyup={handleBodyKeyup}
                on:dragover={handleBodyDragover}
                on:drop={handleBodyDrop}
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
                            width="22"
                            height="22"
                            viewBox="0 0 40 40"
                            class="mr-2"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M31.8 11C30.6 9 28.4 8 26 8H14C11.6 8 9.4 9 8.2 11C3.6 18 2.6 28.6 5.8 30.8C9 33 16.2 23.4 20 23.4C23.8 23.4 30.8 33 34.2 30.8C37.4 28.6 36.4 18 31.8 11ZM16 18H14V20H12V18H10V16H12V14H14V16H16V18ZM26.8 19C26.8 20 26 20.8 25 20.8C24 20.8 23.2 20 23.2 19C23.2 18 24 17.2 25 17.2C26 17.2 26.8 18 26.8 19ZM30.6 15C30.6 16 29.8 16.8 28.8 16.8C27.8 16.8 27 16 27 15C27 14 27.8 13.2 28.8 13.2C29.8 13.2 30.6 14 30.6 15Z"
                                fill="currentColor"
                            />
                        </svg>Gamify</ButtonLarge
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
