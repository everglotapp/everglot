import type { User, Group } from "../../types/generated/graphql"
import type { ChatUser } from "../../types/chat"

type SocketHistory = {
    greeted: boolean
}
const socketHistories: Record<string, SocketHistory> = {}

const users: ChatUser[] = []

// Join user to chat
export function userJoin(
    socket: EverglotChatSocket,
    user: Pick<User, "id" | "username" | "uuid" | "avatarUrl">,
    groupUuid: Group["uuid"]
) {
    const chatUser = {
        socketId: socket.id,
        user,
        groupUuid,
        joinedAt: new Date(),
    }

    let existingUser = getCurrentUser(socket)
    if (existingUser) {
        existingUser = {
            ...existingUser,
            user,
            groupUuid,
        }
        return existingUser
    } else {
        users.push(chatUser)
        socketHistories[socket.id] ||= { greeted: false }
        return chatUser
    }
}

// Get current user
export function getCurrentUser(socket: EverglotChatSocket) {
    const { session } = socket.request
    if (!session.user_id) {
        return null
    }
    return (
        users.find(
            (user) =>
                user.socketId === socket.id && user.user.id === session.user_id
        ) || null
    )
}

// User leaves chat
export function userLeave(socket: EverglotChatSocket) {
    const index = users.findIndex((user) => user.socketId === socket.id)

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
