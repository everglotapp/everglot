<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { scale, slide } from "svelte/transition"

    import { room } from "../stores"
    import Bio from "../comp/users/Bio.svelte"

    import ClickAwayListener from "../comp/util/ClickAwayListener.svelte"
    import ButtonSmall from "../comp/util/ButtonSmall.svelte"

    import type { ChatUser } from "../server/users"
    import type { Language, User } from "../types/generated/graphql"
    import type { Message } from "../server/messages"

    import { ChevronsRightIcon } from "svelte-feather-icons"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    let socket: SocketIO.Socket | null = null

    let roomMessages: Message[] = []
    let users: (Pick<ChatUser["user"], "uuid" | "username" | "avatarUrl"> & {
        username: string
    })[] = []
    let myUuid: User["uuid"] | null = null
    let msg: string = ""
    let showBioUuid: User["uuid"] | null = null

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
        if (typeof document !== "undefined") {
            document.addEventListener("keydown", handleDocumentKeydown)
        }
        socket = io()
        if (!socket) {
            return
        }
        subscribe()
    })

    onDestroy(() => {
        if (typeof document !== "undefined") {
            document.removeEventListener("keydown", handleDocumentKeydown)
        }
        if (!socket) {
            return
        }
        unsubscribe()
        socket.emit("leaveRoom")
        socket = null
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

    function onMessage(message: Message): void {
        getChatMessageContainers().forEach((container) => {
            const isOwnMessage =
                message.uuid !== null &&
                myUuid !== null &&
                message.uuid === myUuid
            /**
             * Force auto-scroll if the user sent the message themselves
             * or if the user didn't scroll upwards before receiving the message.
             */
            const force = isOwnMessage || isScrolledToBottom(container)

            setTimeout(() => scrollToBottom(container, force), 150)
        })
        roomMessages = [...roomMessages, message]
    }

    let split = true
    function toggleSplit() {
        split = !split
    }

    function handleDocumentKeydown(event: KeyboardEvent) {
        if (showBioUuid === null) {
            // Not showing bio, so we don't care
            return
        }
        event = event || window.event
        if (!event) {
            return
        }
        let isEscape = false
        if ("key" in event) {
            isEscape = event.key === "Escape" || event.key === "Esc"
        } else {
            isEscape = (event as KeyboardEvent).keyCode === 27
        }
        if (isEscape) {
            showBioUuid = null
        }
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="wrapper">
    <div class="sidebar">
        <div
            class="users-container py-3 px-4 text-lg font-bold w-full text-gray-dark mb-4"
        >
            <h3 class="px-4 text-gray-bitdark text-sm font-bold mb-4">
                Active Members
            </h3>
            <ul class="users">
                {#each users as user}
                    {#if user.username === ""}
                        <li class="user" title="Everglot Bot" />
                    {:else}
                        <li
                            class="user"
                            title={user.username}
                            aria-label={user.username}
                        >
                            {#if showBioUuid !== null && showBioUuid === user.uuid}
                                <ClickAwayListener
                                    elementId="user-bio"
                                    on:clickaway={() => (showBioUuid = null)}
                                />
                                <div
                                    class="relative"
                                    in:scale={{ duration: 200, delay: 0 }}
                                    out:scale={{ duration: 200, delay: 0 }}
                                    aria-label={`User Bio`}
                                    style="height: 0; width: 0; margin-left: 100%;"
                                >
                                    <div class="absolute" style="left: 4px;">
                                        <div
                                            id="user-bio"
                                            class="fixed bg-white shadow-lg rounded-md"
                                            style="z-index: 1; min-width: 240px;"
                                        >
                                            <Bio uuid={user.uuid} />
                                        </div>
                                    </div>
                                </div>
                            {/if}
                            <div
                                class="avatar"
                                on:click={(event) => {
                                    event.stopPropagation()
                                    showBioUuid =
                                        showBioUuid === user.uuid
                                            ? null
                                            : user.uuid
                                }}
                                on:keydown={(event) => {
                                    event.stopPropagation()
                                    showBioUuid =
                                        showBioUuid === user.uuid
                                            ? null
                                            : user.uuid
                                }}
                                tabindex="0"
                            >
                                {#if (user.avatarUrl || "").startsWith("https://")}
                                    <img
                                        src={user.avatarUrl || ""}
                                        alt={user.username}
                                        role="presentation"
                                    />
                                {:else}
                                    <span class="initial" role="presentation"
                                        >{user.username.charAt(0)}</span
                                    >
                                {/if}
                            </div>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
        <div
            class="toggles py-3 px-4 text-lg font-bold w-full text-gray-dark mb-4"
        >
            <div class="toggle-row">
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M32.5 6.08124H7.5C6.50578 6.08235 5.5526 6.4778 4.84958 7.18082C4.14656 7.88384 3.75112 8.83702 3.75 9.83124V27.3312C3.75112 28.3255 4.14656 29.2786 4.84958 29.9817C5.5526 30.6847 6.50578 31.0801 7.5 31.0812H32.5C33.4942 31.0801 34.4474 30.6847 35.1504 29.9817C35.8534 29.2786 36.2489 28.3255 36.25 27.3312V9.83124C36.2489 8.83702 35.8534 7.88384 35.1504 7.18082C34.4474 6.4778 33.4942 6.08235 32.5 6.08124ZM33.75 27.3312C33.7496 27.6626 33.6178 27.9803 33.3834 28.2147C33.1491 28.449 32.8314 28.5808 32.5 28.5812H7.5C7.16861 28.5808 6.8509 28.449 6.61657 28.2147C6.38224 27.9803 6.25041 27.6626 6.25 27.3312V9.83124C6.25041 9.49984 6.38224 9.18214 6.61657 8.94781C6.8509 8.71348 7.16861 8.58165 7.5 8.58124H32.5C32.8314 8.58165 33.1491 8.71348 33.3834 8.94781C33.6178 9.18214 33.7496 9.49984 33.75 9.83124V27.3312ZM26.25 34.8312C26.25 35.1628 26.1183 35.4807 25.8839 35.7151C25.6495 35.9495 25.3315 36.0812 25 36.0812H15C14.6685 36.0812 14.3505 35.9495 14.1161 35.7151C13.8817 35.4807 13.75 35.1628 13.75 34.8312C13.75 34.4997 13.8817 34.1818 14.1161 33.9474C14.3505 33.7129 14.6685 33.5812 15 33.5812H25C25.3315 33.5812 25.6495 33.7129 25.8839 33.9474C26.1183 34.1818 26.25 34.4997 26.25 34.8312Z"
                        fill="#45CDCD"
                    />
                </svg>
                <span>Display</span>
                <div class="toggle" on:click={toggleSplit}>
                    <div aria-selected={split}>On</div>
                    <div aria-selected={!split}>Off</div>
                </div>
            </div>
            <div class="toggle-row">
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 40 35"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <g clip-path="url(#clip0)">
                        <path
                            d="M20.001 1.45786C18.6749 1.45786 17.4031 1.91879 16.4654 2.73926C15.5278 3.55974 15.001 4.67253 15.001 5.83286V17.4995C15.001 18.6598 15.5278 19.7726 16.4654 20.5931C17.4031 21.4136 18.6749 21.8745 20.001 21.8745C21.3271 21.8745 22.5988 21.4136 23.5365 20.5931C24.4742 19.7726 25.001 18.6598 25.001 17.4995V5.83286C25.001 4.67253 24.4742 3.55974 23.5365 2.73926C22.5988 1.91879 21.3271 1.45786 20.001 1.45786V1.45786Z"
                            stroke="#45CDCD"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M31.6683 14.5828V17.4994C31.6683 20.2069 30.4391 22.8034 28.2512 24.7178C26.0633 26.6323 23.0958 27.7078 20.0016 27.7078C16.9074 27.7078 13.94 26.6323 11.752 24.7178C9.56412 22.8034 8.33496 20.2069 8.33496 17.4994V14.5828"
                            stroke="#45CDCD"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M20.001 27.7083V33.5416"
                            stroke="#45CDCD"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M13.335 33.5419H26.6683"
                            stroke="#45CDCD"
                            stroke-width="3"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0">
                            <rect
                                width="40"
                                height="35"
                                fill="white"
                                transform="translate(0.000976562)"
                            />
                        </clipPath>
                    </defs>
                </svg>
                <span>Mic</span>
                <div class="toggle" style="cursor: not-allowed;">
                    <div>On</div>
                    <div aria-selected="true">Off</div>
                </div>
            </div>
            <div class="toggle-row">
                <svg
                    width="35"
                    height="35"
                    viewBox="0 0 22 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.4501 5.48748C16.9089 6.16725 18.158 7.33383 19.0371 8.83745C19.9162 10.3411 20.3853 12.1131 20.384 13.9261C20.3852 15.7389 19.9162 17.5109 19.037 19.0144C18.1579 20.5179 16.9088 21.6843 15.4501 22.364V24.2623C17.3381 23.5459 18.9815 22.1609 20.1459 20.3047C21.3103 18.4486 21.9362 16.2163 21.9343 13.9261C21.9343 9.1047 19.2174 5.01206 15.4501 3.58378V5.48748ZM15.4501 9.96927C15.9466 10.4577 16.3449 11.0646 16.6177 11.7479C16.8905 12.4312 17.0311 13.1746 17.0299 13.9268C17.0312 14.6788 16.8906 15.4222 16.6178 16.1054C16.345 16.7886 15.9466 17.3953 15.4501 17.8836V19.8151C17.2127 18.6395 18.3975 16.4424 18.3975 13.9268C18.3979 12.7336 18.1257 11.5613 17.6084 10.5277C17.091 9.49411 16.3467 8.63559 15.4501 8.03841V9.96927ZM1.89242 19.3655H6.60815L11.9133 26.8465C12.5028 27.8245 13.8822 27.7504 14.2712 26.6414V1.26648C13.7932 0.158087 12.5388 0.0691165 11.9133 1.00704L6.60815 8.51383H1.89242C0.382799 8.51383 0.124023 8.82692 0.124023 10.5269V17.3266C0.124023 18.9852 0.418757 19.3655 1.89242 19.3655Z"
                        fill="#45CDCD"
                    />
                </svg>
                <span>Audio</span>
                <div class="toggle" style="cursor: not-allowed;">
                    <div>On</div>
                    <div aria-selected="true">Off</div>
                </div>
            </div>
        </div>
    </div>
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
                                {#each roomMessages as message}
                                    <div
                                        class="message"
                                        transition:scale|local={{
                                            duration: 200,
                                        }}
                                    >
                                        <p class="meta">
                                            <span class="username"
                                                >{message.username}</span
                                            >
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

    .sidebar {
        overflow-y: scroll;

        @apply rounded-tl-md;
        @apply flex;
        @apply flex-col;
        @apply justify-between;
    }

    .users-container {
        @apply my-4;
        @apply text-center;
    }

    .users {
        @apply grid;
        @apply grid-cols-4;
        @apply grid-rows-3;
        @apply grid-flow-row;
        @apply gap-2;
    }

    .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;

        @apply flex;
        @apply justify-center;
        @apply items-center;
        @apply bg-gray-light;
        @apply shadow-md;
        @apply cursor-pointer;
        @apply overflow-hidden;
    }

    .avatar > img {
        width: 50px;
        max-height: 50px;
    }

    .avatar > .initial {
        height: 1.625rem;
    }

    .toggle-row {
        max-width: 200px;

        @apply flex;
        @apply items-center;
        @apply justify-between;
        @apply mx-auto;
        @apply py-1;
    }

    .toggle {
        @apply cursor-pointer;
        @apply border-2;
        @apply rounded-lg;
        @apply border-primary;
        @apply uppercase;
        @apply text-sm;
        @apply flex;
    }

    .toggle div {
        @apply rounded-md;
        @apply p-1;
        @apply text-xs;

        transition: background-color 100ms ease-in;
    }

    .toggle div[aria-selected="true"] {
        @apply bg-primary;

        transition: background-color 100ms ease-in;
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
    }

    .message {
        @apply p-2;
        @apply mb-3;
        @apply break-words;
        @apply bg-primary-lightest;
        @apply rounded-md;
        @apply shadow-sm;
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
