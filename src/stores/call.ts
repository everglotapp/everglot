import { writable, derived, get } from "svelte/store"
import { groupUuid } from "."
import type { Group } from "../types/generated/graphql"

import type { VoiceChatUser } from "../types/call"

type CallUserRecord = Record<string, readonly VoiceChatUser[]>

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

export function setCallUserMeta(
    userUuid: string,
    groupUuid: string,
    callMeta: Pick<VoiceChatUser, "micMuted" | "audioMuted">
) {
    const $callUsers = get(callUsers)
    const withUpdatedUser = (
        users: readonly VoiceChatUser[]
    ): readonly VoiceChatUser[] => {
        const res = [...users]
        const index = res.findIndex((user) => user.uuid === userUuid)
        if (index === -1) {
            res.push({
                uuid: userUuid,
                groupUuid,
                ...callMeta,
                joinedAt: new Date(),
            })
        } else {
            res[index] = { ...res[index], ...callMeta }
        }
        return res
    }
    callUsers.set({
        ...$callUsers,
        [groupUuid]: $callUsers.hasOwnProperty(groupUuid)
            ? withUpdatedUser($callUsers[groupUuid])
            : withUpdatedUser([]),
    })
}

export function removeUserFromCall(userUuid: string, groupUuid: string) {
    const $callUsers = get(callUsers)
    const withoutUser = (
        users: readonly VoiceChatUser[]
    ): readonly VoiceChatUser[] => {
        const index = users.findIndex((user) => user.uuid === userUuid)
        if (index === -1) {
            return users
        }
        const res = [...users]
        res.splice(index, 1)
        return res
    }
    callUsers.set({
        ...$callUsers,
        [groupUuid]: $callUsers.hasOwnProperty(groupUuid)
            ? withoutUser($callUsers[groupUuid])
            : [],
    })
}

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
