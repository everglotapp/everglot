import type { Server } from "http"
import socketio from "socket.io"
import { formatMessage } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers,
    userIsNew,
    userGreeted,
} from "./users"
import { hangmanGames } from "./hangman"
import type { HangmanLanguage } from "./hangman"

const botName = "Everglot Bot"

export function start(server: Server) {
    const io = socketio(server)
    // Run when client connects
    io.on("connection", (socket: socketio.Socket) => {
        socket.on("joinRoom", ({ username, room }) => {
            const user = userJoin(socket.id, username, room)

            socket.join(user.room)

            if (userIsNew(user)) {
                // Welcome current user
                io.to(user.room).emit(
                    "message",
                    formatMessage(
                        botName,
                        `Welcome to Everglot, ${username}! Write !help to see available commands.`
                    )
                )
                userGreeted(user)
            }

            // Broadcast when a user connects
            socket.broadcast
                .to(user.room)
                .emit(
                    "message",
                    formatMessage(
                        botName,
                        `${user.username} has joined the chat`
                    )
                )

            // Send users and room info
            io.to(user.room).emit("roomUsers", {
                room: user.room,
                users: getRoomUsers(user.room),
            })

            if (["English", "German"].includes(user.room)) {
                const hangman = hangmanGames[user.room as HangmanLanguage]
                if (hangman.running) {
                    sendBotMessage(
                        `Current word: ${hangman.publicWord}`,
                        user.room
                    )
                }
            }
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", (msg) => {
            const user = getCurrentUser(socket.id)
            if (!user) {
                return
            }

            if (msg) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(user.username, msg)
                )
                if (msg.startsWith("!help")) {
                    sendBotMessage(
                        "Available commands: !hangman, !help",
                        user.room
                    )
                    return
                } else if (Object.keys(hangmanGames).includes(user.room)) {
                    const hangman = hangmanGames[user.room as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                sendBotMessage(
                                    `Current word: ${hangman.publicWord}`,
                                    user.room
                                )
                                if (hangman.nextRound()) {
                                    sendBotMessage(
                                        `You guessed correctly! Here's the next word: ${hangman.publicWord}`,
                                        user.room
                                    )
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            sendBotMessage(
                                "Hangman is already running.",
                                user.room
                            )
                        } else {
                            hangman.start()
                            sendBotMessage(
                                `Started a hangman game: ${hangman.publicWord}`,
                                user.room
                            )
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        sendBotMessage(
                            "So far, hangman is only supported in English and German.",
                            user.room
                        )
                    }
                }
            }
        })

        // Runs when client disconnects
        socket.on("disconnect", () => {
            const user = userLeave(socket.id)

            if (user) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(botName, `${user.username} has left the chat`)
                )

                // Send users and room info
                io.to(user.room).emit("roomUsers", {
                    room: user.room,
                    users: getRoomUsers(user.room),
                })
            }
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
