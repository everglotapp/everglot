import type { Group, User } from "../../types/generated/graphql"
import type { VoiceChatUser } from "../../types/call"
import log from "../../logger"

const chlog = log.child({
    namespace: "call",
})

const users: VoiceChatUser[] = []

export function getUsers(groupUuid: string) {
    return users.filter((user) => user.groupUuid === groupUuid)
}

export function userJoin(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
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

export function userLeave(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
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

export function userUpdateMeta(
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
