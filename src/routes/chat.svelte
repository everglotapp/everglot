<script lang="ts">
    import { username, room } from "../stores"
    import { onMount, onDestroy } from "svelte"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import { UserIcon, ChevronsRightIcon } from "svelte-feather-icons"

    import type { ChatUser } from "../server/users"
    import type { Language } from "../types/generated/graphql"
    import type { Message } from "../server/messages"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    let socket: SocketIO.Socket | null = null

    let roomMessages: Message[] = []
    let roomUsers: Pick<ChatUser["user"], "uuid" | "username">[] = []
    let msg: string = ""

    // TODO: Check if user is signed in, if not redirect to sign in.
    function subscribe(): void {
        if (!socket) {
            return
        }

        // Join chatroom
        socket.emit("joinRoom", {
            room: $room,
        })

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
    })

    function scrollDown(force: boolean = false): void {
        const container = document.getElementById("chat-messages")
        if (container) {
            if (!force && !isScrolled(container)) {
                return
            }
            scroll(container)
        }
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

    // const chatIsManuallyScrolled = (scrollTop?: number): boolean => {
    //     const container = document.getElementById("chat-messages")
    //     return container ? isScrolled(container, scrollTop) : false
    // }

    /**
     * Whether the element is scrolled to the specified position.
     * By default: Whether the element is scrolled to the bottom.
     */
    const isScrolled = (el: Element, scrollTop?: number): boolean => {
        const top = scrollTop || el.scrollHeight - el.clientHeight
        return el.scrollTop === top
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

    function onRoomUsers({
        room: recvRoom,
        users,
    }: {
        room: Language["englishName"]
        users: Pick<ChatUser["user"], "username" | "uuid">[]
    }): void {
        if (recvRoom !== $room) {
            return
        }
        roomUsers = [...users]
        scrollDown()
    }

    function onMessage(message: Message): void {
        // let force = !chatIsManuallyScrolled()
        roomMessages = [...roomMessages, message]
        if (message.username === $username) {
            // force = true
        }
        setTimeout(() => scrollDown(true), 150)
    }

    function changeRoom(): void {
        unsubscribe()
        socket?.emit("leaveRoom")
        roomMessages = []
        subscribe()
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<section>
    <div class="sidebar">
        <div
            class="users-container py-3 px-4 text-lg font-bold w-full text-gray-dark mb-4"
        >
            <h3 class="px-4 text-gray-bitdark font-bold mb-4">
                Active Members
            </h3>
            <ul class="users">
                {#each roomUsers as chatUser}
                    {#if chatUser.username === ""}
                        <li class="user" title="Everglot Bot" />
                    {:else}
                        <li class="user" title={chatUser.username || "n/a"} />
                    {/if}
                {/each}
            </ul>
        </div>
    </div>
    <div class="main">
        <div class="flex items-center bg-primary text-white py-4 px-8">
            <span class="text-xl py-2">Group 1</span>
            <div
                class="inline"
                style="min-width: 5px; margin: 0 1rem; height: 42px; border-left: 1px solid white; border-right: 1px solid white;"
            />
            <span>General Channel</span>
        </div>
        <div class="rounded-tr-md p-8">
            {#each roomMessages as message}
                <div class="message">
                    <p class="meta">
                        <span class="username">{message.username}</span>
                        {#if message.username === "Everglot Bot" && $room && $room.length}
                            <span> [{$room}]</span>
                        {/if}
                        &nbsp;–&nbsp;
                        <span>{message.time}</span>
                    </p>
                    <p class="text">{message.text}</p>
                </div>
            {/each}
        </div>
        <div class="submit-form-container rounded-bl-md rounded-br-md">
            <form
                on:submit|preventDefault={onSend}
                class="submit-form justify-end items-center"
            >
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter message …"
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
</section>

<style>
    section {
        display: grid;
        grid-template-columns: 300px 1fr;
        width: 100%;
        height: 100%;
    }

    .sidebar {
        overflow-y: scroll;

        @apply rounded-tl-md;
    }

    .users-container {
        @apply my-4;
    }

    .users {
        display: grid;
        grid-template-rows: 3;
        grid-template-columns: 4;

        @apply text-center;
    }

    .user {
        border-radius: 50%;
        width: 50px;
        height: 50px;

        @apply bg-gray-light;
    }

    .main {
        overflow-y: scroll;
        top: 0;
        display: grid;
        grid-template-rows: 70px 1fr 200px;
        width: 100%;
        height: 100%;
    }

    .message {
        padding: 10px;
        margin-bottom: 15px;
        overflow-wrap: break-word;

        @apply bg-primary-lightest;
        @apply rounded-md;
    }

    .message .meta {
        font-size: 15px;
        font-weight: bold;
        opacity: 0.7;
        margin-bottom: 7px;

        @apply text-gray-bitdark;
    }

    .message .meta .username {
        @apply text-primary-dark;
    }

    .message .meta span {
        @apply text-gray-bitdark;
    }

    .message p {
        @apply mb-1;
    }

    .submit-form-container {
        padding: 18px 30px;

        @apply bg-gray-lightest;
    }

    .submit-form-container form {
        display: flex;
    }

    @media (max-width: 700px) {
        section {
            display: block;
        }

        .main {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 94px;
        }

        .sidebar {
            display: none;
        }

        .submit-form-container {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
