import { getChatUserByUserId } from "./utils"
import { authenticateUserInGroup } from "../auth"

import type { Group, User } from "../../types/generated/graphql"
import type { VoiceChatUser } from "../../types/call"
import log from "../../logger"
import { getAllGroupUuids } from "../groups"

import type { Server as SocketIO } from "socket.io"

const chlog = log.child({
    namespace: "call",
})

const users: VoiceChatUser[] = []

export function handleUserConnected(_io: SocketIO, socket: EverglotChatSocket) {
    const { session } = socket.request

    socket.on("userJoinCall", async ({ groupUuid }: { groupUuid: string }) => {
        const userId = session.user_id
        const userMeta = await getChatUserByUserId(userId)
        if (!userMeta) {
            chlog
                .child({ userId, groupUuid })
                .error("Failed to get group call user metadata")
            return
        }
        if (!authenticateUserInGroup(userId, groupUuid)) {
            chlog
                .child({ userId, groupUuid })
                .debug("User is not in group but tried to join call")
            return
        }
        if (!userJoin(userMeta.uuid, groupUuid)) {
            return
        }
        socket.broadcast.to(groupUuid).emit("callUsers", getUsers(groupUuid))
    })

    socket.on("userLeaveCall", async ({ groupUuid }: { groupUuid: string }) => {
        const userId = session.user_id
        const userMeta = await getChatUserByUserId(userId)
        if (!userMeta) {
            chlog
                .child({ userId, groupUuid })
                .error("Failed to get group call user metadata")
            return
        }
        if (!authenticateUserInGroup(userId, groupUuid)) {
            chlog
                .child({ userId, groupUuid })
                .debug("User is not in group but tried to leave call")
            return
        }
        if (!userLeave(userMeta.uuid, groupUuid)) {
            return
        }
        socket.broadcast.to(groupUuid).emit("callUsers", getUsers(groupUuid))
    })

    socket.on(
        "userCallMeta",
        async ({
            groupUuid,
            callMeta,
        }: {
            groupUuid: string
            callMeta: Pick<VoiceChatUser, "micMuted" | "audioMuted">
        }) => {
            const userId = session.user_id
            const userMeta = await getChatUserByUserId(userId)
            if (!userMeta) {
                chlog
                    .child({ userId, groupUuid })
                    .error("Failed to get group call user metadata")
                return
            }
            if (!authenticateUserInGroup(userId, groupUuid)) {
                chlog
                    .child({ userId, groupUuid })
                    .debug("User is not in group but tried to join call")
                return
            }
            if (!userUpdateMeta(userMeta.uuid, groupUuid, callMeta)) {
                return
            }
            socket.broadcast
                .to(groupUuid)
                .emit("callUsers", getUsers(groupUuid))
        }
    )

    setInterval(async () => {
        const groupUuids = await getAllGroupUuids()
        if (!groupUuids) {
            chlog.error("Failed to get group UUIDs to send call users")
            return
        }
        for (const groupUuid of groupUuids) {
            socket.broadcast
                .to(groupUuid)
                .emit("callUsers", getUsers(groupUuid))
        }
    }, 5000)
}

export function handleUserJoinedRoom(
    _io: SocketIO,
    socket: EverglotChatSocket,
    groupUuid: Group["uuid"]
) {
    socket.emit("callUsers", getUsers(groupUuid))
}

function getUsers(groupUuid: string) {
    return users.filter((user) => user.groupUuid === groupUuid)
}

function userJoin(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
    chlog
        .child({ userUuid, groupUuid })
        .trace("User claims to have joined group call")
    if (
        users.some(
            (user) => user.uuid === userUuid && user.groupUuid === groupUuid
        )
    ) {
        chlog
            .child({ userUuid, groupUuid })
            .debug("User already in group call, preventing join")
        return false
    }
    users.push({
        uuid: userUuid,
        groupUuid,
        joinedAt: new Date(),
        audioMuted: false,
        micMuted: false,
    })
    return true
}

function userLeave(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
    const index = users.findIndex(
        (user) => user.uuid === userUuid && user.groupUuid === groupUuid
    )
    chlog
        .child({ userUuid, groupUuid })
        .trace("User claims to have left group call")

    if (index === -1) {
        chlog
            .child({ userUuid, groupUuid })
            .debug("User is not in group call, preventing leave")
        return false
    } else {
        return users.splice(index, 1)[0]
    }
}

function userUpdateMeta(
    userUuid: User["uuid"],
    groupUuid: Group["uuid"],
    meta: Pick<VoiceChatUser, "micMuted" | "audioMuted">
) {
    const index = users.findIndex(
        (user) => user.uuid === userUuid && user.groupUuid === groupUuid
    )
    chlog.child({ userUuid, groupUuid }).trace("User sent call meta")

    if (index === -1) {
        chlog
            .child({ userUuid, groupUuid })
            .debug("User is not in group call, preventing leave")
        return false
    } else {
        users[index] = {
            ...users[index],
            micMuted: Boolean(meta.micMuted),
            audioMuted: Boolean(meta.audioMuted),
        }
        return true
    }
}
export default {
    handleUserConnected,
    handleUserJoinedRoom,
}
