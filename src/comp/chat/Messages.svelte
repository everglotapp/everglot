<script lang="ts">
    import { onMount, getContext, beforeUpdate, afterUpdate } from "svelte"

    import Message from "./Message.svelte"
    import MessagePreview from "./MessagePreview.svelte"
    import ButtonSmall from "../util/ButtonSmall.svelte"
    import Spinner from "../util/Spinner.svelte"
    import { CHAT_CONTEXT } from "../util/ChatProvider.svelte"
    import type { ChatContext } from "../util/ChatProvider.svelte"
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

    const { lastSentMessage, lastMessageSentAt } =
        getContext<ChatContext>(CHAT_CONTEXT)

    let latestSentMessageHandledAt: number = Date.now()
    let scrollFunction: Function | null = null
    let previouslyScrolledToBottom: boolean = true
    let previousScrollHeight: number | null = null
    let oldMessageUuids: string[] = []
    let oldPreviewUuids: string[] = []
    let forceScrollByPx: number = 0

    $: {
        messages // dependency
        previews // dependency

        // console.log("Got new messages or previews", {
        //     scrolledToBottomBeforeRender,
        // })
        const newMessageUuids = messages.map((message) => message.uuid)
        const newPreviewUuids = newMessageUuids.reduce((uuids, messageUuid) => {
            if (typeof previews[messageUuid] === "undefined") {
                return uuids
            }
            previews[messageUuid].forEach((preview) => {
                uuids.push(preview.uuid)
            })
            return uuids
        }, [] as string[])
        const anythingInsertedAtTop =
            (newMessageUuids.length > oldMessageUuids.length &&
                oldMessageUuids.some(
                    (oldUuid, i) => oldUuid !== newMessageUuids[i]
                )) ||
            (newPreviewUuids.length > oldPreviewUuids.length &&
                oldPreviewUuids.some(
                    (oldUuid, i) => oldUuid !== newPreviewUuids[i]
                ))

        const adjustScrollPosition = () => {
            if (!messagesContainer) {
                // console.log("No messages container")
                return
            }
            const handlingLatestSentMessage =
                !!$lastSentMessage &&
                !!$lastMessageSentAt &&
                $lastMessageSentAt > latestSentMessageHandledAt
            // console.log("Adjusting scroll position", {
            //     handlingLatestSentMessage,
            //     latestSentMessageHandledAt,
            //     scrolledToBottomBeforeRender,
            //     scrollHeightBeforeRender,
            //     anythingInsertedAtTop,
            //     newMessageUuidsLength: newMessageUuids.length,
            //     newPreviewUuidsLength: newPreviewUuids.length,
            //     oldMessageUuidsLength: oldMessageUuids.length,
            //     oldPreviewUuidsLength: oldPreviewUuids.length,
            //     lastMessageSentAt: $lastMessageSentAt,
            //     lastSentMessage: $lastSentMessage,
            // })
            let forceBottom: boolean = previouslyScrolledToBottom
            if (handlingLatestSentMessage) {
                /**
                 * Force auto-scroll if the user sent the message themselves
                 * or if the user didn't scroll upwards before receiving the message.
                 */
                forceBottom ||= isOwnMessage($lastSentMessage!)
                // console.log("Handling latest sent message", {
                //     forceBottom,
                //     isOwn: isOwnMessage($lastSentMessage!),
                // })
                latestSentMessageHandledAt = Date.now()
            }
            if (previousScrollHeight === null) {
                // console.log("No previous height, forcing bottom")
                forceBottom = true
            } else if (!forceBottom) {
                if (anythingInsertedAtTop) {
                    // Reset scroll position that changed due to new messages or previews being inserted at the top.
                    const heightDifference =
                        messagesContainer.scrollHeight - previousScrollHeight
                    // console.log("Resetting scroll position", {
                    //     heightDifference,
                    //     scrollHeight: messagesContainer.scrollHeight,
                    //     scrollTop: messagesContainer.scrollTop,
                    // })
                    if (heightDifference > 0) {
                        messagesContainer.scrollTop += heightDifference
                    }
                }
            }
            // console.log("Attempting scroll to bottom", { forceBottom })
            scrollToBottom(messagesContainer, forceBottom)
        }
        scrollFunction = adjustScrollPosition
        oldMessageUuids = newMessageUuids
        oldPreviewUuids = newPreviewUuids
    }

    $: if (messagesContainer && forceScrollByPx > 0) {
        messagesContainer.scrollTop += forceScrollByPx
        forceScrollByPx = 0
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

        previouslyScrolledToBottom = isScrolledToBottom(container)
        previousScrollHeight = container.scrollHeight
    }

    onMount(() => {
        latestSentMessageHandledAt = Date.now()
        setTimeout(() => {
            if (messagesContainer) {
                scrollToBottom(messagesContainer)
            }
        }, 150)
    })

    beforeUpdate(() => {
        if (messagesContainer) {
            previouslyScrolledToBottom = isScrolledToBottom(messagesContainer)
            previousScrollHeight = messagesContainer.scrollHeight
        } else {
            previousScrollHeight = null
        }
    })

    afterUpdate(() => {
        if (scrollFunction !== null) {
            scrollFunction()
            scrollFunction = null
        }
    })

    const handlePreviewImageLoaded = (event: Event) => {
        const element = event.currentTarget as HTMLElement | null
        if (!element || typeof window === "undefined") {
            return
        }
        const container = element.parentElement! as HTMLElement
        const computedStyle = window.getComputedStyle(container)
        forceScrollByPx +=
            container.clientHeight +
            parseInt(computedStyle.marginTop) +
            parseInt(computedStyle.marginBottom)
    }

    $: hasEarlierMessages =
        $groupChatMessagesStore.data?.groupByUuid?.messagesByRecipientGroupId
            .pageInfo.hasPreviousPage

    function handleWindowResize() {
        if (messagesContainer && previouslyScrolledToBottom) {
            scrollToBottom(messagesContainer, true)
        }
    }
</script>

<svelte:window on:resize={handleWindowResize} />
<div class="wrapper" on:scroll={handleScroll} bind:this={messagesContainer}>
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
                color="PRIMARY"
                className="text-sm mb-2">Try again</ButtonSmall
            >
        </div>
    {:else if hasEarlierMessages}
        <div class="flex justify-center">
            <ButtonSmall
                tag="button"
                on:click={fetchMoreMessages}
                variant="TEXT"
                color="PRIMARY"
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
        {#if typeof previews[message.uuid] !== "undefined"}
            {#each previews[message.uuid] as preview (preview.uuid)}
                <MessagePreview
                    url={preview.url}
                    on:click={handleEnlargenImage(preview.url)}
                    on:load={handlePreviewImageLoaded}
                />
            {/each}
        {/if}
    {/each}
</div>

<style>
    .wrapper {
        @apply bg-white;
        @apply overflow-y-scroll;
        @apply py-2;
        @apply pr-2;
        @apply rounded-bl-lg;
        @apply rounded-br-lg;
    }
</style>
