import type { Language, User } from "../types/generated/graphql"

type SocketHistory = {
    greeted: boolean
}
const socketHistories: Record<string, SocketHistory> = {}

export type ChatUser = {
    socketId: string
    user: Pick<User, "id" | "username" | "uuid">
    room: Language["englishName"]
}

const users: ChatUser[] = []

// Join user to chat
export function userJoin(
    socketId: string,
    user: Pick<User, "id" | "username" | "uuid">,
    room: Language["englishName"]
) {
    const chatUser = { socketId, user, room }

    users.push(chatUser)
    socketHistories[socketId] ||= { greeted: false }

    return chatUser
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
export function getRoomUsers(room: Language["englishName"]) {
    return users
        .filter((user) => user.room === room)
        .map(({ user: { uuid, username } }) => ({
            uuid,
            username,
        }))
}

// Whether user has been greeted before.
export function userIsNew(user: ChatUser) {
    return !socketHistories[user.socketId].greeted
}

// Mark user as greeted.
export function userGreeted(user: ChatUser) {
    socketHistories[user.socketId].greeted = true
}
