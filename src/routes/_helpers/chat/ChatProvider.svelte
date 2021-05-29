<script lang="ts">
    import { onDestroy, setContext } from "svelte"
    import { writable } from "svelte/store"

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    import { setUsersInCall } from "../../../stores/call"

    import type { Group } from "../../../types/generated/graphql"

    import type { ChatUser } from "../../../types/chat"

    const joinedRoom = writable<string | null>(null)
    const socket = writable<SocketIO.Socket | null>(null)
    const connected = writable(false)

    export let contextKey: string
    setContext(contextKey, {
        joinedRoom,
        connected,
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
        })

        s.on(
            "welcome",
            (detail: {
                user: Pick<ChatUser["user"], "uuid">
                groupUuid: Group["uuid"]
            }) => {
                $joinedRoom = detail.groupUuid
            }
        )
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
        return true
    }

    export function sendMessage(msg: string): boolean {
        if (!$socket || !$socket.connected) {
            // console.log("Not sending", msg, "no socket")
            return false
        }
        // console.log("Sending", msg)
        $socket.emit("chatMessage", msg)
        return true
    }

    export function emit(ev: string, ...args: any[]): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.emit(ev, ...args)
        return true
    }

    export function on(ev: string, listener: Function): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.on(ev, listener)
        return true
    }

    export function off(ev?: string, listener?: Function): boolean {
        if (!$socket || !$socket.connected) {
            return false
        }
        $socket.off(ev, listener)
        return true
    }
</script>

<slot />
