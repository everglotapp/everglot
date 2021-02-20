import type { Language } from "./rooms"

type SocketHistory = {
    greeted: boolean
}
const socketHistories: Record<string, SocketHistory> = {}

export type User = {
    socketId: string
    username: string
    room: Language["enName"]
}

const users: User[] = []

// Join user to chat
export function userJoin(
    socketId: string,
    username: string,
    room: Language["enName"]
) {
    const user = { socketId, username, room }

    users.push(user)
    socketHistories[socketId] ||= { greeted: false }

    return user
}

// Get current user
export function getCurrentUser(socketId: string) {
    return users.find((user) => user.socketId === socketId)
}

// User leaves chat
export function userLeave(socketId: string) {
    const index = users.findIndex((user) => user.socketId === socketId)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

// Get room users
export function getRoomUsers(room: Language["enName"]) {
    return users.filter((user) => user.room === room)
}

// Whether user has been greeted before.
export function userIsNew(user: User) {
    return !socketHistories[user.socketId].greeted
}

// Mark user as greeted.
export function userGreeted(user: User) {
    socketHistories[user.socketId].greeted = true
}
