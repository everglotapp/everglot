<script lang="ts">
    import {
        createEventDispatcher,
        getContext,
        onMount,
        onDestroy,
    } from "svelte"
    import { fade } from "svelte/transition"
    import { Localized, Overlay } from "@nubolab-ffwd/svelte-fluent"
    import { XIcon } from "svelte-feather-icons"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import ButtonLarge from "../../util/ButtonLarge.svelte"
    import Modal from "../../util/Modal.svelte"
    import { CHAT_CONTEXT } from "../../util/ChatProvider.svelte"
    import type { ChatContext } from "../../util/ChatProvider.svelte"
    import Headline4 from "../../typography/Headline4.svelte"
    import SquirrelBubble from "./_SquirrelBubble.svelte"

    import { currentUserIsGroupMember } from "../../../stores/chat"

    export let answers: string[]
    export let question: string
    export let endTime: string

    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat } = chat

    let pickedAnswer: number | null = null
    $: endDate = new Date(endTime)
    $: over = new Date() > endDate
    let updateInterval: number | undefined
    let remainingSeconds: number | null
    let wantsToEndActivity = false

    onMount(() => {
        updateInterval = setInterval(() => {
            over = new Date() > endDate
            remainingSeconds = over
                ? null
                : Math.ceil((endDate.getTime() - Date.now()) / 1000)
        }, 1000)
    })

    onDestroy(() => {
        clearInterval(updateInterval)
        updateInterval = undefined
    })

    const handleQuestionChanged = () => {
        pickedAnswer = null
    }
    // @ts-ignore
    $: question, handleQuestionChanged()

    function pickAnswer(answerIndex: number) {
        if (!$connectedToChat) {
            return
        }
        if (pickedAnswer !== null) {
            return
        }
        pickedAnswer = answerIndex
        chat.emit("groupActivity.wouldYouRatherAnswer", { answerIndex })
    }

    function nextQuestion() {
        if (!$connectedToChat) {
            return
        }
        chat.emit("groupActivity.wouldYouRatherNextQuestion")
    }

    const dispatch = createEventDispatcher()

    const handleQuit = () => {
        dispatch("quit")
    }
</script>

<div
    class="flex flex-row mt-1 mb-2 sm:mx-4 md:my-4 max-h-12 px-2 justify-between items-center"
>
    <Headline4
        ><Localized id="chat-side-panel-activity-would-you-rather" /></Headline4
    >
    <ButtonSmall
        tag="button"
        className="items-center justify-center"
        color="PRIMARY"
        variant="TEXT"
        disabled={!$currentUserIsGroupMember || !$connectedToChat}
        on:click={() => (wantsToEndActivity = true)}
    >
        <XIcon size="20" />
        <span class="ml-1"
            ><Localized id="chat-side-panel-activity-quit" /></span
        ></ButtonSmall
    >
</div>

<div
    class="flex flex-col justify-start items-center overflow-hidden"
    style="min-height: 100%;"
>
    <SquirrelBubble>{question}</SquirrelBubble>
    <div class="flex flex-col items-center pt-4">
        {#if pickedAnswer !== null}
            <div class="mb-8">
                <Overlay
                    id="chat-side-panel-activity-would-you-rather-picked-answer"
                    args={{
                        answer: answers[pickedAnswer],
                    }}
                >
                    You picked <strong class="text-gray-bitdark"
                        >{answers[pickedAnswer]}</strong
                    >!
                </Overlay>
            </div>
        {:else if !over}
            <div class="mb-4">
                {#each answers as answer, i}
                    <div class="answer">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="SECONDARY"
                            variant="OUTLINED"
                            disabled={!$currentUserIsGroupMember}
                            on:click={() => {
                                pickAnswer(i)
                            }}>{answer}</ButtonLarge
                        >
                    </div>
                {/each}
            </div>
        {/if}
        {#if typeof remainingSeconds === "number" && remainingSeconds > 0 && (pickedAnswer !== null || remainingSeconds <= 10)}
            <div class="text-sm">
                <Localized
                    id="chat-side-panel-activity-would-you-rather-timer"
                    args={{ seconds: remainingSeconds }}
                />
            </div>
        {/if}
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
                    id="chat-side-panel-activity-would-you-rather-next-question"
                /></ButtonLarge
            >
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
    .answer {
        max-width: 280px;
        width: 100%;

        @apply mb-2;
    }
</style>
