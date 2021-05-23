import { Server as SocketIO } from "socket.io"
import { validate as uuidValidate } from "uuid"

import log from "../../logger"

import session from "../middlewares/session"

import { createMessage, generateMessagePreview } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    userIsNew,
    userGreeted,
} from "./users"
import {
    userJoin as userJoinCall,
    userLeave as userLeaveCall,
    getUsers as getCallUsers,
} from "./call"

import { performQuery } from "../gql"

import { hangmanGames } from "./hangman"
import { HANGMAN_LOCALES } from "../../constants"
import type { HangmanLocale } from "../../constants"

import type { Pool } from "pg"
import type {
    ChatGroupByUuidQuery,
    ChatUserQuery,
    Group,
    User,
} from "../../types/generated/graphql"
import { getAllGroupUuids, getGroupIdByUuid, userIsInGroup } from "../groups"

import Bot from "./bot"

import type { Server } from "http"

const chlog = log.child({
    namespace: "chat",
})

export function start(server: Server, pool: Pool) {
    const io = new SocketIO(server)

    /** Reuse session/authentication from Express server. */
    const sessionMiddleware = session(pool)
    io.use((socket: EverglotChatSocket, next) => {
        // @ts-ignore
        sessionMiddleware(socket.request, {}, next)
    })

    const bots: Record<Group["uuid"], Bot> = {}

    // Run when client connects
    io.on("connection", (socket: EverglotChatSocket) => {
        const { session } = socket.request

        const authenticateUserInGroup = async (
            userId: number,
            groupUuid: string
        ) => {
            // Check that this is an actual group UUID
            if (!groupUuid || !uuidValidate(groupUuid)) {
                chlog
                    .child({
                        userId,
                        groupUuid,
                    })
                    .debug("Bad group UUID")
                return false
            }

            if (!(await userIsInGroup(userId, groupUuid))) {
                chlog
                    .child({
                        userId,
                        groupUuid,
                    })
                    .debug("Group doesn't exist or user is not part of group")
                return false
            }
        }

        socket.on("joinRoom", async ({ groupUuid }: { groupUuid: string }) => {
            const userId = session.user_id
            const userMeta = await getChatUserByUserId(userId)
            if (!userMeta) {
                return
            }

            if (!authenticateUserInGroup(userId, groupUuid)) {
                return
            }

            const group = await getChatGroupByUuid(groupUuid)
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

            const alpha2 = group.groupByUuid?.language?.alpha2
            const chatUser = userJoin(socket.id, userMeta, groupUuid)
            socket.join(groupUuid)
            if (userIsNew(chatUser) && chatUser?.user?.username) {
                bots[groupUuid].send("welcome", {
                    username: chatUser.user.username,
                })

                userGreeted(chatUser)
            }

            socket.emit("welcome", {
                groupUuid,
                user: {
                    uuid: chatUser.user.uuid,
                },
            })

            // Broadcast to other clients when a client connects
            bots[chatUser.groupUuid].broadcastFrom(socket, "user-joined", {
                username: chatUser.user.username || "?",
            })

            if (HANGMAN_LOCALES.some((locale) => locale === alpha2)) {
                const hangman = hangmanGames[alpha2 as HangmanLocale]
                if (hangman.running) {
                    bots[chatUser.groupUuid].send("hangman-current-word", {
                        word: hangman.publicWord,
                    })
                }
            }
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", async (msg) => {
            const chatUser = getCurrentUser(socket.id)
            if (!chatUser) {
                return
            }

            if (!msg) {
                chlog.debug("User sent chatMessage with empty body")
                return
            }
            const recipientGroupId = await getGroupIdByUuid(chatUser.groupUuid)
            if (!recipientGroupId) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                    })
                    .error("Failed to get group ID by UUID for user message")
                return
            }
            const message = await createMessage({
                body: msg,
                recipientGroupId,
                recipientId: null,
                senderId: chatUser.user.id,
            })
            if (message && message.message && message.sender) {
                io.to(chatUser.groupUuid).emit("message", {
                    uuid: message.message.uuid,
                    userUuid: message.sender.uuid,
                    text: msg,
                    time: message.message.createdAt,
                })
            } else {
                chlog
                    .child({ message })
                    .error("User text message creation failed")
                return
            }

            const group = await getChatGroupByUuid(chatUser.groupUuid)
            if (!group || !group.groupByUuid?.language?.alpha2) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                    })
                    .error("Failed to get group by UUID for user message")
                return
            }
            const alpha2 = group.groupByUuid?.language?.alpha2

            if (!msg.startsWith("!")) {
                chlog
                    .child({ message })
                    .debug("Trying to obtain message preview")
                generateMessagePreview(
                    { id: message.message.id, body: msg },
                    (imageUrl) => {
                        // TODO: Send preview metadata
                        chlog
                            .child({ message, imageUrl })
                            .debug("Callback for message preview was called")
                        io.to(chatUser.groupUuid).emit("messagePreview", {
                            messageUuid: message.message!.uuid,
                            type: "image",
                            url: imageUrl,
                        })
                    }
                )
            }

            if (msg.startsWith("!")) {
                if (msg.startsWith("!help")) {
                    bots[chatUser.groupUuid].send("available-commands")
                    return
                } else if (
                    HANGMAN_LOCALES.some((locale) => locale === alpha2)
                ) {
                    const hangman = hangmanGames[alpha2 as HangmanLocale]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                bots[chatUser.groupUuid].send(
                                    "hangman-current-word",
                                    {
                                        word: hangman.publicWord,
                                    }
                                )
                                if (hangman.nextRound()) {
                                    bots[chatUser.groupUuid].send(
                                        "hangman-guessed-correctly",
                                        {
                                            nextWord: hangman.publicWord,
                                        }
                                    )
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            bots[chatUser.groupUuid].send(
                                "hangman-already-running"
                            )
                        } else {
                            hangman.start()
                            bots[chatUser.groupUuid].send("hangman-started", {
                                word: hangman.publicWord,
                            })
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        bots[chatUser.groupUuid].send(
                            "hangman-lang-not-supported"
                        )
                    }
                }
            }
        })

        // Runs when client disconnects
        socket.on("disconnect", () => {
            const chatUser = userLeave(socket.id)
            if (!chatUser) {
                return
            }

            bots[chatUser.groupUuid].broadcastFrom(socket, "user-left", {
                username: chatUser.user.username || "?",
            })
        })

        socket.on(
            "userJoinCall",
            async ({ groupUuid }: { groupUuid: string }) => {
                const userId = session.user_id
                const userMeta = await getChatUserByUserId(userId)
                if (!userMeta) {
                    return
                }
                if (!authenticateUserInGroup(userId, groupUuid)) {
                    return
                }
                userJoinCall(userMeta.uuid, groupUuid)
            }
        )

        socket.on(
            "userLeaveCall",
            async ({ groupUuid }: { groupUuid: string }) => {
                const userId = session.user_id
                const userMeta = await getChatUserByUserId(userId)
                if (!userMeta) {
                    return
                }
                if (!authenticateUserInGroup(userId, groupUuid)) {
                    return
                }
                userLeaveCall(userMeta.uuid, groupUuid)
            }
        )

        setInterval(async () => {
            const groupUuids = await getAllGroupUuids()
            if (!groupUuids) {
                return
            }
            for (const groupUuid of groupUuids) {
                socket.broadcast
                    .to(groupUuid)
                    .emit("callUsers", getCallUsers(groupUuid))
            }
        }, 5000)
    })
}

async function getChatUserByUserId(userId: User["id"]) {
    const res = await performQuery<ChatUserQuery>(
        `query ChatUser($id: Int!) {
                user(id: $id) {
                    id
                    username
                    uuid
                    avatarUrl
                }
            }`,
        { id: userId }
    )
    if (!res.data || !res.data.user || !res.data?.user?.username?.length) {
        chlog
            .child({
                userId,
                res,
            })
            .warn("Insufficient chat user result")
        return null
    }
    return res.data.user
}

async function getChatGroupByUuid(
    uuid: Group["uuid"]
): Promise<ChatGroupByUuidQuery | null> {
    const res = await performQuery<ChatGroupByUuidQuery>(
        `query ChatGroupByUuid($uuid: UUID!) {
            groupByUuid(uuid: $uuid) {
                language {
                    alpha2
                }
            }
        }`,
        { uuid }
    )
    if (!res.data?.groupByUuid) {
        return null
    }
    return res.data || null
}

export default {
    start,
}
