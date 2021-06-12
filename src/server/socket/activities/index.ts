import hangman from "./hangman"
import guessCharacter from "./guessCharacter"
import wouldYouRather from "./wouldYouRather"
import randomQuestion from "./randomQuestion"

import log from "../../../logger"

import { GroupActivity, GroupActivityKind } from "../../../types/activities"

import type { Server as SocketIO } from "socket.io"
import { getCurrentUser } from "../users"
import { endGroupActivity, getGroupActivity, startGroupActivity } from "./utils"

const chlog = log.child({
    namespace: "activities",
})

export async function handleUserConnected(
    io: SocketIO,
    socket: EverglotChatSocket
) {
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
            const {
                groupUuid,
                user: { uuid: userUuid },
            } = chatUser
            const activity = await startGroupActivity(groupUuid, kind)
            if (!activity) {
                // Send this to the creating client so it knows the creation failed.
                socket.emit("startGroupActivity.failure")
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

            const module = getActivityModule(activity)
            if (module) {
                await module.handleStarted(io, chatUser, activity)
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
        const {
            groupUuid,
            user: { uuid: userUuid },
        } = chatUser
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

        const module = getActivityModule(endedActivity)
        if (module) {
            await module.handleEnded(io, chatUser, endedActivity)
        }
    })

    for (const module of [
        hangman,
        guessCharacter,
        wouldYouRather,
        randomQuestion,
    ]) {
        await module.handleUserConnected(io, socket)
    }
}

export function handleUserJoinedRoom(
    _io: SocketIO,
    socket: EverglotChatSocket,
    groupUuid: string
) {
    socket.emit("groupActivity", getGroupActivity(groupUuid))
}

function getActivityModule(activity: GroupActivity) {
    if (activity.kind === GroupActivityKind.WouldYouRather) {
        return wouldYouRather
    } else if (activity.kind === GroupActivityKind.Hangman) {
        return hangman
    } else if (activity.kind === GroupActivityKind.RandomQuestion) {
        return randomQuestion
    } else if (activity.kind === GroupActivityKind.GuessCharacter) {
        return guessCharacter
    }
}

export default {
    handleUserConnected,
    handleUserJoinedRoom,
}
