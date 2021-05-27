<script lang="ts">
    import { onDestroy, getContext } from "svelte"
    import { scale, fly, blur } from "svelte/transition"
    import { mutation, query } from "@urql/svelte"

    import EmojiSelector from "svelte-emoji-selector"

    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ChatProvider from "./_helpers/chat/ChatProvider.svelte"

    import Messages from "../comp/chat/Messages.svelte"
    import Sidebar from "../comp/chat/Sidebar.svelte"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import EscapeKeyListener from "../comp/util/EscapeKeyListener.svelte"
    import ClickAwayListener from "../comp/util/ClickAwayListener.svelte"
    import Modal from "../comp/util/Modal.svelte"

    import { groupUuid } from "../stores"
    import {
        groupChatStore,
        groupChatMessagesStore,
        language,
        languageSkillLevel,
        groupName,
        currentUserIsGroupMember,
        currentGroupIsGlobal,
        fetchGroupMetadata,
        fetchGroupChatMessages,
    } from "../stores/chat"

    import { setCallUserMeta, removeUserFromCall } from "../stores/call"

    import { makeChatMessagePreview } from "../types/chat"
    import type {
        ChatUser,
        ChatMessage,
        ChatMessagePreview,
    } from "../types/chat"
    import type {
        User,
        JoinGlobalGroupMutation,
        Maybe,
    } from "../types/generated/graphql"
    import { JoinGlobalGroup } from "../types/generated/graphql"

    import { ChevronLeftIcon, ChevronsRightIcon } from "svelte-feather-icons"

    let chat: ChatProvider | undefined

    let messages: ChatMessage[] = []
    let previews: Record<ChatMessage["uuid"], ChatMessagePreview[]> = {}
    let lastSentMessage: ChatMessage | null
    let lastMessageSentAt: number | null

    const webrtc = getContext("WEBRTC")
    const { outgoing, remoteUsers, joinedRoom } = webrtc

    let myUuid: User["uuid"] | null = null
    let msg = ""

    let fetchGroupMetadataInterval: number | null = null

    query(groupChatStore)
    query(groupChatMessagesStore)

    $: if (chat) {
        chat.connect()
        if ($groupUuid) {
            chat.joinRoom($groupUuid)
        }
    }

    onDestroy(() => {
        if (fetchGroupMetadataInterval) {
            clearInterval(fetchGroupMetadataInterval)
            fetchGroupMetadataInterval = null
        }
    })

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })

    let messagesStartCursor = null
    const fetchMoreMessages = () => {
        if (!$groupUuid) {
            return
        }
        fetchGroupChatMessages({
            groupUuid: $groupUuid,
            before: messagesStartCursor,
        })
    }

    $: if (
        $groupChatMessagesStore.data &&
        !$groupChatMessagesStore.error &&
        !$groupChatMessagesStore.fetching
    ) {
        const { groupByUuid } = $groupChatMessagesStore.data
        const receivedMessages =
            groupByUuid?.messagesByRecipientGroupId?.edges
                .filter(Boolean)
                .map((edge) => edge!.node) || []
        messagesStartCursor =
            groupByUuid?.messagesByRecipientGroupId.pageInfo.startCursor || null

        groupByUuid?.messagesByRecipientGroupId?.b
        if (receivedMessages.length) {
            const messageIsNew = ({ uuid }: any) => {
                for (let i = messages.length - 1; i >= 0; --i) {
                    if (messages[i].uuid === uuid) {
                        return false
                    }
                }
                return true
            }
            const newMessages = receivedMessages.filter(messageIsNew)
            if (newMessages.length) {
                messages = [
                    ...newMessages.map((message) => ({
                        text: message!.body,
                        time: message!.createdAt,
                        uuid: message!.uuid,
                        userUuid: message!.sender?.uuid || null,
                    })),
                    ...messages,
                ]
                previews = {
                    ...previews,
                    ...Object.fromEntries(
                        newMessages
                            .filter(Boolean)
                            .map((message) => [
                                message!.uuid,
                                message!.messagePreviews.nodes
                                    .filter(Boolean)
                                    .map((node) =>
                                        makeChatMessagePreview(
                                            node!.uuid,
                                            node!.filename,
                                            node!.extension || undefined
                                        )
                                    ),
                            ])
                    ),
                }
            }
        }
    }

    $: if ($groupUuid && chat && chat.currentRoom() !== $groupUuid) {
        // console.log("Switching room", {
        //     oldRoom: joinedRoom,
        //     newRoom: $groupUuid,
        //     oldMessagesCount: messages.length,
        // })
        // Remove all messages from screen
        messages = []
        previews = {}
        // make sure that all messages are fetched
        messagesStartCursor = null

        fetchMoreMessages()
        fetchGroupMetadata({ groupUuid: $groupUuid })

        if (fetchGroupMetadataInterval === null) {
            const FETCH_GROUP_METADATA_INTERVAL_SECS = 30
            fetchGroupMetadataInterval = setInterval(
                () => fetchGroupMetadata({ groupUuid: $groupUuid }),
                FETCH_GROUP_METADATA_INTERVAL_SECS * 1000
            )
        }

        chat.leaveRoom()
        chat.joinRoom($groupUuid)
    }

    function handleWelcome({
        detail: { user },
    }: CustomEvent<{
        user: Pick<ChatUser["user"], "uuid">
    }>): void {
        myUuid = user.uuid
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
        const sent = chat!.sendMessage(trimmedMsg)
        if (sent) {
            msg = ""
        }
    }

    let messagesComponent: Messages

    const isOwnMessage = (message: ChatMessage) =>
        message.userUuid !== null &&
        myUuid !== null &&
        message.userUuid === myUuid
    function handleMessage({
        detail: message,
    }: CustomEvent<ChatMessage>): void {
        lastSentMessage = message
        lastMessageSentAt = Date.now()
        messages = [...messages, message]
    }

    function handleMessagePreview({
        detail: { messageUuid, url, type },
    }: CustomEvent<{
        messageUuid: string
        url: string
        type: string
    }>) {
        previews[messageUuid] = [{ uuid: "", url, type }]
    }

    let split = true
    let audio = true
    let mic = true

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
    let showLargeImageModalUrl: string | null = null
    function handleEnlargenImage(url: string) {
        return (event: MouseEvent) => {
            event.stopPropagation()
            showLargeImageModalUrl = url
        }
    }

    async function handleJoinCall(): Promise<boolean> {
        if (!$groupUuid) {
            return false
        }
        if ($joinedRoom !== $groupUuid && chat) {
            chat.emit("userLeaveCall", { groupUuid: $joinedRoom })
        }
        if (!(await webrtc.joinRoom($groupUuid, myUuid))) {
            // TODO: error
            console.log("failed to join call")
            return false
        }
        if (chat) {
            chat.emit("userJoinCall", { groupUuid: $groupUuid })
            const callMeta = {
                micMuted: !mic,
                audioMuted: !audio,
            }
            setCallUserMeta(myUuid, $groupUuid, callMeta)
        }
        return true
    }

    async function handleLeaveCall(): Promise<boolean> {
        if (!$groupUuid) {
            return false
        }
        if (!(await webrtc.leaveRoom())) {
            // TODO: error
            console.log("failed to leave call")
            return false
        }
        if (chat) {
            chat.emit("userLeaveCall", { groupUuid: $groupUuid })
            removeUserFromCall(myUuid, $groupUuid)
        }
        return true
    }

    function handleBeforeunload() {
        if ($groupUuid) {
            if (chat && chat.hasOwnProperty("emit")) {
                chat.emit("userLeaveCall", { groupUuid: $groupUuid })
            }
        }
        if (chat) {
            chat.leaveRoom()
            chat.disconnect()
        }
        webrtc.leaveRoom()
    }
</script>

<Localized id="chat-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<svelte:window on:beforeunload={handleBeforeunload} />

{#if !$groupChatStore.stale && $groupChatStore.error}
    <div class="container max-w-sm my-8">
        <ErrorMessage
            >Something went wrong while loading the chat. Maybe try reloading
            this page.</ErrorMessage
        >
    </div>
{:else}
    {#if $groupUuid && !$groupChatStore.error && $groupChatStore.data && !$groupChatStore.data.groupByUuid}
        <RedirectOnce to="/" />
    {/if}
    <ChatProvider
        bind:this={chat}
        on:welcome={handleWelcome}
        on:message={handleMessage}
        on:messagePreview={handleMessagePreview}
        let:currentRoom
    >
        <div class="wrapper">
            <Sidebar
                {split}
                {audio}
                {mic}
                handleToggleSplit={() => (split = !split)}
                handleToggleMic={() => {
                    if (!$outgoing) {
                        return
                    }
                    mic = !mic
                    if (mic) {
                        $outgoing.setVolume(100)
                    } else {
                        $outgoing.setVolume(0)
                    }
                    if (chat && $groupUuid) {
                        const callMeta = {
                            micMuted: !mic,
                            audioMuted: !audio,
                        }
                        chat.emit("userCallMeta", {
                            groupUuid: $groupUuid,
                            callMeta,
                        })
                        setCallUserMeta(myUuid, $groupUuid, callMeta)
                    }
                }}
                handleToggleAudio={() => {
                    audio = !audio
                    for (const remoteUser of $remoteUsers) {
                        const { audioTrack } = remoteUser
                        if (!audioTrack) {
                            continue
                        }
                        if (audio) {
                            audioTrack.setVolume(100)
                        } else {
                            audioTrack.setVolume(0)
                        }
                    }
                    if (chat && $groupUuid) {
                        const callMeta = {
                            micMuted: !mic,
                            audioMuted: !audio,
                        }
                        chat.emit("userCallMeta", {
                            groupUuid: $groupUuid,
                            callMeta,
                        })
                        setCallUserMeta(myUuid, $groupUuid, callMeta)
                    }
                }}
                {handleJoinCall}
                {handleLeaveCall}
            />
            <div class="section-wrapper">
                <section>
                    <header>
                        {#key $groupUuid}
                            {#if $groupChatStore.data && !$groupChatStore.error}
                                <span
                                    class="text-xl py-2 font-bold text-gray-lightest"
                                    >{$groupName || ""}</span
                                >
                                <div
                                    class="inline"
                                    style="min-width: 5px; margin: 0 1rem; height: 42px; border-left: 1px solid white; border-right: 1px solid white;"
                                />
                                <span class="text-xl py-2"
                                    >{$language?.englishName || ""}
                                    {$languageSkillLevel?.name || ""}</span
                                >
                            {:else if $groupChatStore.error}
                                error
                            {/if}
                        {/key}
                    </header>
                    <div class="views-wrapper">
                        <div class="views" class:split>
                            {#if split}
                                <div
                                    class="view view-left hidden"
                                    in:fly={{ duration: 200, x: -600 }}
                                    out:fly={{ duration: 200, x: -600 }}
                                    style="transform-origin: center left;"
                                >
                                    {#key $groupUuid}
                                        <div
                                            class="view-inner view-left-inner px-3"
                                            transition:blur|local={{
                                                duration: 300,
                                            }}
                                        >
                                            <div
                                                class="flex flex-row bg-gray-light max-h-12 px-2 items-center"
                                            >
                                                <div
                                                    class="text-lg py-1 px-3 bg-primary text-white rounded-tl-md rounded-tr-md"
                                                >
                                                    <Localized
                                                        id="chat-panel-games"
                                                    />
                                                </div>
                                                <div class="text-lg py-1 px-3">
                                                    <Localized
                                                        id="chat-panel-subtitles"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="toggle-split-screen"
                                                on:click={() => (split = false)}
                                            >
                                                <ChevronLeftIcon size="24" />
                                            </div>
                                        </div>
                                    {/key}
                                </div>
                            {/if}
                            <div class="view view-right rounded-tr-md">
                                {#key $groupUuid}
                                    <div
                                        class="view-inner view-right-inner"
                                        transition:blur|local={{
                                            duration: 400,
                                        }}
                                    >
                                        <Messages
                                            {messages}
                                            {previews}
                                            {lastSentMessage}
                                            {lastMessageSentAt}
                                            bind:this={messagesComponent}
                                            {handleEnlargenImage}
                                            {fetchMoreMessages}
                                            {isOwnMessage}
                                        />
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
                                                            const res = await joinGlobalGroup(
                                                                {
                                                                    groupUuid: $groupUuid,
                                                                }
                                                            )
                                                            if (res.data) {
                                                                fetchGroupMetadata(
                                                                    {
                                                                        groupUuid: $groupUuid,
                                                                    }
                                                                )
                                                            } else {
                                                                // TODO: Show error feedback
                                                            }
                                                        }}
                                                        ><Localized
                                                            id="chat-submit-form-join-group"
                                                        />
                                                    </ButtonLarge>
                                                {:else if currentRoom}
                                                    <Localized
                                                        id="chat-submit-form-input"
                                                        let:attrs
                                                    >
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
                                                        <span
                                                            class="hidden md:inline"
                                                        >
                                                            <EmojiSelector
                                                                on:emoji={handleEmoji}
                                                            />
                                                        </span>
                                                    </Localized>
                                                    <ButtonSmall
                                                        className="send-msg-button"
                                                        tag="button"
                                                        variant="TEXT"
                                                        color="SECONDARY"
                                                        on:click={handleSendMessage}
                                                        ><ChevronsRightIcon
                                                            size="28"
                                                        /></ButtonSmall
                                                    >
                                                {:else}
                                                    <div
                                                        class="w-full h-full font-bold text-center text-lg text-gray-bitdark"
                                                    >
                                                        <Localized
                                                            id="chat-submit-form-connecting"
                                                        />
                                                    </div>
                                                {/if}
                                            </form>
                                        </div>
                                    </div>
                                {/key}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </ChatProvider>

    {#if showLargeImageModalUrl && typeof window !== "undefined"}
        <EscapeKeyListener on:keydown={() => (showLargeImageModalUrl = null)} />
        <ClickAwayListener
            elementId="large-image-view"
            on:clickaway={() => (showLargeImageModalUrl = null)}
        />
        <Modal>
            <div
                class="grid place-items-center w-full h-full"
                id="large-image-view"
            >
                <img
                    src={showLargeImageModalUrl}
                    alt="Enlargened"
                    role="presentation"
                    style="max-width: 80vw; max-height: 90vh; box-shadow: 1px 1px 3px #393939, 1px 1px 9px #777;"
                />
            </div>
        </Modal>
    {/if}
{/if}

<style>
    .wrapper {
        display: grid;
        grid-template-columns: 300px 1fr;
        width: 100%;
        height: 100%;
    }

    .section-wrapper {
        @apply relative;
        @apply w-full;
        @apply h-full;
        @apply flex;
        @apply flex-col;
        @apply overflow-hidden;
    }

    section {
        @apply absolute;
        @apply left-0;
        @apply right-0;
        @apply top-0;
        @apply grid;
        @apply h-full;

        bottom: 94px;
        grid-template-rows: 0 1fr;

        @apply px-3;

        @screen md {
            grid-template-rows: 70px 1fr;

            @apply bottom-0;
            @apply p-0;
        }
    }

    header {
        @apply relative;
        @apply w-full;
        @apply flex;
        @apply items-center;
        @apply bg-primary;
        @apply text-white;
        @apply shadow-sm;
        @apply p-0;

        @screen md {
            @apply py-4;
            @apply px-8;
        }
    }

    .views-wrapper {
        @apply relative;
        @apply w-full;
        @apply h-full;
        @apply flex;
        @apply flex-col;
    }

    .views {
        @apply absolute;
        @apply left-0;
        @apply right-0;
        @apply top-0;
        @apply bottom-0;
        @apply h-full;
        @apply max-h-full;
        @apply grid;

        grid-template-columns: 1fr;
    }

    .views.split {
        @screen md {
            grid-template-columns: 1fr 1fr;
        }
    }

    .view {
        @apply relative;
        @apply w-full;
        @apply h-full;
        @apply flex;
        @apply flex-col;
    }

    .view-left {
        @apply hidden;

        @screen md {
            @apply block;
        }
    }

    .view-inner {
        @apply grid;
        @apply absolute;
        @apply left-0;
        @apply right-0;
        @apply top-0;
        @apply bottom-0;
        @apply max-h-full;
        @apply h-full;
    }

    .view-left-inner {
        @apply border-r;
        @apply border-gray-lightest;
    }

    .view-right-inner {
        @apply px-3;
        @apply mx-auto;
        @apply overflow-x-hidden;

        max-width: 100%;
        grid-template-rows: 1fr 94px;
    }

    .views.split .view-right-inner {
        @apply px-0;
    }

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

    .toggle-split-screen {
        width: 30px;
        height: 30px;
        border: 2px solid theme("colors.primary.DEFAULT");
        position: absolute;
        right: -16px;
        top: 0.5rem;
        border-radius: 50%;

        @apply flex;
        @apply justify-center;
        @apply items-center;
        @apply font-bold;
        @apply text-lg;
        @apply text-primary;
        @apply cursor-pointer;
        @apply bg-gray-lightest;
        @apply z-10;
    }

    .toggle-split-screen > :global(svg) {
        margin-left: -2px;
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
        .wrapper {
            display: block;
        }

        .submit-form-container {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
