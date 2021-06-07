<script lang="ts">
    import { onDestroy, getContext } from "svelte"
    import { fly, blur } from "svelte/transition"
    import { query } from "@urql/svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import Sidebar from "../comp/chat/Sidebar.svelte"
    import Header from "../comp/chat/Header.svelte"
    import SidePanel from "../comp/chat/SidePanel.svelte"
    import Messages from "../comp/chat/Messages.svelte"
    import SubmitForm from "../comp/chat/SubmitForm.svelte"
    import { CHAT_CONTEXT } from "../comp/util/ChatProvider.svelte"
    import type { ChatContext } from "../comp/util/ChatProvider.svelte"
    import { WEBRTC_CONTEXT } from "../comp/util/WebrtcProvider.svelte"
    import type { WebrtcContext } from "../comp/util/WebrtcProvider.svelte"

    import BrowserTitle from "../comp/layout/BrowserTitle.svelte"
    import RedirectOnce from "../comp/layout/RedirectOnce.svelte"
    import ErrorMessage from "../comp/util/ErrorMessage.svelte"
    import EscapeKeyListener from "../comp/util/EscapeKeyListener.svelte"
    import ClickAwayListener from "../comp/util/ClickAwayListener.svelte"
    import Modal from "../comp/util/Modal.svelte"

    import { groupUuid } from "../stores"
    import {
        groupChatStore,
        groupChatMessagesStore,
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

    import type { GroupActivity } from "../types/activities"
    import type { Group, User } from "../types/generated/graphql"

    import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons"

    let messages: ChatMessage[] = []
    let previews: Record<ChatMessage["uuid"], ChatMessagePreview[]> = {}
    let lastSentMessage: ChatMessage | null = null
    let lastMessageSentAt: number | null = null
    let currentActivity: GroupActivity | null = null
    let currentActivityKnownForGroupUuid: Group["uuid"] | null = null

    const webrtc = getContext<WebrtcContext>(WEBRTC_CONTEXT)
    const { outgoing, remoteUsers, joinedRoom: joinedCallRoom } = webrtc
    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat, joinedRoom: joinedChatRoom } = chat

    let myUuid: User["uuid"] | null = null

    let fetchGroupMetadataInterval: number | null = null

    query(groupChatStore)
    query(groupChatMessagesStore)

    $: if (!$connectedToChat) {
        chat.connect()
        chat.off()
    }
    $: if ($connectedToChat) {
        chat.on("welcome", handleWelcome)
        chat.on("message", handleMessage)
        chat.on("messagePreview", handleMessagePreview)
        chat.on("groupActivity", handleGroupActivity)
    }
    $: if ($connectedToChat && $groupUuid) {
        chat.joinRoom($groupUuid)
    }

    onDestroy(() => {
        if (fetchGroupMetadataInterval) {
            clearInterval(fetchGroupMetadataInterval)
            fetchGroupMetadataInterval = null
        }
    })

    let messagesStartCursor: any = null
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

    $: if ($groupUuid && $connectedToChat && $joinedChatRoom !== $groupUuid) {
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
        user,
    }: {
        user: Pick<ChatUser["user"], "uuid">
        groupUuid: Group["uuid"]
    }): void {
        myUuid = user.uuid
    }

    function handleGroupActivity(activity: GroupActivity) {
        currentActivity = activity
        currentActivityKnownForGroupUuid = $groupUuid
    }

    let messagesComponent: Messages

    const isOwnMessage = (message: ChatMessage) =>
        message.userUuid !== null &&
        myUuid !== null &&
        message.userUuid === myUuid

    function handleMessage(message: ChatMessage): void {
        lastSentMessage = message
        lastMessageSentAt = Date.now()
        messages = [...messages, message]
    }

    function handleMessagePreview({
        messageUuid,
        url,
        type,
    }: {
        messageUuid: string
        url: string
        type: string
    }) {
        previews[messageUuid] = [{ uuid: "", url, type }]
    }

    let split = true
    let audio = true
    let mic = true
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
        if ($joinedCallRoom !== $groupUuid && chat) {
            chat.emit("userLeaveCall", { groupUuid: $joinedCallRoom })
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
        if (!$joinedCallRoom) {
            return false
        }
        if (!(await webrtc.leaveRoom())) {
            // TODO: error
            // console.log("failed to leave call")
            return false
        }
        if (chat) {
            chat.emit("userLeaveCall", { groupUuid: $joinedCallRoom })
            removeUserFromCall(myUuid, $joinedCallRoom)
        }
        return true
    }

    function handleBeforeunload() {
        if ($joinedCallRoom) {
            if (chat && chat.hasOwnProperty("emit")) {
                chat.emit("userLeaveCall", { groupUuid: $joinedCallRoom })
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
                <Header />
                <div class="views-wrapper">
                    <div class="views" class:split>
                        {#if split}
                            <div
                                class="view view-left hidden"
                                in:fly={{ duration: 200, x: -600 }}
                                out:fly={{ duration: 200, x: -600 }}
                                style="transform-origin: center left;"
                            >
                                <div
                                    class="view-inner view-left-inner"
                                    transition:blur|local={{
                                        duration: 300,
                                    }}
                                >
                                    {#if $groupUuid !== null && currentActivityKnownForGroupUuid === $groupUuid}
                                        <SidePanel activity={currentActivity} />
                                    {/if}
                                    <div
                                        class="toggle-split-screen"
                                        on:click={() => (split = false)}
                                    >
                                        <div
                                            class="absolute"
                                            style="left: -1px;"
                                        >
                                            <ChevronLeftIcon size="24" />
                                        </div>
                                        <div
                                            class="absolute"
                                            style="left: 5px;"
                                        >
                                            <ChevronLeftIcon size="24" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {:else}
                            <div
                                class="toggle-split-screen"
                                style="right: unset; left: -5px;"
                                on:click={() => (split = true)}
                            >
                                <div class="absolute" style="left: 1px;">
                                    <ChevronRightIcon size="24" />
                                </div>
                                <div class="absolute" style="left: 7px;">
                                    <ChevronRightIcon size="24" />
                                </div>
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
                                    <SubmitForm {isOwnMessage} />
                                </div>
                            {/key}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>

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

    .toggle-split-screen {
        width: 30px;
        height: 30px;
        position: absolute;
        right: -16px;
        top: 45%;
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

    @media (max-width: 700px) {
        .wrapper {
            display: block;
        }
    }
</style>
