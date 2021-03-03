<script lang="ts">
    import { username, room } from "../stores"
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"

    import ButtonSmall from "../comp/util/ButtonSmall.svelte"
    import { UserIcon, ChevronsRightIcon } from "svelte-feather-icons"

    import type { User } from "../server/users"
    import type { Language } from "../server/rooms"
    import type { Message } from "../server/messages"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    let socket: SocketIO.Socket | undefined

    let roomMessages: Message[] = []
    let roomUsers: User[] = []
    let msg: string = ""

    // TODO: Check if user is signed in, if not redirect to sign in.
    function subscribe(): void {
        if (!socket) {
            return
        }

        // Join chatroom
        socket.emit("joinRoom", {
            username: $username,
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
        if (!$username.length) {
            goto("/")
        }

        socket = io()
        if (!socket) {
            return
        }
        subscribe()
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

    const chatIsManuallyScrolled = (scrollTop?: number): boolean => {
        const container = document.getElementById("chat-messages")
        return container ? isScrolled(container, scrollTop) : false
    }

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
        room: Language["enName"]
        users: User[]
    }): void {
        if (recvRoom !== $room) {
            return
        }
        roomUsers = [...users]
        scrollDown()
    }

    function onMessage(message: Message): void {
        let force = !chatIsManuallyScrolled()
        roomMessages = [...roomMessages, message]
        if (message.username === $username) {
            force = true
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
    <div class="chat-sidebar bg-primary-lightest rounded-tl-md">
        <div
            class="py-3 px-4 text-lg font-bold w-full border-8 border-primary-lightest text-gray-dark mb-4"
        >
            <!-- svelte-ignore a11y-no-onchange -->
            <select
                name="room"
                id="room"
                bind:value={$room}
                on:change={changeRoom}
                class="border-none shadow-sm rounded-xl w-full"
            >
                <option value="English">English</option>
                <option value="German">German</option>
                <option value="French">French</option>
                <option value="Italian">Italian</option>
                <option value="Spanish">Spanish</option>
                <option value="Chinese">Chinese</option>
                <option value="Japanese">Japanese</option>
            </select>
        </div>
        <h3 class="px-4 text-gray-bitdark font-bold text-sm mb-4">Users</h3>
        <ul>
            {#each roomUsers as user}
                {#if user.username === ""}
                    <li
                        class="px-8 py-2 text-lg bg-gray-lightest text-gray-bitdark shadow-sm mb-1 overflow-hidden overflow-ellipsis"
                    >
                        Everglot Bot
                    </li>
                {:else}
                    <li
                        class="px-8 py-2 text-lg bg-gray-lightest text-gray-dark shadow-sm mb-1 overflow-hidden overflow-ellipsis"
                    >
                        {user.username}
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
    <div id="chat-main">
        <div
            class="flex bg-gray-lightest py-4 px-8"
            style="justify-content: space-between;"
        >
            <span class="text-lg py-2">{$room} Chat</span>
            <ButtonSmall variant="TEXT" href="/profile"
                ><UserIcon size="24" class="mr-1" /><span
                    class="hidden md:visible">Profile</span
                ></ButtonSmall
            >
        </div>
        <div id="chat-messages" class="rounded-tr-md p-8">
            {#each roomMessages as message}
                <div class="message">
                    <p class="meta">
                        <span class="username">{message.username}</span>
                        {#if message.username === "Everglot Bot"}[{$room}]{/if}
                        &nbsp;–&nbsp;
                        <span>{message.time}</span>
                    </p>
                    <p class="text">{message.text}</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="bg-primary-lightest" />
    <div class="chat-form-container rounded-bl-md rounded-br-md">
        <form
            id="chat-form"
            on:submit|preventDefault={onSend}
            class="justify-end items-center"
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
            <ButtonSmall className="ml-4 px-6" tag="button" on:click={onSend}
                >Send<ChevronsRightIcon size="24" class="ml-1" /></ButtonSmall
            >
        </form>
    </div>
</section>

<style>
    section {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: grid;
        grid-template-columns: 1fr 4fr;
        grid-template-rows: 7fr 1fr;
        width: 100vw;
        height: 100vh;
    }

    .chat-sidebar {
        overflow-y: scroll;
    }

    #chat-main {
        overflow-y: scroll;
        top: 0;
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

    .chat-form-container {
        padding: 20px 30px;

        @apply bg-gray-lightest;
    }

    .chat-form-container form {
        display: flex;
    }

    @media (max-width: 700px) {
        section {
            display: block;
        }

        #chat-main {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 100px;
        }

        .chat-sidebar {
            display: none;
        }

        .chat-form-container {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
        }
    }
</style>
