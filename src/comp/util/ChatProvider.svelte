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
        sendMessage: (msg: string) => boolean
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

        const s = io()
        if (!s) {
            return
        }

        s.on("connect", () => {
            $connected = true
        })

        s.on("disconnecting", () => {
            $connected = false
            $socket = null
            $joinedRoom = null
        })

        s.on("welcome", (detail: { userUuid: string; groupUuid: string }) => {
            $joinedRoom = detail.groupUuid
        })
        s.on("callUsers", setUsersInCall)

        $socket = s
    }

    export function disconnect() {
        if ($socket) {
            $socket.off()
            $socket.disconnect()
            $socket = null
        }
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
        $socket.emit("leaveRoom")
        $joinedRoom = null
        return true
    }

    export function sendMessage(msg: string): boolean {
        if (!$socket || !$socket.connected) {
            // console.log("Not sending", msg, "no socket")
            return false
        }
        // console.log("Sending", msg)
        $socket.emit("chatMessage", msg)
        $lastMessageSentAt = Date.now()
        return true
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
