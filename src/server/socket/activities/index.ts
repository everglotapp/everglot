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
            const chatUser = getCurrentUser(socket)
            if (!chatUser) {
                chlog
                    .child({ kind, socketId: socket.id })
                    .debug("User trying to start group activity not found")
                return
            }
            const activity = await startGroupActivity(chatUser.groupUuid, kind)
            if (activity) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        activity,
                    })
                    .debug("User successfully started group activity")
                io.to(chatUser.groupUuid).emit(
                    "groupActivity",
                    getGroupActivity(chatUser.groupUuid)
                )
            }
        }
    )
    socket.on("endGroupActivity", async () => {
        const chatUser = getCurrentUser(socket)
        if (!chatUser) {
            chlog
                .child({ socketId: socket.id })
                .debug("User trying to end group activity not found")
            return
        }
        if (endGroupActivity(chatUser.groupUuid)) {
            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                    userUuid: chatUser.user.uuid,
                })
                .debug("User successfully ended group activity")
            io.to(chatUser.groupUuid).emit(
                "groupActivity",
                getGroupActivity(chatUser.groupUuid)
            )
        }
    })
    socket.on(
        "groupActivity.hangmanGuess",
        async ({ guess }: { guess: string }) => {
            const chatUser = getCurrentUser(socket)
            if (!chatUser) {
                chlog
                    .child({ socketId: socket.id, guess })
                    .debug("User trying to guess in hangman not found")
                return
            }
            const activity = getGroupActivity(chatUser.groupUuid)
            if (!activity) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                    })
                    .debug(
                        "User attempted hangman guess but no activity is running for their group"
                    )
                return
            }
            if (activity.kind !== GroupActivityKind.Hangman) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                    })
                    .debug(
                        "User attempted hangman guess but current group activity is not hangman"
                    )
                return
            }
            // TODO: allow word guesses
            const game = hangmanGames[chatUser.groupUuid]!
            if (
                guess.length !== 1 ||
                game.letterPicked(guess) ||
                !game.letterAvailable(guess)
            ) {
                chlog
                    .child({
                        groupUuid: chatUser.groupUuid,
                        userUuid: chatUser.user.uuid,
                        guess,
                    })
                    .debug("User attempted hangman guess but guess was invalid")
                return
            }
            const success = game.pickLetter(guess)
            // Tell group users about the guess and whether it was successful.
            io.to(chatUser.groupUuid).emit("groupActivity.hangmanGuess", {
                guess,
                success,
                userUuid: chatUser.user.uuid,
            })

            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                    userUuid: chatUser.user.uuid,
                    guess,
                    success,
                })
                .debug("User attempted hangman guess")
            // Tell group users about the new game state.
            io.to(chatUser.groupUuid).emit(
                "groupActivity",
                getGroupActivity(chatUser.groupUuid)
            )
            setTimeout(async () => {
                if (await game.nextRound()) {
                    chlog
                        .child({
                            groupUuid: chatUser.groupUuid,
                            userUuid: chatUser.user.uuid,
                        })
                        .debug("Hangman game proceeded to next round")
                    io.to(chatUser.groupUuid).emit(
                        "groupActivity",
                        getGroupActivity(chatUser.groupUuid)
                    )
                }
            }, 6000)
        }
    )
}

export function handleUserJoinedRoom(
    _io: SocketIO,
    socket: EverglotChatSocket,
    groupUuid: Group["uuid"]
) {
    socket.emit("groupActivity", getGroupActivity(groupUuid))
}

export async function startGroupActivity(
    groupUuid: Group["uuid"],
    kind: GroupActivityKind
): Promise<GroupActivity | null> {
    if (groupActivities[groupUuid]) {
        chlog
            .child({
                groupUuid,
            })
            .debug("An activity is already running for this group")
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
    if (!groupActivities[groupUuid]) {
        chlog
            .child({
                groupUuid,
            })
            .debug("No activity is running for this group")
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
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support hangman")
        return null
    }
    const game = (hangmanGames[groupUuid] ||= new HangmanGame(
        alpha2 as HangmanLocale
    ))
    if (!(await game.start())) {
        delete hangmanGames[groupUuid]
        return null
    }
    return {
        kind: GroupActivityKind.Hangman,
        state: game.publicState,
    }
}

export default {
    handleUserConnected,
    handleUserJoinedRoom,
}
