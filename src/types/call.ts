import type { Group, User } from "./generated/graphql"

export type VoiceChatUser = {
    uuid: User["uuid"]
    groupUuid: Group["uuid"]
    joinedAt: Date
    micMuted: boolean
    audioMuted: boolean
}
