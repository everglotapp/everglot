import type { Server } from "http"
import { Server as SocketIO } from "socket.io"
import { validate as uuidValidate } from "uuid"

import session from "../middlewares/session"

import { createMessage, formatMessage } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    getGroupChatUsers,
    userIsNew,
    userGreeted,
} from "./users"

import { performQuery } from "../gql"

import { hangmanGames } from "./hangman"
import type { HangmanLanguage } from "./hangman"

import type { Pool } from "pg"
import type { ChatUserQuery, Group } from "../../types/generated/graphql"
import { getGroupIdByUuid } from "../groups"

export function start(server: Server, pool: Pool) {
    const io = new SocketIO(server)

    /** Reuse session/authentication from Express server. */
    const sessionMiddleware = session(pool)
    io.use((socket: EverglotChatSocket, next) => {
        // @ts-ignore
        sessionMiddleware(socket.request, {}, next)
    })

    // Run when client connects
    io.on("connection", (socket: EverglotChatSocket) => {
        const { session } = socket.request

        socket.on("joinRoom", async ({ groupUuid }: { groupUuid: string }) => {
            const res = await performQuery<ChatUserQuery>(
                `query ChatUser($id: Int!) {
                        user(id: $id) {
                            id
                            username
                            uuid
                            avatarUrl
                        }
                    }`,
                { id: session.user_id }
            )
            if (
                !res.data ||
                !res.data.user ||
                !res.data?.user?.username?.length
            ) {
                console.log("Insufficient chat user result", {
                    sessionUserId: session.user_id,
                    res,
                })
                return
            }
            // TODO: Check that this is an actual group UUID and that
            // the user is part of this group.
            if (!groupUuid || !uuidValidate(groupUuid)) {
                console.log("Bad group UUID", {
                    groupUuid,
                })
                return
            }
            const chatUser = userJoin(socket.id, res.data.user, groupUuid)
            socket.join(groupUuid)
            if (userIsNew(chatUser)) {
                // Welcome current user
                sendBotMessage(
                    `Welcome to Everglot, ${chatUser.user.username}! Write !help to see available commands.`,
                    groupUuid
                )

                userGreeted(chatUser)
            }

            socket.emit("welcome", {
                groupUuid,
                user: {
                    uuid: chatUser.user.uuid,
                },
            })

            // Broadcast when a user connects
            socket.broadcast
                .to(chatUser.groupUuid)
                .emit(
                    "message",
                    formatMessage(
                        `${chatUser.user.username} has joined the chat`
                    )
                )

            // TODO: Get language from group.
            if (["English", "German"].includes(chatUser.groupUuid)) {
                const hangman =
                    hangmanGames[chatUser.groupUuid as HangmanLanguage]
                if (hangman.running) {
                    sendBotMessage(
                        `Current word: ${hangman.publicWord}`,
                        chatUser.groupUuid
                    )
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
                    console.log(
                        "Failed to get group ID by UUID for user message",
                        {
                            groupUuid: chatUser.groupUuid,
                        }
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
                    console.log("User text message creation failed", message)
                    return
                }

                if (msg.startsWith("!help")) {
                    sendBotMessage(
                        "Available commands: !hangman, !help",
                        chatUser.groupUuid
                    )
                    return
                } else if (
                    Object.keys(hangmanGames).includes(chatUser.groupUuid)
                ) {
                    const hangman =
                        hangmanGames[chatUser.groupUuid as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                sendBotMessage(
                                    `Current word: ${hangman.publicWord}`,
                                    chatUser.groupUuid
                                )
                                if (hangman.nextRound()) {
                                    sendBotMessage(
                                        `You guessed correctly! Here's the next word: ${hangman.publicWord}`,
                                        chatUser.groupUuid
                                    )
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            sendBotMessage(
                                "Hangman is already running.",
                                chatUser.groupUuid
                            )
                        } else {
                            hangman.start()
                            sendBotMessage(
                                `Started a hangman game: ${hangman.publicWord}`,
                                chatUser.groupUuid
                            )
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        sendBotMessage(
                            "So far, hangman is only supported in English and German.",
                            chatUser.groupUuid
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

            sendBotMessage(
                `${chatUser.user.username} has left the chat`,
                chatUser.groupUuid
            )
        })

        function sendBotMessage(
            msg: string,
            groupUuid: Group["uuid"],
            delay = 300
        ) {
            setTimeout(async () => {
                const recipientGroupId = await getGroupIdByUuid(groupUuid)
                if (!recipientGroupId) {
                    console.log(
                        "Failed to get group ID by UUID for bot message",
                        { groupUuid, msg }
                    )
                    return
                }
                const message = await createMessage({
                    body: msg,
                    recipientGroupId,
                    recipientId: null,
                    senderId: null,
                })
                if (message && message.message) {
                    io.to(groupUuid).emit("message", {
                        uuid: message.message.uuid,
                        userUuid: message.sender?.uuid || null,
                        text: msg,
                        time: message.message.createdAt,
                    })
                } else {
                    console.log("Bot message creation failed", message)
                }
            }, delay)
        }
    })
}

export default {
    start,
}
