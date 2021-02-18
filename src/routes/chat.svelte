<script lang="ts">
    import { username, room } from "../stores"
    import { onMount } from "svelte"
    import { goto } from "@sapper/app"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import { ChevronsRightIcon } from "svelte-feather-icons"

    import type { User } from "../server/users"
    import type { Language } from "../server/rooms"
    import type { Message } from "../server/messages"

    import socketio from "socket.io-client"

    let socket: SocketIOClient.Socket | undefined

    let roomMessages: Message[] = []
    let roomUsers: User[] = []
    let msg = ""

    // TODO: Check if user is signed in, if not redirect to sign in.

    function subscribe() {
        socket = socketio()
        if (!socket) {
            return
        }

        // Join chatroom
        socket.emit("joinRoom", { username: $username, room: $room })

        // Get room and users
        socket.on(
            "roomUsers",
            ({
                room: recvRoom,
                users,
            }: {
                room: Language["enName"]
                users: User[]
            }) => {
                if (recvRoom !== $room) {
                    return
                }
                roomUsers = [...users]
                scrollDown()
            }
        )
        // Message from server
        socket.on("message", (message: Message) => {
            roomMessages = [...roomMessages, message]
            scrollDown()
        })
    }

    // TODO: Read user data from database.
    onMount(() => {
        if (!$username.length) {
            goto("/")
        }

        subscribe()
    })

    function scrollDown() {
        const messagesEl = document.getElementById("chat-messages")
        if (messagesEl) {
            messagesEl.scrollTop = messagesEl.scrollHeight
        }
    }

    function onSend() {
        const trimmedMsg = msg.trim()

        if (!trimmedMsg) {
            msg = ""
            return false
        } else {
            // TODO: do this only if message was sent successfully.
            msg = ""
        }

        socket?.emit("chatMessage", trimmedMsg)
    }

    function changeRoom() {
        socket?.emit("leaveRoom")
        subscribe()
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-5xl py-8 my-8" class:hidden={!$room.length}>
    <div class="chat-main">
        <div class="chat-sidebar bg-primary-lightest rounded-tl-md">
            <div
                class="py-3 px-4 text-lg font-bold w-full border-8 border-primary-lightest bg-gray-lightest text-gray-dark mb-4"
            >
                <select
                    name="room"
                    id="room"
                    bind:value={$room}
                    on:blur={changeRoom}
                    class="border-none shadow-sm w-full"
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
                            class="px-8 py-2 text-lg bg-gray-lightest text-gray-bitdark shadow-sm mb-1"
                        >
                            Everglot Bot
                        </li>
                    {:else}
                        <li
                            class="px-8 py-2 text-lg bg-gray-lightest text-gray-dark shadow-sm mb-1"
                        >
                            {user.username}
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
        <div id="chat-messages" class="rounded-tr-md p-8">
            {#each roomMessages as message}
                <div class="message">
                    <p class="meta">
                        {message.username}&nbsp;–&nbsp;<span
                            >{message.time}</span
                        >
                    </p>
                    <p class="text">{message.text}</p>
                </div>
            {/each}
        </div>
    </div>
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
                class="max-w-xl border-none shadow-md px-4 py-4 w-full rounded-md"
                bind:value={msg}
            />
            <ButtonLarge className="ml-4 px-6" tag="button" on:click={onSend}
                >Send<ChevronsRightIcon size="20" class="ml-2" /></ButtonLarge
            >
        </form>
    </div>
</div>

<style>
    .chat-main {
        display: grid;
        grid-template-columns: 1fr 3fr;
    }

    .chat-sidebar {
        overflow-y: scroll;
    }

    #chat-messages {
        max-height: 500px;
        min-height: 40vh;
        overflow-y: scroll;

        @screen 2xl {
            height: 500px;
        }
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
        .chat-main {
            display: block;
        }

        .chat-sidebar {
            display: none;
        }
    }
</style>
