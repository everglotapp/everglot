<script lang="ts">
    import { scale } from "svelte/transition"
    import EmojiSelector from "svelte-emoji-selector"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { ChevronsRightIcon } from "svelte-feather-icons"
    import { mutation } from "@urql/svelte"

    import ButtonLarge from "../util/ButtonLarge.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"

    import { groupUuid } from "../../stores"
    import {
        groupChatStore,
        currentUserIsGroupMember,
        currentGroupIsGlobal,
        fetchGroupMetadata,
    } from "../../stores/chat"

    import type {
        JoinGlobalGroupMutation,
        Maybe,
    } from "../../types/generated/graphql"
    import { JoinGlobalGroup } from "../../types/generated/graphql"
    import type { ChatMessage } from "../../types/chat"

    let msg = ""
    export let currentRoom: Maybe<string> = null
    export let isOwnMessage: (message: ChatMessage) => boolean
    export let sendMessage: (message: string) => boolean
    export let messages: ChatMessage[] = []

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })

    function handleEmoji(event: CustomEvent) {
        const input = getChatMessageInput()
        if (input && typeof input.selectionStart !== "undefined") {
            const { selectionStart: start, selectionEnd: end } = input
            if (start !== null && end !== null) {
                // Replace text selection by selected emoji.
                msg = `${msg.slice(0, start)}${event.detail}${msg.slice(end)}`
                focusChatMessageInput()
                // Move cursor to after selection. (Doesnt work)
                // input.selectionStart = input.selectionEnd = end
                return
            }
        }
        msg = `${msg || ""}${event.detail}`
        focusChatMessageInput()
    }
    const getChatMessageInput = () =>
        document.getElementById("send-msg-input") as HTMLInputElement | null
    function focusChatMessageInput(): void {
        const element = getChatMessageInput()
        if (element) {
            element.focus()
        }
    }

    function handleSendMessage(): void {
        focusChatMessageInput()
        const trimmedMsg = msg.trim()

        if (!trimmedMsg) {
            msg = ""
            return
        }
        const sent = sendMessage(trimmedMsg)
        if (sent) {
            msg = ""
        }
    }

    const HISTORY_MAX = 1
    let history: ChatMessage[] = []
    $: {
        const HISTORY_CHECK_MAX = 50
        const res = []
        for (
            let i = 0;
            i < HISTORY_CHECK_MAX &&
            i < messages.length &&
            res.length < HISTORY_MAX;
            ++i
        ) {
            const toCheck = messages[messages.length - i - 1]
            if (!isOwnMessage(toCheck)) {
                continue
            }
            res.push(toCheck)
        }
        history = res
    }
    let historyMessage: Maybe<ChatMessage> = null
    let origMsg: string = ""
    function handleMessageInputKeydown(event: KeyboardEvent): void {
        if (event.key === "ArrowUp") {
            if (!historyMessage) {
                const olderMsg = history[0]
                if (olderMsg) {
                    historyMessage = olderMsg
                    origMsg = msg
                    msg = historyMessage.text
                }
            }
        }
        if (event.key === "ArrowDown") {
            historyMessage = null
            msg = origMsg
        }
    }
</script>

<div
    class="submit-form-container rounded-bl-md rounded-br-md grid items-center"
>
    <form
        on:submit|preventDefault={handleSendMessage}
        class="submit-form justify-end items-center"
    >
        {#if $groupChatStore.data && $currentGroupIsGlobal && !$currentUserIsGroupMember}
            <ButtonLarge
                className="ml-4 px-6 w-full justify-center"
                tag="button"
                on:click={async () => {
                    const res = await joinGlobalGroup({
                        groupUuid: $groupUuid,
                    })
                    if (res.data) {
                        fetchGroupMetadata({
                            groupUuid: $groupUuid,
                        })
                    } else {
                        // TODO: Show error feedback
                    }
                }}
                ><Localized id="chat-submit-form-join-group" />
            </ButtonLarge>
        {:else if currentRoom}
            <Localized id="chat-submit-form-input" let:attrs>
                <input
                    id="send-msg-input"
                    type="text"
                    placeholder={attrs.placeholder}
                    required
                    autocomplete="off"
                    class="border-none shadow-md px-4 py-4 w-full rounded-md"
                    bind:value={msg}
                    in:scale={{
                        duration: 200,
                    }}
                    on:keydown={handleMessageInputKeydown}
                />
                <span class="hidden md:inline">
                    <EmojiSelector on:emoji={handleEmoji} />
                </span>
            </Localized>
            <ButtonSmall
                className="send-msg-button"
                tag="button"
                variant="TEXT"
                color="SECONDARY"
                on:click={handleSendMessage}
                ><ChevronsRightIcon size="28" /></ButtonSmall
            >
        {:else}
            <div
                class="w-full h-full font-bold text-center text-lg text-gray-bitdark"
            >
                <Localized id="chat-submit-form-connecting" />
            </div>
        {/if}
    </form>
</div>

<style>
    .submit-form-container {
        padding: 18px 30px;
        box-shadow: -2px -2px 4px rgba(220, 220, 220, 0.5);
        min-height: 94px;

        @apply bg-gray-lightest;
        @apply absolute;
        @apply bottom-0;
        @apply left-0;
        @apply right-0;
    }

    .submit-form-container form {
        display: flex;
    }

    #send-msg-input {
        @apply mr-3;
    }

    .submit-form-container :global(.send-msg-button) {
        @apply px-2 !important;
    }

    .submit-form-container :global(.send-msg-button:hover) {
        @apply text-primary !important;
    }

    .submit-form-container :global(.svelte-emoji-picker__trigger) {
        @apply text-sm;
        @apply px-2;
        @apply py-2;
        @apply text-gray-bitdark;
        @apply hover:text-primary;
    }

    .submit-form-container :global(.svelte-emoji-picker__trigger svg) {
        width: 1.4rem;
        height: 1.4rem;
    }

    @media (max-width: 700px) {
        .submit-form-container {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
