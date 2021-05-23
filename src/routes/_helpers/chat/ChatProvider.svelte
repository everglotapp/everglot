<script lang="ts">
    import { onDestroy, createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()

    import { io } from "socket.io-client"
    import type SocketIO from "socket.io-client"

    import type { Group } from "../../../types/generated/graphql"

    import type { ChatUser, ChatMessage } from "../../../types/chat"

    let joinedRoom: string | null = null
    export const currentRoom = () => joinedRoom
    let socket: SocketIO.Socket | null = null

    onDestroy(() => {
        leaveRoom()
        if (socket) {
            socket.disconnect()
        }
    })

    export function connect() {
        if (socket || typeof window === "undefined") {
            return
        }
        // console.log("Connecting to chat")
        socket = io()
        if (socket) {
            // Welcome from server
            socket.on(
                "welcome",
                (detail: {
                    user: Pick<ChatUser["user"], "uuid">
                    groupUuid: Group["uuid"]
                }) => {
                    joinedRoom = detail.groupUuid
                    dispatch("welcome", detail)
                }
            )
            // Message from server
            socket.on("message", (detail: ChatMessage) =>
                dispatch("message", detail)
            )
            // Message preview from server
            socket.on(
                "messagePreview",
                (detail: { messageUuid: string; url: string; type: string }) =>
                    dispatch("messagePreview", detail)
            )
        }
    }

    export function joinRoom(room: string) {
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

    export function leaveRoom(): boolean {
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

    export function sendMessage(msg: string): boolean {
        if (!socket || !socket.connected) {
            // console.log("Not sending", msg, "no socket")
            return false
        }
        // console.log("Sending", msg)
        socket.emit("chatMessage", msg)
        return true
    }

    export function emit(ev: string, ...args: any[]): boolean {
        if (!socket || !socket.connected) {
            return false
        }
        socket.emit(ev, ...args)
        return true
    }
</script>

<slot currentRoom={joinedRoom} />
