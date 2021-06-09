import { Server as SocketIO } from "socket.io"

import log from "../../logger"

import session from "../middlewares/session"

import users from "./users"
import call from "./call"
import activities from "./activities"
import messages from "./messages"

import { getGroupLanguageByUuid } from "../groups"

import Bot from "./bot"

import type { Pool } from "pg"

import type { Server } from "http"
import { authenticateUserInGroup } from "../auth"
import { getChatUserByUserId } from "./utils"

const chlog = log.child({
    namespace: "chat",
})

export const bots: Record<string, Bot> = {}

export function start(server: Server, pool: Pool) {
    const io = new SocketIO(server)

    /** Reuse session/authentication from Express server. */
    const sessionMiddleware = session(pool)
    io.use((socket: EverglotChatSocket, next) => {
        // @ts-ignore
        sessionMiddleware(socket.request, {}, next)
    })

    // Run when client connects
    io.on("connection", async (socket: EverglotChatSocket) => {
        const { session } = socket.request

        socket.on("joinRoom", async ({ groupUuid }: { groupUuid: string }) => {
            const userId = session.user_id
            const userMeta = await getChatUserByUserId(userId)
            if (!userMeta) {
                return
            }

            if (!authenticateUserInGroup(userId, groupUuid)) {
                return
            }

            const group = await getGroupLanguageByUuid(groupUuid)
            if (!group || !group.groupByUuid?.language?.alpha2) {
                chlog
                    .child({
                        userId,
                        groupUuid,
                    })
                    .debug("Group not found")
                return false
            }

            bots[groupUuid] ||= new Bot(
                groupUuid,
                group.groupByUuid?.language?.alpha2,
                io
            )

            const chatUser = users.handleJoin(socket, userMeta, groupUuid)
            socket.join(groupUuid)
            if (!users.hasBeenGreeted(chatUser) && chatUser?.user?.username) {
                /**
                 * TODO: Store first greeting date in group membership table.
                 * Only greet user once per group:
                 *   - Upon membership creation for global groups
                 *   - Upon first joinRoom for private groups
                 */
                // bots[groupUuid].send("welcome", {
                //     username: chatUser.user.username,
                // })

                users.handleGreeted(chatUser)
            }

            socket.emit("welcome", {
                groupUuid,
                userUuid: chatUser.user.uuid,
            })

            // Broadcast to other clients when a client connects
            // bots[chatUser.groupUuid].broadcastFrom(socket, "user-joined", {
            //     username: chatUser.user.username || "?",
            // })

            call.handleUserJoinedRoom(io, socket, groupUuid)
            activities.handleUserJoinedRoom(io, socket, groupUuid)
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            users.handleLeave(socket)
        })

        // Runs when client disconnects
        socket.on("disconnect", () => {
            const chatUser = users.handleLeave(socket)
            if (!chatUser) {
                return
            }
        })

        messages.handleUserConnected(io, socket)
        call.handleUserConnected(io, socket)
        await activities.handleUserConnected(io, socket)
    })
}

export default {
    start,
}
