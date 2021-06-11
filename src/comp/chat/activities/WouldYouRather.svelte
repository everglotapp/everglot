<script lang="ts">
    import {
        createEventDispatcher,
        getContext,
        onMount,
        onDestroy,
    } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized, Overlay } from "@nubolab-ffwd/svelte-fluent"
    import { XIcon } from "svelte-feather-icons"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import ButtonLarge from "../../util/ButtonLarge.svelte"
    import { CHAT_CONTEXT } from "../../util/ChatProvider.svelte"
    import type { ChatContext } from "../../util/ChatProvider.svelte"
    import Headline4 from "../../typography/Headline4.svelte"

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

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }
</script>

<div
    class="flex flex-row m-4 max-h-12 px-2 justify-between items-center"
    in:scale={{ duration: 200, delay: 350 }}
    out:scale={{ duration: 200, delay: 0 }}
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
        on:click={handleQuit}
    >
        <XIcon size="20" />
        <span class="ml-1"
            ><Localized id="chat-side-panel-activity-quit" /></span
        ></ButtonSmall
    >
</div>

<div class="px-16 py-8 md:py-24">
    <div class="relative flex justify-end" style="padding-right: 190px;">
        <div
            class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
        >
            {question}
        </div>
        <img
            src="/squirrel.png"
            alt="Squirrel"
            class="squirrel absolute right-4 top-4"
        />
    </div>
    <div class="flex flex-col items-center pt-32">
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

    .answer {
        max-width: 280px;
        width: 100%;

        @apply mb-2;
    }
</style>
