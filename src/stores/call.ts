import { writable, derived } from "svelte/store"
import { groupUuid } from "."
import type { Group } from "../types/generated/graphql"

import type { VoiceChatUser } from "../types/call"

type CallUserRecord = Record<Group["uuid"], readonly VoiceChatUser[]>

const callUsers = writable<CallUserRecord>({})
const NO_USERS: readonly VoiceChatUser[] = [] as const

export const usersInCurrentCall = derived(
    [groupUuid, callUsers],
    ([$groupUuid, $callUsers]) => {
        if ($groupUuid === null) {
            return NO_USERS
        }
        return $callUsers[$groupUuid] || NO_USERS
    }
)

export function setUsersInCall(users: VoiceChatUser[]) {
    callUsers.set(
        users.reduce(
            (map: CallUserRecord, user) => ({
                ...map,
                [user.groupUuid]: [...(map[user.groupUuid] || []), user],
            }),
            {}
        )
    )
}
