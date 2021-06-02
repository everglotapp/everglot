import { bots } from "../index"

import hangman from "./hangman"

import log from "../../../logger"

import { GroupActivityKind } from "../../../types/activities"
import type { Group } from "../../../types/generated/graphql"

import type { Server as SocketIO } from "socket.io"
import { getCurrentUser } from "../users"
import { endGroupActivity, getGroupActivity, startGroupActivity } from "./utils"
import wouldYouRather, { games as wouldYouRatherGames } from "./wouldYouRather"

const chlog = log.child({
    namespace: "activities",
})

let endWouldYouRatherActivityTimeout: NodeJS.Timeout | null = null

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
            const groupUuid = chatUser.groupUuid
            const userUuid = chatUser.user.uuid
            const activity = await startGroupActivity(groupUuid, kind)
            if (!activity) {
                return
            }
            chlog
                .child({
                    groupUuid,
                    userUuid,
                    activity,
                })
                .debug("User successfully started group activity")
            io.to(groupUuid).emit("groupActivity", getGroupActivity(groupUuid))
            if (activity.kind === GroupActivityKind.WouldYouRather) {
                const game = wouldYouRatherGames[groupUuid]
                if (endWouldYouRatherActivityTimeout) {
                    clearTimeout(endWouldYouRatherActivityTimeout)
                    endWouldYouRatherActivityTimeout = setTimeout(() => {
                        delete wouldYouRatherGames[groupUuid]
                        const endedActivity = endGroupActivity(groupUuid)

                        if (
                            endedActivity &&
                            endedActivity.kind ===
                                GroupActivityKind.WouldYouRather
                        ) {
                            if (wouldYouRatherGames.hasOwnProperty(groupUuid)) {
                                delete wouldYouRatherGames[groupUuid]
                            }
                        }
                        io.to(groupUuid).emit(
                            "groupActivity",
                            getGroupActivity(groupUuid)
                        )
                    }, game.endTime?.getTime()! - Date.now())
                }
            }
            const bot = bots[groupUuid]
            if (bot) {
                if (activity.kind === GroupActivityKind.Hangman) {
                    bot.send("hangman-started", {
                        username: chatUser.user.username || "?",
                    })
                } else if (activity.kind === GroupActivityKind.WouldYouRather) {
                    const game = wouldYouRatherGames[groupUuid]
                    bot.send("would-you-rather-started", {
                        username: chatUser.user.username || "?",
                        question: game.question!.question,
                    })
                }
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
        const groupUuid = chatUser.groupUuid
        const userUuid = chatUser.user.uuid
        const endedActivity = endGroupActivity(groupUuid)
        if (!endedActivity) {
            return
        }
        chlog
            .child({
                groupUuid,
                userUuid,
            })
            .debug("User successfully ended group activity")
        io.to(chatUser.groupUuid).emit(
            "groupActivity",
            getGroupActivity(groupUuid)
        )
        const bot = bots[groupUuid]
        if (bot) {
            if (endedActivity.kind === GroupActivityKind.Hangman) {
                bot.send("hangman-ended", {
                    username: chatUser.user.username || "?",
                })
            } else if (
                endedActivity.kind === GroupActivityKind.WouldYouRather
            ) {
                bot.send("would-you-rather-ended", {
                    username: chatUser.user.username || "?",
                })
            }
        }
    })

    hangman.handleUserConnected(io, socket)
    wouldYouRather.handleUserConnected(io, socket)
}

export function handleUserJoinedRoom(
    _io: SocketIO,
    socket: EverglotChatSocket,
    groupUuid: Group["uuid"]
) {
    socket.emit("groupActivity", getGroupActivity(groupUuid))
}

export default {
    handleUserConnected,
    handleUserJoinedRoom,
}
