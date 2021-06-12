<script lang="ts">
    import {
        onMount,
        onDestroy,
        createEventDispatcher,
        getContext,
    } from "svelte"
    import { fade } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { XIcon } from "svelte-feather-icons"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import ButtonLarge from "../../util/ButtonLarge.svelte"
    import Modal from "../../util/Modal.svelte"
    import Headline4 from "../../typography/Headline4.svelte"
    import { CHAT_CONTEXT } from "../../util/ChatProvider.svelte"
    import type { ChatContext } from "../../util/ChatProvider.svelte"

    import { currentUserIsGroupMember } from "../../../stores/chat"

    export let question: string
    const MIN_RANDOM_QUESTION_DURATION_SECONDS = 20
    let endTime = Date.now() + 1000 * MIN_RANDOM_QUESTION_DURATION_SECONDS
    // @ts-ignore
    $: question, resetEndTime()
    $: endDate = new Date(endTime)
    $: over = new Date() > endDate
    let updateInterval: number | undefined
    let wantsToEndActivity = false

    const resetEndTime = () => {
        endTime = Date.now() + 1000 * MIN_RANDOM_QUESTION_DURATION_SECONDS
    }

    onMount(() => {
        updateInterval = setInterval(() => {
            over = new Date() > endDate
        }, 1000)
    })
    onDestroy(() => {
        clearInterval(updateInterval)
        updateInterval = undefined
    })

    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat } = chat

    const dispatch = createEventDispatcher()

    const handleQuit = () => {
        dispatch("quit")
    }

    function nextQuestion() {
        if (!$connectedToChat) {
            return
        }
        chat.emit("groupActivity.randomQuestionNextQuestion")
    }
</script>

<div class="flex flex-row m-4 max-h-12 px-2 justify-between items-center">
    <Headline4
        ><Localized id="chat-side-panel-activity-random-question" /></Headline4
    >
    <ButtonSmall
        tag="button"
        className="items-center justify-center"
        color="PRIMARY"
        variant="TEXT"
        disabled={!$currentUserIsGroupMember}
        on:click={() => (wantsToEndActivity = true)}
    >
        <XIcon size="20" />
        <span class="ml-1"
            ><Localized id="chat-side-panel-activity-quit" /></span
        ></ButtonSmall
    >
</div>

<div class="px-16 py-8 md:py-24">
    <div class="relative flex justify-end" style="padding-right: 190px;">
        {#key question}
            <div
                class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
            >
                <span
                    class="w-full"
                    in:fade={{ duration: 200, delay: 350 }}
                    out:fade={{ duration: 200, delay: 0 }}
                >
                    {question}</span
                >
            </div>
        {/key}
        <img
            src="/squirrel.png"
            alt="Squirrel"
            class="squirrel absolute right-4 top-4"
        />
    </div>
    <div class="flex flex-col items-center pt-32">
        {#if over}
            <ButtonLarge
                tag="button"
                className="justify-center"
                color="SECONDARY"
                variant="OUTLINED"
                disabled={!$currentUserIsGroupMember || !$connectedToChat}
                on:click={() => {
                    nextQuestion()
                }}
            >
                <Localized
                    id="chat-side-panel-activity-random-question-next-question"
                /></ButtonLarge
            >
        {:else}
            <div>
                <Localized
                    id="chat-side-panel-activity-random-question-discuss"
                />
            </div>
        {/if}
    </div>
</div>

{#if wantsToEndActivity}
    <Modal>
        <div class="py-4 px-4 md:py-8 md:px-10 bg-white shadow-lg rounded-lg">
            <p class="mb-6 text-center">
                <Localized id="chat-side-panel-activity-quit-text" />
            </p>
            <div class="flex justify-end">
                <ButtonSmall
                    tag="button"
                    on:click={() => (wantsToEndActivity = false)}
                    variant="TEXT"
                    color="PRIMARY"
                    ><Localized
                        id="chat-side-panel-activity-quit-cancel"
                    /></ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    on:click={() => {
                        wantsToEndActivity = false
                        handleQuit()
                    }}
                    ><Localized
                        id="chat-side-panel-activity-quit-confirm"
                    /></ButtonSmall
                >
            </div>
        </div></Modal
    >
{/if}

<style>
    .squirrel {
        transform: rotateY(180deg);
        max-width: 154px;
        right: 9px;
        top: max(35px, calc(400px - 24vw));
    }

    .squirrel-bubble {
        position: relative;
        border-radius: 0.4rem;
    }

    .squirrel-bubble::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 10%;
        width: 0;
        height: 0;
        border: 1.5rem solid transparent;
        border-left-color: theme("colors.primary.lightest");
        border-right: 0;
        border-bottom: 0;
        margin-top: -0.75rem;
        margin-right: -1.5rem;
    }
</style>
