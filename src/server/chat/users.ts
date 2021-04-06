import type { Language, User, Group } from "../../types/generated/graphql"

type SocketHistory = {
    greeted: boolean
}
const socketHistories: Record<string, SocketHistory> = {}

export type ChatUser = {
    socketId: string
    user: Pick<User, "id" | "username" | "uuid" | "avatarUrl">
    groupUuid: Group["uuid"]
}

const users: ChatUser[] = []

// Join user to chat
export function userJoin(
    socketId: string,
    user: Pick<User, "id" | "username" | "uuid" | "avatarUrl">,
    groupUuid: Group["uuid"]
) {
    const chatUser = { socketId, user, groupUuid }

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
export function getGroupChatUsers(groupUuid: Group["uuid"]) {
    return users
        .filter((user) => user.groupUuid === groupUuid)
        .map(({ user: { uuid, username, avatarUrl } }) => ({
            uuid,
            username,
            avatarUrl,
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
