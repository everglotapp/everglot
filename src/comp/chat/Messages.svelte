<script lang="ts">
    import { onMount } from "svelte"

    import Message from "./Message.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import Spinner from "../util/Spinner.svelte"
    import { groupChatMessagesStore } from "../../stores/chat"

    import type { ChatMessage, ChatMessagePreview } from "../../types/chat"
    import {
        isScrolledToBottom,
        scrollToBottom,
    } from "../../routes/_helpers/scrolling"

    export let handleEnlargenImage: (url: string) => (event: MouseEvent) => void
    export let fetchMoreMessages: () => void
    export let isOwnMessage: (message: ChatMessage) => boolean

    let messagesContainer: HTMLElement | undefined
    export let messages: ChatMessage[] = []
    export let previews: Record<ChatMessage["uuid"], ChatMessagePreview[]> = {}
    export let lastSentMessage: ChatMessage | null = null
    export let lastMessageSentAt: number | null = null

    let latestSentMessageHandledAt: number | null = null

    $: {
        messages // dependency
        previews // dependency

        const forceScrollToBottom =
            messagesContainer && isScrolledToBottom(messagesContainer)
        const handleLastMessage =
            !!latestSentMessageHandledAt &&
            !!lastSentMessage &&
            !!lastMessageSentAt &&
            lastMessageSentAt > latestSentMessageHandledAt

        if (handleLastMessage) {
            // handle single message sent by user

            setTimeout(() => {
                if (!messagesContainer) {
                    return
                }

                /**
                 * Force auto-scroll if the user sent the message themselves
                 * or if the user didn't scroll upwards before receiving the message.
                 */
                const force =
                    isOwnMessage(lastSentMessage!) ||
                    (!!messagesContainer &&
                        isScrolledToBottom(messagesContainer))
                scrollToBottom(messagesContainer, force)

                latestSentMessageHandledAt = Date.now()
            }, 100)
        } else {
            // handle multiple loaded messages

            const previousHeight = messagesContainer
                ? messagesContainer.scrollHeight
                : null
            setTimeout(() => {
                if (!messagesContainer) {
                    return
                }
                if (previousHeight === null) {
                    scrollToBottom(messagesContainer, forceScrollToBottom)
                    return
                }
                const heightDifference =
                    messagesContainer.scrollHeight - previousHeight
                if (heightDifference > 0) {
                    messagesContainer.scrollTop += heightDifference
                }
            }, 150)
        }
    }

    const FETCH_OLDER_MAX_SCROLL_TOP_PX = 1500
    function handleScroll(event: Event) {
        const container = event.target as HTMLElement | null
        if (!container) {
            return
        }
        const scrolledPx =
            container.scrollTop ||
            container.scrollHeight - container.clientHeight
        const { hasPreviousPage } =
            $groupChatMessagesStore.data?.groupByUuid
                ?.messagesByRecipientGroupId.pageInfo || {}
        if (
            scrolledPx < FETCH_OLDER_MAX_SCROLL_TOP_PX &&
            hasPreviousPage &&
            !$groupChatMessagesStore.fetching
        ) {
            // element is scrolled near top
            fetchMoreMessages()
        }
    }

    onMount(() => {
        latestSentMessageHandledAt = Date.now()
        setTimeout(() => {
            if (messagesContainer) {
                scrollToBottom(messagesContainer)
            }
        }, 150)
    })
</script>

<div class="messages" on:scroll={handleScroll} bind:this={messagesContainer}>
    {#if $groupChatMessagesStore.fetching}
        <div class="text-center mb-2 text-gray-bitdark text-sm font-bold">
            <Spinner size={16} />
        </div>
    {:else if $groupChatMessagesStore.error}
        <div class="text-center mb-2 text-red-700 text-sm font-bold">
            Error.
            <ButtonSmall
                tag="button"
                on:click={fetchMoreMessages}
                variant="TEXT"
                color="SECONDARY"
                className="text-sm mb-2">Try again</ButtonSmall
            >
        </div>
    {:else if $groupChatMessagesStore.data?.groupByUuid?.messagesByRecipientGroupId.pageInfo.hasPreviousPage}
        <div class="flex justify-center">
            <ButtonSmall
                tag="button"
                on:click={fetchMoreMessages}
                variant="TEXT"
                color="SECONDARY"
                className="text-sm mb-2">Get older messages</ButtonSmall
            >
        </div>
    {:else if $groupChatMessagesStore.data}
        <div class="flex items-center justify-center space-between mb-2 px-8">
            <hr class="w-full border-gray-bitlight" />
            <span
                class="px-4 text-gray-bitdark font-bold text-sm mx-auto whitespace-nowrap"
                >No older messages</span
            >
            <hr class="w-full border-gray-bitlight" />
        </div>
    {/if}
    {#each messages as message (message.uuid)}
        <Message
            uuid={message.uuid}
            userUuid={message.userUuid}
            time={message.time}
            text={message.text}
        />
        {#if previews[message.uuid]}
            {#each previews[message.uuid] as preview (preview.uuid)}
                <div class="message-preview">
                    <img
                        src={preview.url}
                        alt="Preview"
                        role="presentation"
                        class="cursor-pointer"
                        on:click={handleEnlargenImage(preview.url)}
                    />
                </div>
            {/each}
        {/if}
    {/each}
</div>

<style>
    .messages {
        @apply bg-white;
        @apply overflow-y-scroll;
        @apply py-2;
        @apply pr-2;
        @apply rounded-bl-lg;
        @apply rounded-br-lg;
    }

    .message-preview {
        padding-left: 4.5rem;

        @apply mb-3;
    }

    .message-preview img {
        max-height: 256px;
    }
</style>
