import type { Group, User } from "../../types/generated/graphql"
import type { VoiceChatUser } from "../../types/voice-chat"

const users: VoiceChatUser[] = []

export function getUsers(groupUuid: string) {
    return users.filter((user) => user.groupUuid === groupUuid)
}

export function userJoin(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
    users.push({
        userUuid,
        groupUuid,
        joinedAt: new Date(),
        audioMuted: false,
        micMuted: false,
    })
}

export function userLeave(userUuid: User["uuid"], groupUuid: Group["uuid"]) {
    const index = users.findIndex(
        (user) => user.userUuid === userUuid && user.groupUuid === groupUuid
    )

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}
