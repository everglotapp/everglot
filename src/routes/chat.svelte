<script lang="ts">
    import { onMount } from "svelte"
    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"
    import Qs from "qs"
    import socketio from "socket.io-client"

    let socket: socketio.Server | undefined

    let roomName = ""
    let roomMessages: any[] = []
    let roomUsers: any[] = []
    let msg = ""

    // TODO: Check if user is signed in, if not redirect to sign in.

    // TODO: Read user data from database.
    onMount(() => {
        socket = socketio()

        const { username, room } = Qs.parse(location.search, {
            ignoreQueryPrefix: true,
        })

        // Join chatroom
        socket.emit("joinRoom", { username, room })

        // Get room and users
        socket.on("roomUsers", ({ room, users }) => {
            roomName = room
            roomUsers = [...users]
        })
        // Message from server
        socket.on("message", (message) => {
            roomMessages = [...messages, message]

            // Scroll down
            chatMessages.scrollTop = chatMessages.scrollHeight
        })
    })

    function onSend() {
        const trimmedMsg = (msg = msg.trim())

        if (!trimmedMsg) {
            return false
        }

        socket?.emit("chatMessage", trimmedMsg)
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-5xl py-8">
    <PageTitle>Everglot Demo</PageTitle>
    <div class="my-8">
        <main class="chat-main">
            <div
                class="chat-sidebar py-4 px-4 bg-primary-lightest rounded-tl-md"
            >
                <h3>Room Name:</h3>
                <h2>{roomName}</h2>
                <h3>Users</h3>
                <ul>
                    {#each roomUsers as user}
                        <li>{user.username}}</li>
                    {/each}
                </ul>
            </div>
            <div class="chat-messages rounded-tr-md">
                {#each roomMessages as message}
                    <div class="message">
                        <p class="meta">
                            {message.username}<span>{message.time}</span>
                        </p>
                        <p class="text">{message.text}</p>
                    </div>
                {/each}
            </div>
        </main>
        <div class="chat-form-container rounded-bl-md rounded-br-md">
            <form id="chat-form">
                <input
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autocomplete="off"
                    class="max-w-sm"
                    bind:value={msg}
                />
                <ButtonLarge className="ml-4" tag="button" on:click={onSend}
                    >Send</ButtonLarge
                >
            </form>
        </div>
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

    .chat-messages {
        padding: 30px;
        max-height: 500px;
        overflow-y: scroll;
    }

    .chat-messages .message {
        padding: 10px;
        margin-bottom: 15px;
        @apply bg-primary-lightest;
        border-radius: 5px;
        overflow-wrap: break-word;
    }

    .chat-messages .message .meta {
        font-size: 15px;
        font-weight: bold;
        @apply text-primary-dark;
        opacity: 0.7;
        margin-bottom: 7px;
    }

    .chat-messages .message .meta span {
        @apply text-gray-bitdark;
    }

    .chat-form-container {
        padding: 20px 30px;
        @apply bg-primary-lightest;
    }

    .chat-form-container form {
        display: flex;
    }

    .chat-form-container input[type="text"] {
        font-size: 16px;
        padding: 5px;
        height: 40px;
        flex: 1;
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
