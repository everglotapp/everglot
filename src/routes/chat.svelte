<script lang="ts">
    import { getContext } from "svelte"
    import { stores as sapperStores } from "@sapper/app"
    import { fly, blur } from "svelte/transition"
    import { query } from "@urql/svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { validate as uuidValidate } from "uuid"

    import { ChevronLeftIcon, ChevronRightIcon } from "svelte-feather-icons"

    import Sidebar from "../comp/chat/Sidebar.svelte"
    import Header from "../comp/chat/Header.svelte"
    import SidePanel from "../comp/chat/SidePanel.svelte"
    import Messages from "../comp/chat/Messages.svelte"
    import BottomBar from "../comp/chat/BottomBar.svelte"
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
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"

    import { groupUuid } from "../stores"
    import { currentUserUuid, currentChatUserUuid } from "../stores/currentUser"
    import {
        showChatSidebarDrawer,
        groupChatStore,
        groupChatMessagesStore,
        fetchGroupMetadata,
        fetchGroupChatMessages,
        currentUserIsGroupMember,
    } from "../stores/chat"

    import {
        setCallUserMeta,
        removeUserFromCall,
        showSwitchCallModal,
    } from "../stores/call"

    import { makeChatMessagePreview } from "../types/chat"
    import type { ChatMessage, ChatMessagePreview } from "../types/chat"

    import { GroupActivityKind } from "../types/activities"
    import type { GroupActivity } from "../types/activities"
    import pannable, { Direction } from "./_helpers/pannable"
    import type { SwipeEvent } from "./_helpers/pannable"
    import App from "svelte-emoji-selector/examples/src/App.svelte"

    let messages: ChatMessage[] = []
    let previews: Record<ChatMessage["uuid"], ChatMessagePreview[]> = {}
    let currentActivity: GroupActivity | null = null
    let currentActivityGroupUuid: string | null = null

    const webrtc = getContext<WebrtcContext>(WEBRTC_CONTEXT)
    const {
        outgoing,
        remoteUsers,
        joinedRoom: joinedCallRoom,
        isInCall,
    } = webrtc
    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat, joinedRoom: joinedChatRoom } = chat

    const { page } = sapperStores()

    page.subscribe(({ query }) => {
        if (typeof window === "undefined") {
            /**
             * Prevent loading group data on server-side.
             */
            $groupUuid = null
            return
        }
        let { group } = query
        if (!group || !group.length) {
            $groupUuid = null
            return
        }
        group = group as string
        if (!uuidValidate(group)) {
            $groupUuid = null
            return
        }
        if ($joinedChatRoom === group) {
            /**
             * Fix edge case where a user leaves and immediately re-visits the same group's chat page.
             * We need to leave the room now and then re-join it (will be done below).
             */
            chat.leaveRoom()
        }
        $showSwitchCallModal = false
        $groupUuid = group
    })

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

        chat.switchRoom($groupUuid)
    }

    const ACTIVITY_KINDS_SUPPORTING_TEXT_INPUT: readonly GroupActivityKind[] = [
        GroupActivityKind.HANGMAN,
        GroupActivityKind.GUESS_CHARACTER,
    ] as const

    function handleWelcome({
        userUuid,
    }: {
        userUuid: string
        groupUuid: string
    }): void {
        $currentChatUserUuid = userUuid
    }

    function handleGroupActivity(activity: GroupActivity | null) {
        if (!$groupUuid || (activity && activity?.groupUuid !== $groupUuid)) {
            // They should always match and be known, something went wrong here.
            return
        }
        currentActivity = activity
        if ($groupUuid) {
            currentActivityGroupUuid = $groupUuid
        }
    }

    let messagesComponent: Messages

    const isOwnMessage = (message: ChatMessage) =>
        message.userUuid !== null &&
        $currentUserUuid !== null &&
        message.userUuid === $currentUserUuid

    function handleMessage(message: ChatMessage): void {
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
        previews = { ...previews, [messageUuid]: [{ uuid: "", url, type }] }
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
        if (!$currentUserUuid) {
            return false
        }
        if ($joinedCallRoom !== $groupUuid) {
            chat.emit("userLeaveCall", { groupUuid: $joinedCallRoom })
        }
        if (!(await webrtc.joinRoom($groupUuid, $currentUserUuid))) {
            // TODO: error
            // console.log("failed to join call")
            return false
        }
        chat.emit("userJoinCall", { groupUuid: $groupUuid })
        const callMeta = {
            micMuted: !mic,
            audioMuted: !audio,
        }
        setCallUserMeta($currentUserUuid, $groupUuid, callMeta)
        return true
    }

    async function handleLeaveCall(): Promise<boolean> {
        if (!$joinedCallRoom) {
            return false
        }
        const callRoom = $joinedCallRoom
        if (!(await webrtc.leaveRoom())) {
            // TODO: error
            // console.log("failed to leave call")
            return false
        }
        chat.emit("userLeaveCall", { groupUuid: callRoom })
        if ($currentUserUuid) {
            removeUserFromCall($currentUserUuid, callRoom)
        }
        return true
    }

    function handleToggleMic(): void {
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
            if ($currentUserUuid) {
                // TODO: what if this is not truthy?
                setCallUserMeta($currentUserUuid, $groupUuid, callMeta)
            }
        }
    }

    function handleToggleVoice(): void {
        if (!$currentUserIsGroupMember) {
            return
        }
        if (!$isInCall) {
            return
        }
        if ($joinedCallRoom === $groupUuid) {
            handleToggleMic()
        } else {
            $showSwitchCallModal = true
        }
    }

    function handleBeforeunload(): void {
        if ($joinedCallRoom) {
            chat.emit("userLeaveCall", { groupUuid: $joinedCallRoom })
        }
        chat.leaveRoom()
        chat.disconnect()
        webrtc.leaveRoom()
    }

    function handleVisibilityChange(): void {
        if (!document.hidden) {
            if (!$connectedToChat) {
                chat.connect()
            }
        }
    }

    let drawerWrapper: HTMLElement
    function handleSwipe(event: SwipeEvent) {
        if (
            $showChatSidebarDrawer &&
            event.detail.direction === Direction.LEFT
        ) {
            if (Math.abs(event.detail.dx) > 10) {
                $showChatSidebarDrawer = false
            }
        }
        if (
            !$showChatSidebarDrawer &&
            event.detail.direction === Direction.RIGHT
        ) {
            if (Math.abs(event.detail.dx) > 10 && event.detail.xBefore <= 160) {
                $showChatSidebarDrawer = true
            }
        }
        /*if (
            [Direction.LEFT, Direction.RIGHT].includes(event.detail.direction)
        ) {
            const transform =
                getComputedStyle(drawerWrapper).getPropertyValue("transform")
            const matrix = new DOMMatrixReadOnly(transform)
            const translate = {
                x: matrix.m41,
                y: matrix.m42,
            }
            drawerWrapper.style.setProperty(
                "transform",
                `translateX(calc(min(-60vw, ${
                    translate.x - event.detail.dx ** 1.2
                }px))`
            )
        }*/
    }
</script>

<Localized id="chat-browser-window-title" let:text>
    <BrowserTitle title={text} />
</Localized>

<svelte:window
    on:beforeunload={handleBeforeunload}
    on:visibilitychange={handleVisibilityChange}
/>

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
    {#if $showChatSidebarDrawer && typeof window !== "undefined"}
        <ClickAwayListener
            elementId="sidebar-drawer-click-catcher"
            on:clickaway={() => {}}
        />
        <div class="drawer-modal" />
    {/if}
    <div
        class="wrapper"
        use:pannable
        on:swipe={handleSwipe}
        class:show-sidebar-drawer={$showChatSidebarDrawer}
    >
        <div
            class="drawer-wrapper hidden md:flex relative"
            id="sidebar-drawer-click-catcher"
            bind:this={drawerWrapper}
        >
            <Sidebar
                {split}
                {audio}
                {mic}
                handleToggleSplit={() => (split = !split)}
                {handleToggleMic}
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
                        if ($currentUserUuid) {
                            setCallUserMeta(
                                $currentUserUuid,
                                $groupUuid,
                                callMeta
                            )
                        }
                    }
                }}
                {handleJoinCall}
                {handleLeaveCall}
            />
        </div>
        {#if $isInCall && $joinedCallRoom !== $groupUuid && $showSwitchCallModal}
            <Modal>
                <div
                    class="py-4 px-4 md:py-8 md:px-10 bg-white shadow-lg rounded-lg"
                >
                    <p class="mb-6 text-center">
                        <Localized id="chat-sidebar-switch-call-text" />
                    </p>
                    <div class="flex justify-end">
                        <ButtonSmall
                            tag="button"
                            on:click={() => ($showSwitchCallModal = false)}
                            variant="TEXT"
                            color="PRIMARY"
                            ><Localized
                                id="chat-sidebar-switch-call-cancel"
                            /></ButtonSmall
                        >
                        <ButtonSmall
                            tag="button"
                            on:click={async () => {
                                $showSwitchCallModal = false
                                handleJoinCall()
                            }}
                            ><Localized
                                id="chat-sidebar-switch-call-confirm"
                            /></ButtonSmall
                        >
                    </div>
                </div></Modal
            >
        {/if}
        <div class="section-wrapper">
            <section>
                <Header />
                <div class="views-wrapper">
                    <div
                        class="views"
                        class:split
                        class:mobile-games={!split}
                        class:mobile-chat={split}
                    >
                        <div
                            class="view view-left"
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
                                {#if $groupUuid !== null && currentActivityGroupUuid === $groupUuid}
                                    <SidePanel activity={currentActivity} />
                                {/if}
                                <BottomBar
                                    showMessageInput={$groupUuid !== null &&
                                        currentActivityGroupUuid ===
                                            $groupUuid &&
                                        currentActivity !== null &&
                                        ACTIVITY_KINDS_SUPPORTING_TEXT_INPUT.includes(
                                            currentActivity.kind
                                        )}
                                    {mic}
                                    gamesMode={!split}
                                    handleToggleGamesMode={() =>
                                        (split = !split)}
                                    {handleToggleVoice}
                                    {handleJoinCall}
                                    {handleLeaveCall}
                                    historySizeMax={0}
                                    historyCheckMax={0}
                                    className="sm:hidden"
                                />
                                <div
                                    class="toggle-split-screen"
                                    on:click={() => (split = false)}
                                >
                                    <div class="absolute" style="left: -1px;">
                                        <ChevronLeftIcon size="24" />
                                    </div>
                                    <div class="absolute" style="left: 5px;">
                                        <ChevronLeftIcon size="24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {#if !split}
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
                                        bind:this={messagesComponent}
                                        {handleEnlargenImage}
                                        {fetchMoreMessages}
                                        {isOwnMessage}
                                    />
                                    <BottomBar
                                        showMessageInput={true}
                                        {mic}
                                        gamesMode={!split}
                                        handleToggleGamesMode={() =>
                                            (split = !split)}
                                        {handleToggleVoice}
                                        {handleJoinCall}
                                        {handleLeaveCall}
                                        {isOwnMessage}
                                    />
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
                    style="max-width: 80vw; max-height: 90vh; box-shadow: 1px 1px 3px #393939, 1px 1px 9px #777; background: radial-gradient(circle at center, #fff 0, #fff 50%, #dcdcdc 100%);"
                />
            </div>
        </Modal>
    {/if}
{/if}

<style>
    .wrapper {
        width: 100%;
        height: 100%;

        @screen md {
            display: grid;
            grid-template-columns: 300px 1fr;
        }
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

        bottom: 50px;
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
        @apply hidden;
        @apply relative;
        @apply w-full;
        @apply h-full;
        @apply flex-col;
    }

    .views.split .view-left {
        @screen md {
            @apply flex;
        }
    }

    .views.mobile-games .view-left {
        @media (max-width: theme("screens.md")) {
            @apply flex;
        }
    }

    .views.mobile-chat .view-right {
        @media (max-width: theme("screens.md")) {
            @apply flex;
        }
    }

    .view-right,
    .views.split .view-right {
        @screen md {
            @apply flex;
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

        grid-template-rows: 1fr 50px;

        @screen sm {
            grid-template-rows: 1fr 0;
        }
    }

    .view-left-inner *:nth-child(2) {
        @screen sm {
            display: none;
        }
    }

    .view-right-inner {
        @apply px-3;
        @apply mx-auto;
        @apply overflow-x-hidden;

        max-width: 100%;
        grid-template-rows: 1fr 50px;
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
        @apply hidden;

        @screen md {
            @apply block;
        }
    }

    @media (max-width: theme("screens.md")) {
        .drawer-wrapper {
            @apply flex;
            @apply absolute;
            @apply z-20;

            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-60vw);
            transition: transform 100ms;
            background: white;
            max-width: 60vw;
        }

        .show-sidebar-drawer .drawer-wrapper {
            @apply shadow-lg;

            transform: translateX(0);
            width: 60vw;
        }

        .drawer-modal {
            @apply absolute;
            @apply left-0;
            @apply top-0;
            @apply right-0;
            @apply bottom-0;
            @apply z-20;
            @apply pointer-events-none;

            background: rgba(0, 0, 0, 0.2);
            height: 100vh;
            width: 100vw;
        }

        .show-sidebar-drawer .section-wrapper {
            @apply pointer-events-none;
        }
    }
</style>
