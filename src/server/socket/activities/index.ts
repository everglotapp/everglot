import { getGroupLanguageByUuid } from "../../groups"

import { HangmanLocale, HANGMAN_LOCALES } from "../../../constants"
import { HangmanGame } from "./hangman"

import log from "../../../logger"

import { GroupActivityKind } from "../../../types/activities"
import type { GroupActivity } from "../../../types/activities"
import type { Group } from "../../../types/generated/graphql"

import type { Server as SocketIO } from "socket.io"
import { getCurrentUser } from "../users"

const chlog = log.child({
    namespace: "activities",
})

const hangmanGames: Record<Group["uuid"], HangmanGame> = {} as const
const groupActivities: Record<Group["uuid"], GroupActivity | null> = {} as const

export function handleUserConnected(io: SocketIO, socket: EverglotChatSocket) {
    socket.on(
        "startGroupActivity",
        async ({ kind }: { kind: GroupActivityKind }) => {
            const chatUser = getCurrentUser(socket.id)
            if (!chatUser) {
                return
            }
            if (await startGroupActivity(chatUser.groupUuid, kind)) {
                io.to(chatUser.groupUuid).emit(
                    "groupActivity",
                    getGroupActivity(chatUser.groupUuid)
                )
            }
        }
    )
}

export function handleUserJoinedRoom(
    _io: SocketIO,
    socket: EverglotChatSocket,
    groupUuid: Group["uuid"]
) {
    // if (HANGMAN_LOCALES.some((locale) => locale === alpha2)) {
    //     const hangman = hangmanGames[alpha2 as HangmanLocale]
    //     if (hangman.running) {
    //         bots[chatUser.groupUuid].send("hangman-current-word", {
    //             word: hangman.publicWord,
    //         })
    //     }
    // }
    socket.emit("groupActivity", getGroupActivity(groupUuid))
}

export async function startGroupActivity(
    groupUuid: Group["uuid"],
    kind: GroupActivityKind
): Promise<GroupActivity | null> {
    if (typeof groupActivities[groupUuid] !== "undefined") {
        return null
    }
    if (kind === GroupActivityKind.Hangman) {
        groupActivities[groupUuid] = await makeHangmanActivity(groupUuid)
    } else {
        groupActivities[groupUuid] = {
            kind,
        }
    }
    return groupActivities[groupUuid]
}

export function endGroupActivity(groupUuid: Group["uuid"]) {
    if (typeof groupActivities[groupUuid] === "undefined") {
        return false
    }
    groupActivities[groupUuid] = null
    return true
}

export function getGroupActivity(
    groupUuid: Group["uuid"]
): GroupActivity | null {
    const activity = groupActivities[groupUuid]
    if (!activity) {
        return null
    }
    if (activity.kind === GroupActivityKind.Hangman) {
        return {
            kind: GroupActivityKind.Hangman,
            state: hangmanGames[groupUuid].publicState,
        }
    }
    return activity
}

async function makeHangmanActivity(
    groupUuid: Group["uuid"]
): Promise<GroupActivity | null> {
    const group = await getGroupLanguageByUuid(groupUuid)
    if (!group || !group.groupByUuid?.language?.alpha2) {
        chlog
            .child({
                groupUuid,
            })
            .debug("Group not found")
        return null
    }
    const alpha2 = group.groupByUuid?.language?.alpha2
    if (!HANGMAN_LOCALES.some((locale) => locale === alpha2)) {
        return null
    }
    hangmanGames[groupUuid] ||= new HangmanGame(alpha2 as HangmanLocale)
    return {
        kind: GroupActivityKind.Hangman,
        state: hangmanGames[groupUuid].publicState,
    }
}

export default {
    handleUserConnected,
    handleUserJoinedRoom,
}
