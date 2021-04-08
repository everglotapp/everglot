<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { scale, fly, blur } from "svelte/transition"
    import { mutation, query } from "@urql/svelte"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"
    import type { Socket } from "socket.io"

    import Message from "../comp/chat/Message.svelte"
    import Sidebar from "../comp/chat/Sidebar.svelte"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"

    import type { ChatUser } from "../server/chat/users"
    import type { ChatMessage } from "../server/chat/messages"

    import { groupUuid } from "../stores"
    import {
        groupChatStore,
        groupChatMessagesStore,
        language,
        languageSkillLevel,
        groupName,
        currentUserIsGroupMember,
        currentGroupIsGlobal,
    } from "../stores/chat"
    import type {
        Group,
        User,
        JoinGlobalGroupMutation,
    } from "../types/generated/graphql"
    import { JoinGlobalGroup } from "../types/generated/graphql"

    import { ChevronsRightIcon } from "svelte-feather-icons"

    let messages: ChatMessage[] = []
    let myUuid: User["uuid"] | null = null
    let msg = ""

    let fetchGroupMetadataInterval: number | null = null

    query(groupChatStore)
    query(groupChatMessagesStore)

    const joinGlobalGroup = mutation<JoinGlobalGroupMutation>({
        query: JoinGlobalGroup,
    })

    $: if ($groupUuid && joinedRoom !== $groupUuid) {
        // console.log("Switching room", {
        //     oldRoom: joinedRoom,
        //     newRoom: $groupUuid,
        //     oldMessagesCount: messages.length,
        // })
        // Remove all messages from screen
        messages = []

        // Fetch group messages just once
        $groupChatMessagesStore.variables = { groupUuid: $groupUuid }
        fetchGroupChatMessages()

        // "Subscribe" to group metadata (name, language, members)
        $groupChatStore.variables = { groupUuid: $groupUuid }
        fetchGroupMetadata()
        if (fetchGroupMetadataInterval === null) {
            fetchGroupMetadataInterval = setInterval(fetchGroupMetadata, 30000)
        }

        leaveRoom()
        joinRoom($groupUuid)
    }

    function fetchGroupMetadata() {
        if (!$groupChatStore.variables?.groupUuid) {
            // console.log("Not fetching group metadata", $groupChat.variables)
            return
        }
        // console.log("Fetching group metadata", $groupChat.variables)
        $groupChatStore.context = {
            requestPolicy: "network-only",
            pause: true,
        }
        $groupChatStore.context = {
            requestPolicy: "network-only",
            pause: false,
        }
    }

    function fetchGroupChatMessages() {
        if (!$groupChatMessagesStore.variables?.groupUuid) {
            // console.log(
            //     "Not fetching group chat messages",
            //     $groupChatMessages.variables
            // )
            return
        }
        // console.log(
        //     "Fetching group chat messages",
        //     $groupChatMessages.variables
        // )
        $groupChatMessagesStore.context = {
            requestPolicy: "network-only",
            pause: true,
        }
        $groupChatMessagesStore.context = {
            requestPolicy: "network-only",
            pause: false,
        }
    }

    $: if (
        !$groupChatMessagesStore.fetching &&
        $groupChatMessagesStore.data &&
        !$groupChatMessagesStore.error
    ) {
        const { groupByUuid } = $groupChatMessagesStore.data
        const receivedMessages =
            groupByUuid?.messagesByRecipientGroupId?.nodes.filter(Boolean) || []
        if (receivedMessages.length) {
            $groupChatMessagesStore.context = {
                pause: true,
            }
            const existingUuids = messages.map(({ uuid }) => uuid)
            const messageIsNew = ({ uuid }: any) =>
                !existingUuids.includes(uuid)
            messages = [
                ...receivedMessages.filter(messageIsNew).map((message) => ({
                    text: message!.body,
                    time: message!.createdAt,
                    uuid: message!.uuid,
                    userUuid: message!.sender?.uuid || null,
                })),
                ...messages,
            ]
            if (typeof window !== "undefined") {
                getChatMessageContainers().forEach((container) =>
                    setTimeout(() => scrollToBottom(container, true), 150)
                )
            }
        }
    }

    onMount(() => {
        connect()
        if ($groupUuid) {
            joinRoom($groupUuid)
        }
    })

    onDestroy(() => {
        leaveRoom()
        if (socket) {
            socket.disconnect()
        }
        if (fetchGroupMetadataInterval) {
            clearInterval(fetchGroupMetadataInterval)
            fetchGroupMetadataInterval = null
        }
    })

    let socket: SocketIO.Socket | null = null
    let joinedRoom: string | null = null
    function connect() {
        if (socket || typeof window === "undefined") {
            return
        }
        // console.log("Connecting to chat")
        socket = io()
        if (socket) {
            // Welcome from server
            socket.on("welcome", onWelcome)
            // Message from server
            socket.on("message", onMessage)
        }
    }
    function joinRoom(room: string) {
        if (!socket) {
            return
        }
        if (!room || !room.length) {
            // console.log("Not joining empty room", { room })
            return
        }
        if (joinedRoom === room) {
            // console.log("Not joining room, already joined", { room })
            return
        }
        // console.log("Joining room", { room })
        socket.emit("joinRoom", {
            groupUuid: room,
        })
    }

    function leaveRoom(): boolean {
        if (!socket) {
            return false
        }
        if (joinedRoom === null) {
            return false
        }
        // console.log("Leaving room", { joinedRoom })
        socket.emit("leaveRoom")
        return true
    }

    function sendMessage(msg: string): boolean {
        if (!socket) {
            // console.log("Not sending", msg, "no socket")
            return false
        }
        // console.log("Sending", msg)
        socket.emit("chatMessage", msg)
        return true
    }

    const getChatMessageContainers = () =>
        Array.from(
            typeof document === "undefined"
                ? []
                : document.getElementsByClassName("messages")
        )

    function scrollToBottom(container: Element, force: boolean = false): void {
        if (!isScrolledToBottom(container) && !force) {
            return
        }
        scroll(container)
    }

    /**
     * This function will set the scrollTop of an element using either the
     * scroll method if available, or by changing the scrollTop property.
     * If no scrollTop is specified, it'll scroll to the bottom.
     * src: https://github.com/theomessin/vue-chat-scroll/blob/8a68a271fecaffad43d25300ca192e0ada88100b/src/scroll.ts
     */
    const scroll = (el: Element, scrollTop?: number): void => {
        const top = scrollTop || el.scrollHeight - el.clientHeight
        if (typeof el.scroll === "function") {
            el.scroll({ top })
        } else {
            el.scrollTop = top
        }
    }

    /**
     * Whether the element is scrolled to the specified position.
     * @param scrollTop Position to check against, bottom if null.
     */
    const isScrolled = (el: Element, scrollTop: number | null): boolean => {
        const top = scrollTop || el.scrollHeight - el.clientHeight
        return el.scrollTop === top
    }

    const isScrolledToBottom = (container: Element): boolean => {
        return isScrolled(container, null)
    }

    function onWelcome({
        user,
        groupUuid,
    }: {
        user: Pick<ChatUser["user"], "uuid">
        groupUuid: Group["uuid"]
    }): void {
        joinedRoom = groupUuid
        myUuid = user.uuid
        // console.log("Successfully joined chat", { joinedRoom, myUuid })
    }

    function handleSendMessage(): void {
        const element = document.getElementById("send-msg-input")
        if (element) {
            element.focus()
        }

        const trimmedMsg = msg.trim()

        if (!trimmedMsg) {
            msg = ""
            return
        } else {
            // TODO: do this only if message was sent successfully.
            msg = ""
        }
        sendMessage(trimmedMsg)
    }

    function onMessage(message: ChatMessage): void {
        getChatMessageContainers().forEach((container) => {
            const isOwnMessage =
                message.userUuid !== null &&
                myUuid !== null &&
                message.userUuid === myUuid
            /**
             * Force auto-scroll if the user sent the message themselves
             * or if the user didn't scroll upwards before receiving the message.
             */
            const force = isOwnMessage || isScrolledToBottom(container)

            setTimeout(() => scrollToBottom(container, force), 150)
        })
        messages = [...messages, message]
    }

    let split = true
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="wrapper">
    {#key $groupUuid}
        <Sidebar {split} handleToggleSplit={() => (split = !split)} />
    {/key}
    <div class="section-wrapper">
        <section>
            <header>
                {#key $groupUuid}
                    {#if !$groupChatStore.fetching && $groupChatStore.data}
                        <span class="text-xl py-2">{$groupName || ""}</span>
                        <div
                            class="inline"
                            style="min-width: 5px; margin: 0 1rem; height: 42px; border-left: 1px solid white; border-right: 1px solid white;"
                        />
                        <span
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
                                    transition:blur|local={{ duration: 300 }}
                                >
                                    <div
                                        class="flex flex-row bg-gray-light max-h-12 px-2 items-center"
                                    >
                                        <div
                                            class="text-lg py-1 px-3 bg-primary text-white rounded-tl-md rounded-tr-md"
                                        >
                                            Games
                                        </div>
                                        <div class="text-lg py-1 px-3">
                                            Subtitles
                                        </div>
                                    </div>
                                </div>
                            {/key}
                        </div>
                    {/if}
                    <div class="view view-right rounded-tr-md">
                        {#key $groupUuid}
                            <div
                                class="view-inner view-right-inner"
                                transition:blur|local={{ duration: 400 }}
                            >
                                <div class="messages">
                                    {#each messages as message (message.uuid)}
                                        <Message
                                            uuid={message.uuid}
                                            userUuid={message.userUuid}
                                            time={message.time}
                                            text={message.text}
                                        />
                                    {/each}
                                </div>
                                <div
                                    class="submit-form-container rounded-bl-md rounded-br-md"
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
                                                        fetchGroupMetadata()
                                                    } else {
                                                        // TODO: Show error feedback
                                                    }
                                                }}>Join group</ButtonLarge
                                            >
                                        {:else if joinedRoom}
                                            <input
                                                id="send-msg-input"
                                                type="text"
                                                placeholder="Enter text message …"
                                                required
                                                autocomplete="off"
                                                class="border-none shadow-md px-4 py-4 w-full rounded-md"
                                                bind:value={msg}
                                                in:scale={{ duration: 200 }}
                                            />
                                            <ButtonSmall
                                                className="ml-4 px-6"
                                                tag="button"
                                                on:click={handleSendMessage}
                                                >Send<ChevronsRightIcon
                                                    size="24"
                                                    class="ml-1"
                                                /></ButtonSmall
                                            >
                                        {:else}
                                            <div
                                                class="w-full h-full font-bold text-center text-lg text-gray-bitdark"
                                            >
                                                Connecting …
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

    .view-right-inner {
        @apply px-3;

        grid-template-rows: 1fr 94px;
    }

    .views.split .view-right-inner {
        @apply px-0;
    }

    .messages {
        @apply overflow-y-scroll;
        @apply py-2;
        @apply pr-2;
    }

    .submit-form-container {
        padding: 18px 30px;

        @apply bg-gray-lightest;
        @apply absolute;
        @apply bottom-0;
        @apply left-0;
        @apply right-0;
    }

    .submit-form-container form {
        display: flex;
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
