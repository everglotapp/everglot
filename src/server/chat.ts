import type { Server } from "http"
import { Server as SocketIO } from "socket.io"

import session from "./middlewares/session"

import { formatMessage } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    userIsNew,
    userGreeted,
} from "./users"

import { performQuery } from "./gql"

import { hangmanGames } from "./hangman"
import type { HangmanLanguage } from "./hangman"

import type { Pool } from "pg"

const botName = "Everglot Bot"

export function start(server: Server, pool: Pool) {
    const io = new SocketIO(server)

    /** Reuse session/authentication from Express server. */
    const sessionMiddleware = session(pool)
    io.use((socket: EverglotChatSocket, next) => {
        sessionMiddleware(socket.request, {}, next)
    })

    // Run when client connects
    io.on("connection", (socket: EverglotChatSocket) => {
        const { session } = socket.request

        socket.on(
            "joinRoom",
            async ({ room }: { room: string; username: string }) => {
                const res = await performQuery(
                    `query ChatUser($id: Int!) {
                        user(id: $id) {
                            id
                            username
                            uuid
                        }
                    }`,
                    { id: session.user_id }
                )
                if (!res.data) {
                    console.log(
                        "Empty username for joining user",
                        session.user_id
                    )
                    return
                }
                const chatUser = userJoin(socket.id, res.data.user, room)
                socket.join(chatUser.room)
                if (userIsNew(chatUser)) {
                    // Welcome current user
                    sendBotMessage(
                        `Welcome to Everglot, ${chatUser.user.username}! Write !help to see available commands.`,
                        chatUser.room
                    )

                    userGreeted(chatUser)
                }

                socket.emit("welcome", {
                    user: {
                        uuid: chatUser.user.uuid,
                    },
                })

                // Broadcast when a user connects
                socket.broadcast
                    .to(chatUser.room)
                    .emit(
                        "message",
                        formatMessage(
                            botName,
                            `${chatUser.user.username} has joined the chat`
                        )
                    )

                // Send users and room info
                io.to(chatUser.room).emit("roomUsers", {
                    room: chatUser.room,
                    users: getRoomUsers(chatUser.room),
                })

                if (["English", "German"].includes(chatUser.room)) {
                    const hangman =
                        hangmanGames[chatUser.room as HangmanLanguage]
                    if (hangman.running) {
                        sendBotMessage(
                            `Current word: ${hangman.publicWord}`,
                            chatUser.room
                        )
                    }
                }
            }
        )

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", (msg) => {
            const chatUser = getCurrentUser(socket.id)
            if (!chatUser) {
                return
            }

            if (msg) {
                io.to(chatUser.room).emit(
                    "message",
                    formatMessage(
                        chatUser.user.username,
                        msg,
                        chatUser.user.uuid
                    )
                )
                if (msg.startsWith("!help")) {
                    sendBotMessage(
                        "Available commands: !hangman, !help",
                        chatUser.room
                    )
                    return
                } else if (Object.keys(hangmanGames).includes(chatUser.room)) {
                    const hangman =
                        hangmanGames[chatUser.room as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                sendBotMessage(
                                    `Current word: ${hangman.publicWord}`,
                                    chatUser.room
                                )
                                if (hangman.nextRound()) {
                                    sendBotMessage(
                                        `You guessed correctly! Here's the next word: ${hangman.publicWord}`,
                                        chatUser.room
                                    )
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            sendBotMessage(
                                "Hangman is already running.",
                                chatUser.room
                            )
                        } else {
                            hangman.start()
                            sendBotMessage(
                                `Started a hangman game: ${hangman.publicWord}`,
                                chatUser.room
                            )
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        sendBotMessage(
                            "So far, hangman is only supported in English and German.",
                            chatUser.room
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
                chatUser.room
            )

            // Send users and room info
            io.to(chatUser.room).emit("roomUsers", {
                room: chatUser.room,
                users: getRoomUsers(chatUser.room),
            })
        })

        function sendBotMessage(msg: string, room: string, delay = 300) {
            setTimeout(() => {
                io.to(room).emit("message", formatMessage(botName, msg))
            }, delay)
        }
    })
}

export default {
    start,
}
