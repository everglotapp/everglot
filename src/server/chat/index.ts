import { Server as SocketIO } from "socket.io"
import { validate as uuidValidate } from "uuid"

import log from "../../logger"

import session from "../middlewares/session"

import { createMessage, formatMessage } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    userIsNew,
    userGreeted,
} from "./users"

import { performQuery } from "../gql"

import { hangmanGames } from "./hangman"
import type { HangmanLanguage } from "./hangman"

import type { Pool } from "pg"
import type {
    ChatGroupByUuidQuery,
    ChatUserQuery,
    Group,
    User,
} from "../../types/generated/graphql"
import { getGroupIdByUuid } from "../groups"

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

        socket.on("joinRoom", async ({ groupUuid }: { groupUuid: string }) => {
            const userMeta = await getChatUserByUserId(session.user_id)
            if (!userMeta) {
                return
            }
            // TODO: Check that this is an actual group UUID and that
            // the user is part of this group.
            if (!groupUuid || !uuidValidate(groupUuid)) {
                chlog
                    .child({
                        groupUuid,
                    })
                    .info("Bad group UUID")
                return
            }
            const group = await getChatGroupByUuid(groupUuid)
            if (!group || !group.groupByUuid?.language?.alpha2) {
                chlog
                    .child({
                        groupUuid,
                    })
                    .info("Group not found")
                return
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

            // Broadcast when a user connects
            if (alpha2 === "de") {
                socket.broadcast
                    .to(chatUser.groupUuid)
                    .emit(
                        "message",
                        formatMessage(
                            `${chatUser.user.username} ist dem Chat beigetreten.`
                        )
                    )
            } else {
                socket.broadcast
                    .to(chatUser.groupUuid)
                    .emit(
                        "message",
                        formatMessage(
                            `${chatUser.user.username} has joined the chat.`
                        )
                    )
            }

            // TODO: Get language from group.
            if (["de", "en"].includes(alpha2)) {
                const hangman = hangmanGames[alpha2 as HangmanLanguage]
                if (hangman.running) {
                    if (alpha2 === "de") {
                        bots[chatUser.groupUuid].sendMessage(
                            `Aktuelles Wort: ${hangman.publicWord}`
                        )
                    } else {
                        bots[chatUser.groupUuid].sendMessage(
                            `Current word: ${hangman.publicWord}`
                        )
                    }
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

            if (msg) {
                const recipientGroupId = await getGroupIdByUuid(
                    chatUser.groupUuid
                )
                if (!recipientGroupId) {
                    chlog
                        .child({
                            groupUuid: chatUser.groupUuid,
                        })
                        .error(
                            "Failed to get group ID by UUID for user message"
                        )
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

                if (msg.startsWith("!help")) {
                    if (alpha2 === "de") {
                        bots[chatUser.groupUuid].sendMessage(
                            "Verfügbare Befehle: !hangman, !help"
                        )
                    } else {
                        bots[chatUser.groupUuid].sendMessage(
                            "Available commands: !hangman, !help"
                        )
                    }
                    return
                } else if (Object.keys(hangmanGames).includes(alpha2)) {
                    const hangman = hangmanGames[alpha2 as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                if (alpha2 === "de") {
                                    bots[chatUser.groupUuid].sendMessage(
                                        `Aktuelles Wort: ${hangman.publicWord}`
                                    )
                                } else {
                                    bots[chatUser.groupUuid].sendMessage(
                                        `Current word: ${hangman.publicWord}`
                                    )
                                }
                                if (hangman.nextRound()) {
                                    if (alpha2 === "de") {
                                        bots[chatUser.groupUuid].sendMessage(
                                            `Du hast richtig geraten! Hier ist das nächste Wort: ${hangman.publicWord}`
                                        )
                                    } else {
                                        bots[chatUser.groupUuid].sendMessage(
                                            `You guessed correctly! Here's the next word: ${hangman.publicWord}`
                                        )
                                    }
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            if (alpha2 === "de") {
                                bots[chatUser.groupUuid].sendMessage(
                                    "Es läuft bereits ein Hangman-Spiel."
                                )
                            } else {
                                bots[chatUser.groupUuid].sendMessage(
                                    "Hangman is already running."
                                )
                            }
                        } else {
                            hangman.start()
                            if (alpha2 === "de") {
                                bots[chatUser.groupUuid].sendMessage(
                                    `Wir fangen ein Hangman-Spiel an: ${hangman.publicWord}`
                                )
                            } else {
                                bots[chatUser.groupUuid].sendMessage(
                                    `Started a hangman game: ${hangman.publicWord}`
                                )
                            }
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        bots[chatUser.groupUuid].sendMessage(
                            "So far, hangman is only supported in English and German."
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

            bots[chatUser.groupUuid].sendMessage(
                `${chatUser.user.username} has left the chat`
            )
        })
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
