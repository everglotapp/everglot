import type { User, Group } from "../../types/generated/graphql"
import type { ChatUser } from "../../types/chat"

type SocketHistory = {
    greeted: boolean
}
const socketHistories: Record<string, SocketHistory> = {}

const users: ChatUser[] = []

export function handleJoin(
    socket: EverglotChatSocket,
    user: Pick<User, "id" | "username" | "uuid" | "avatarUrl">,
    groupUuid: string
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

export function handleLeave(socket: EverglotChatSocket) {
    const index = users.findIndex((user) => user.socketId === socket.id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

/**
 * @returns The users currently in the given group's chat room.
 */
export function getGroupChatUsers(groupUuid: string) {
    return users
        .filter((user) => user.groupUuid === groupUuid)
        .map(({ user: { uuid, username, avatarUrl } }) => ({
            uuid,
            username,
            avatarUrl,
        }))
}

/**
 * @returns Whether user has been greeted before.
 */
export function hasBeenGreeted(user: ChatUser) {
    return socketHistories[user.socketId].greeted
}

/** Mark user as greeted. */
export function handleGreeted(user: ChatUser) {
    socketHistories[user.socketId].greeted = true
}

export default {
    handleJoin,
    handleLeave,
    handleGreeted,
    getCurrentUser,
    hasBeenGreeted,
    getGroupChatUsers,
}
