import type { Server } from "http"
import socketio from "socket.io"
import { formatMessage } from "./messages"
import { userJoin, getCurrentUser, userLeave, getRoomUsers } from "./users"

const botName = "Everglot Bot"

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

            io.to(user.room).emit("message", formatMessage(user.username, msg))
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
    })
}

export default {
    start,
}
