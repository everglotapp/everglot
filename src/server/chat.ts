import type { Server } from "http"
import socketio from "socket.io"
import { formatMessage } from "./messages"
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./users"
import { ALPHABET } from "../constants"

const botName = "Everglot Bot"

let hangmanRunning = {
    English: false,
    German: false,
}

export function start(server: Server) {
    const io = socketio(server)
    // Run when client connects
    io.on("connection", (socket) => {
        socket.on("joinRoom", ({ username, room }) => {
            const user = userJoin(socket.id, username, room)

            socket.join(user.room)

            // Welcome current user
            socket.emit(
                "message",
                formatMessage(botName, `Welcome to Everglot, ${username}!`)
            )

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
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", (msg) => {
            const user = getCurrentUser(socket.id)

            if (msg) {
                io.to(user.room).emit(
                    "message",
                    formatMessage(user.username, msg)
                )
                if (["English", "German"].includes(user.room)) {
                    if (hangmanRunning[user.room]) {
                        if (ALPHABET[user.room].includes(msg)) {
                            sendBotMessage(
                                `You have chosen letter ${msg}`,
                                user.room
                            )
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangmanRunning[user.room]) {
                            console.log(user.room)
                            sendBotMessage(
                                "Hangman is already running.",
                                user.room
                            )
                        } else {
                            hangmanRunning[user.room] = true
                            sendBotMessage("Started a hangman game.", user.room)
                        }
                    }
                } else {
                    sendBotMessage(
                        "So far, hangman is only supported in English and German.",
                        user.room
                    )
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

        function sendBotMessage(msg, room, delay = 300) {
            setTimeout(() => {
                io.to(room).emit("message", formatMessage(botName, msg))
            }, delay)
        }
    })
}

export default {
    start,
}
