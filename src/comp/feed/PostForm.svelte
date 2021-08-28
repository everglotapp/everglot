<script lang="ts">
    import { onDestroy, onMount } from "svelte"
    import Time from "svelte-time"
    import {
        MicIcon,
        XIcon,
        XCircleIcon,
        CheckIcon,
        SendIcon,
        PlayIcon,
        PauseIcon,
        TrashIcon,
        ShuffleIcon,
        ChevronDownIcon,
        ChevronUpIcon,
    } from "svelte-feather-icons"
    import { query } from "@urql/svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import {
        createPost,
        createPostRecording,
    } from "../../routes/_helpers/posts"
    import { getSupportedMimeTypes } from "../../routes/_helpers/posts/recording"
    import { allPostsStore } from "../../stores/feed"
    import { PromptType } from "../../types/generated/graphql"
    import type { Language } from "../../types/generated/graphql"
    import { languageCodeMappings } from "../../stores"
    import { SUPPORTED_LOCALES, PROMPT_LOCALES } from "../../constants"
    import type { SupportedLocale } from "../../constants"

    query(languageCodeMappings)

    let recording: boolean = false
    let recordingStarted: number | null = null
    let preferredMimeType: string | null = null
    let updateRecordingDurationInterval: number | null = null
    let updateAudioTimingsInterval: number | null = null

    let languagePicker: HTMLSelectElement | undefined
    let languagePickerFocused: boolean = false
    let pickedLocale: SupportedLocale | undefined = "en"
    $: pickedLanguage = pickedLocale
        ? languages.find((language) => language.alpha2 === pickedLocale)
        : null

    $: promptsSupportedForPickedLocale = (
        PROMPT_LOCALES as readonly string[]
    ).includes(pickedLocale as string)

    let languages: Pick<Language, "englishName" | "alpha2">[] = []
    $: if (!$languageCodeMappings.fetching && $languageCodeMappings.data) {
        languages =
            $languageCodeMappings.data?.languages?.nodes
                .filter(Boolean)
                .map((node) => node!) || []
    }
    type LanguageItem = { value: string; label: string }
    let items: LanguageItem[] = []
    $: items = languages
        .filter((language) =>
            (SUPPORTED_LOCALES as readonly string[]).includes(
                language.alpha2.toLowerCase()
            )
        )
        .map(({ alpha2, englishName }) => ({
            value: alpha2,
            label: englishName,
        }))

    interface Prompt {
        type: PromptType
        content: string
    }
    let prompt: Prompt | null = null

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

    $: {
        if (languagePicker) {
            if (languagePickerFocused) {
                languagePicker.focus()
            } else {
                languagePicker.blur()
            }
        }
    }

    async function handleShuffle() {
        if (
            !pickedLocale ||
            !(PROMPT_LOCALES as readonly string[]).includes(
                pickedLocale as string
            )
        ) {
            return
        }
        const response = await fetch(`/prompts/get?locale=${pickedLocale}`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        const res = await response.json()
        if (!res.hasOwnProperty("success")) {
            return
        }
        if (res.success !== true || !res.data) {
            return
        }
        prompt = res.data.prompt
    }
</script>

<div class="container max-w-xl mb-2 pt-8 pb-4 px-2">
    <div
        class="flex flex-row items-center justify-between w-full flex-nowrap mb-2"
    >
        <div>
            {#if promptsSupportedForPickedLocale}
                <ButtonSmall
                    className="items-center"
                    tag="button"
                    variant="OUTLINED"
                    on:click={handleShuffle}
                    ><span class="hidden sm:inline"
                        >{prompt ? "Shuffle Prompts" : "Prompt me"}</span
                    ><span class="inline sm:hidden"
                        >{prompt ? "Shuffle" : "Prompt me"}</span
                    ><ShuffleIcon size="18" class="ml-2" /></ButtonSmall
                >
            {/if}
        </div>
        <div class="language-select-wrapper">
            <select
                class="language-select rounded-lg"
                on:focus={() => (languagePickerFocused = true)}
                on:blur={() => (languagePickerFocused = false)}
                bind:this={languagePicker}
                bind:value={pickedLocale}
            >
                {#each items as item}
                    <option value={item.value}>{item.label}</option>
                {/each}
            </select>
            <ButtonSmall
                on:click={() =>
                    (languagePickerFocused = !languagePickerFocused)}
                variant="TEXT"
                tag="button"
                color="SECONDARY"
                className="language-button flex items-center text-gray-bitdark font-secondary font-bold relative"
            >
                <span class="overflow-hidden overflow-ellipsis"
                    >{pickedLocale
                        ? pickedLanguage
                            ? pickedLanguage.englishName
                            : pickedLocale.toUpperCase()
                        : "Pick …"}</span
                >
                <div class="pl-5 flex items-center">
                    <ChevronDownIcon size="18" />
                </div>
            </ButtonSmall>
        </div>
    </div>
    {#if prompt}
        <div class="pt-8 pb-4 px-4 font-secondary relative">
            {#if prompt.type === PromptType.Question}
                <div class="font-bold text-2xl text-center">
                    {prompt.content}
                </div>
            {:else if prompt.type === PromptType.Word}
                <div class="font-bold text-4xl text-center mb-2">
                    {prompt.content}
                </div>
                <div class="text-lg text-gray text-center">
                    Benutze dieses Wort in einem Satz.
                </div>
            {/if}
            <ButtonSmall
                tag="button"
                variant="TEXT"
                on:click={() => (prompt = null)}
                className="close-prompt-button"
            >
                <XCircleIcon size="32" />
            </ButtonSmall>
        </div>
    {/if}
    <div class="flex flex-col items-end justify-center w-full flex-wrap">
        <div
            class="w-full overflow-hidden overflow-ellipsis py-2 px-4 mb-2 border border-gray-light bg-gray-lightest rounded-lg"
            contenteditable
            aria-multiline
            role="textbox"
            style="word-wrap: anywhere; overflow-wrap: anywhere; white-space: break-spaces;"
            placeholder="Squeek your mind …"
            aria-placeholder="Squeek your mind …"
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

<style>
    .language-select-wrapper {
        @apply relative;

        width: 8rem;
        height: 2.7rem;
    }

    :global(.language-button),
    .language-select {
        @apply absolute;
        @apply left-0;
        @apply top-0;
        @apply right-0;
        @apply bottom-0;
        @apply w-full;
        @apply h-full;
    }

    :global(.language-button) {
        border: 0;
        border-bottom-width: 3px !important;
        border-bottom-style: solid !important;

        @apply border-gray-bitdark !important;
        @apply rounded-none !important;
        @apply py-1 !important;
        @apply hidden !important;
        @apply justify-between !important;
        @apply bg-white;
        @apply px-1 !important;
    }

    .language-select {
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
        background-repeat: no-repeat;
        background-position-x: calc(100% - 0.5rem);
        background-position-y: 0.5rem;
        padding: 0 2.15rem 0 0;
        border: 0 none;
    }

    @media (hover: hover) {
        :global(.language-button) {
            @apply flex !important;
        }
        .language-select:focus + :global(.language-button) {
            @apply hidden !important;
        }
    }

    :global(.close-prompt-button) {
        top: -0.25rem;
        right: -0.5rem;

        @apply text-gray;
        @apply absolute;
    }

    :global(.close-prompt-button:hover) {
        @apply bg-transparent !important;
    }
</style>
