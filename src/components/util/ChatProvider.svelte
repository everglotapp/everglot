<script lang="ts" context="module">
    import type { Readable } from "svelte/store"
    export const CHAT_CONTEXT = {}
    export interface ChatContext {
        joinedRoom: Readable<string | null>
        connected: Readable<boolean>
        lastMessageSentAt: Readable<number | null>
        lastSentMessage: Readable<ChatMessage | null>
        connect: () => void
        disconnect: () => void
        joinRoom: (room: string) => void
        leaveRoom: () => boolean
        switchRoom: (room: string) => void
        sendMessage: (msg: string, userUuid: string | null) => boolean
        emit: (ev: string, ...args: any[]) => boolean
        on: (ev: string, listener: ListenerFunction) => boolean
        off: (
            ev?: string | undefined,
            listener?: ListenerFunction | undefined
        ) => boolean
    }
    type ListenerFunction = (...args: any[]) => void
</script>

<script lang="ts">
    import { onDestroy, setContext } from "svelte"
    import { writable } from "svelte/store"

    import { io } from "socket.io-client"
    import type { Socket } from "socket.io-client"

    import { v4 as uuidv4 } from "uuid"

    import { setUsersInCall } from "../../stores/call"
    import type { ChatMessage } from "../../types/chat"

    const joinedRoom = writable<string | null>(null)
    const socket = writable<Socket | null>(null)
    const connected = writable(false)
    const lastSentMessage = writable<ChatMessage | null>(null)
    const lastMessageSentAt = writable<number | null>(null)

    setContext(CHAT_CONTEXT, {
        joinedRoom,
        connected,
        lastMessageSentAt,
        lastSentMessage,
        connect,
        disconnect,
        joinRoom,
        leaveRoom,
        switchRoom,
        sendMessage,
        emit,
        on,
        off,
    })

    onDestroy(() => {
        leaveRoom()
        disconnect()
    })

    export function connect() {
        if ($socket || typeof window === "undefined") {
            return
        }

        const s = io({
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: Infinity,
            // At first every second, each attempt doubles the delay.
            reconnectionDelay: 1000,
            reconnectionDelayMax: 60 * 1000, // max 1 minute
            randomizationFactor: 0.5,
            timeout: 5 * 1000, // 5 seconds
        })
        if (!s) {
            return
        }

        s.on("connect", () => {
            /**
             * Empty the internal buffer upon reconnection.
             * Prevents huge spike of events when connection is restored.
             * @see https://socket.io/docs/v4/client-offline-behavior/
             */
            s.sendBuffer = []
            $connected = true
        })

        s.on("disconnect", (reason) => {
            $connected = false
            $socket = null
            $joinedRoom = null
            if (reason === "io server disconnect") {
                s.connect()
            }
        })

        s.on("welcome", (detail: { userUuid: string; groupUuid: string }) => {
            $joinedRoom = detail.groupUuid
        })
        s.on("callUsers", setUsersInCall)

        s.connect()

        $socket = s
    }

    export function disconnect() {
        if (!$socket) {
            return
        }
        $socket.off()
        $socket.disconnect()
        $socket = null
    }

    export function joinRoom(room: string) {
        if (!$socket) {
            return
        }
        if (!room || !room.length) {
            // console.log("Not joining empty room", { room })
            return
        }
        if ($joinedRoom === room) {
            // console.log("Not joining room, already joined", { room })
            return
        }
        // console.log("Joining room", { room })
        $socket.emit("joinRoom", {
            groupUuid: room,
        })
    }

    export function leaveRoom(): boolean {
        if (!$socket) {
            return false
        }
        if ($joinedRoom === null) {
            return false
        }
        // console.log("Leaving room", { joinedRoom: $joinedRoom })
        $socket.emit("leaveRoom", { room: $joinedRoom })
        $joinedRoom = null
        return true
    }

    export function sendMessage(msg: string, userUuid: string | null): boolean {
        if (!$socket || !$socket.connected) {
            // console.log("Not sending", msg, "no socket")
            return false
        }
        // console.log("Sending", msg)
        $socket.emit("chatMessage", msg)
        $lastMessageSentAt = Date.now()
        $lastSentMessage = {
            uuid: uuidv4(),
            text: msg,
            time: new Date().toISOString(),
            userUuid,
        }
        return true
    }

    export function switchRoom(room: string) {
        leaveRoom()
        joinRoom(room)
    }

    export function emit(ev: string, ...args: any[]): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.emit(ev, ...args)
        return true
    }

    export function on(ev: string, listener: ListenerFunction): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.on(ev, listener)
        return true
    }

    export function off(ev?: string, listener?: ListenerFunction): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.off(ev, listener)
        return true
    }
</script>

<slot />
