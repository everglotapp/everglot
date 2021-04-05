<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { scale, slide } from "svelte/transition"
    import { query, operationStore } from "@urql/svelte"

    import { room } from "../stores"
    import Message from "../comp/chat/Message.svelte"
    import Sidebar from "../comp/chat/Sidebar.svelte"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"

    import type { ChatUser } from "../server/chat/users"
    import type { ChatMessage } from "../server/chat/messages"
    import { ChatUsers } from "../types/generated/graphql"
    import type {
        Language,
        User,
        ChatUsersQuery,
        ChatUsersQueryVariables,
    } from "../types/generated/graphql"

    import { ChevronsRightIcon } from "svelte-feather-icons"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    let socket: SocketIO.Socket | null = null

    let messages: ChatMessage[] = []
    let users: (Pick<ChatUser["user"], "uuid" | "username" | "avatarUrl"> & {
        username: string
    })[] = []
    let myUuid: User["uuid"] | null = null
    let msg: string = ""

    let updateInterval: number | null = null

    const chatUsersStore = operationStore<
        ChatUsersQuery,
        ChatUsersQueryVariables
    >(
        ChatUsers,
        {
            groupUuid: "",
        },
        { pause: true }
    )
    query(chatUsersStore)

    $: chatUsers =
        chatUsersStore && !$chatUsersStore.fetching && !$chatUsersStore.error
            ? $chatUsersStore.data?.groupByUuid
                  ?.usersByGroupUserGroupIdAndUserId?.nodes || []
            : []

    // TODO: Check if user is signed in, if not redirect to sign in.
    function subscribe(): void {
        if (!socket) {
            return
        }

        // Join chatroom
        socket.emit("joinRoom", {
            room: $room,
        })

        // Welcome from server
        socket.on("welcome", onWelcome)
        // Get room and users
        socket.on("roomUsers", onRoomUsers)
        // Message from server
        socket.on("message", onMessage)
    }

    function unsubscribe(): void {
        if (!socket) {
            return
        }
        socket.off("roomUsers", onRoomUsers)
        socket.off("message", onMessage)
    }

    // TODO: Read user data from database.
    onMount(() => {
        const lang = new URL(window.location.href).searchParams.get("lang")
        if (lang && ["English", "German", "Chinese"].includes(lang)) {
            $room = lang
        }

        const groupUuid = new URL(window.location.href).searchParams.get(
            "group"
        )
        if (groupUuid && groupUuid.length) {
            $chatUsersStore.variables!.groupUuid = groupUuid
            $chatUsersStore.context!.pause = false
            let pause = false
            updateInterval = setInterval(() => {
                pause = !pause
                $chatUsersStore.context = {
                    requestPolicy: "network-only",
                    pause,
                }
            }, 5000)
        }

        socket = io()
        if (!socket) {
            return
        }
        subscribe()
    })

    onDestroy(() => {
        if (!socket) {
            return
        }
        unsubscribe()
        socket.emit("leaveRoom")
        socket = null
        if (updateInterval) {
            clearInterval(updateInterval)
            updateInterval = null
        }
    })

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
    }: {
        user: Pick<ChatUser["user"], "uuid">
    }): void {
        myUuid = user.uuid
    }

    function onSend(): void {
        const trimmedMsg = msg.trim()

        if (!trimmedMsg) {
            msg = ""
            return
        } else {
            // TODO: do this only if message was sent successfully.
            msg = ""
        }

        socket?.emit("chatMessage", trimmedMsg)
    }

    /**
     * Called after joining a chat when the server sends the room's users.
     */
    function onRoomUsers({
        room: recvRoom,
        users: recvUsers,
    }: {
        room: Language["englishName"]
        users: Pick<ChatUser["user"], "username" | "uuid" | "avatarUrl">[]
    }): void {
        if (recvRoom !== $room) {
            return
        }
        users = [
            ...recvUsers.map((user) => ({
                ...user,
                username: user.username!,
            })),
        ]
        getChatMessageContainers().forEach((container) =>
            scrollToBottom(container, true)
        )
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
    <Sidebar
        users={chatUsers}
        {split}
        handleToggleSplit={() => (split = !split)}
    />
    <div class="section-wrapper">
        <section>
            <header>
                <span class="text-xl py-2">Group 1</span>
                <div
                    class="inline"
                    style="min-width: 5px; margin: 0 1rem; height: 42px; border-left: 1px solid white; border-right: 1px solid white;"
                />
                <span>General Channel</span>
            </header>
            <div class="views-wrapper">
                <div class="views" class:split>
                    {#if split}
                        <div
                            class="view view-left hidden"
                            in:scale={{ duration: 200, delay: 0 }}
                            out:slide={{ duration: 200 }}
                        >
                            <div class="view-inner view-left-inner px-3">
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
                        </div>
                    {/if}
                    <div class="view view-right rounded-tr-md">
                        <div class="view-inner view-right-inner">
                            <div class="messages">
                                {#each messages as message (message.uuid)}
                                    <Message
                                        uuid={message.uuid}
                                        user={chatUsers.find(
                                            (user) =>
                                                user &&
                                                user.uuid === message.userUuid
                                        ) || null}
                                        time={message.time}
                                        text={message.text}
                                    />
                                {/each}
                            </div>
                            <div
                                class="submit-form-container rounded-bl-md rounded-br-md"
                            >
                                <form
                                    on:submit|preventDefault={onSend}
                                    class="submit-form justify-end items-center"
                                >
                                    <input
                                        id="msg"
                                        type="text"
                                        placeholder="Enter text message …"
                                        required
                                        autocomplete="off"
                                        class="border-none shadow-md px-4 py-4 w-full rounded-md"
                                        bind:value={msg}
                                    />
                                    <ButtonSmall
                                        className="ml-4 px-6"
                                        tag="button"
                                        on:click={onSend}
                                        >Send<ChevronsRightIcon
                                            size="24"
                                            class="ml-1"
                                        /></ButtonSmall
                                    >
                                </form>
                            </div>
                        </div>
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
