import { Server as SocketIO } from "socket.io"
import { validate as uuidValidate } from "uuid"

import log from "../../logger"

import session from "../middlewares/session"

import { createMessage, formatMessage } from "./messages"
import {
    userJoin,
    getCurrentUser,
    userLeave,
    userIsNew,
    userGreeted,
} from "./users"

import { performQuery } from "../gql"

import { hangmanGames } from "./hangman"
import type { HangmanLanguage } from "./hangman"

import type { Pool } from "pg"
import type {
    ChatGroupByUuidQuery,
    ChatUserQuery,
    Group,
    Language,
} from "../../types/generated/graphql"
import { getGroupIdByUuid } from "../groups"

import { translate } from "./locales"

import type { Server } from "http"
import type { FluentVariable } from "@fluent/bundle"

const chlog = log.child({
    namespace: "chat",
})

class Bot {
    groupUuid: Group["uuid"]
    locale: Language["alpha2"]
    io: SocketIO

    constructor(
        groupUuid: Group["uuid"],
        locale: Language["alpha2"],
        io: SocketIO
    ) {
        this.groupUuid = groupUuid
        this.locale = locale
        this.io = io
    }

    async send(
        fluentMessageId: string,
        args?: Record<string, FluentVariable>,
        errors?: Error[]
    ) {
        let welcome = await translate(this.locale)(
            fluentMessageId,
            args,
            errors
        )
        if (welcome) {
            this.sendMessage(welcome)
        }
    }

    async sendMessage(msg: string, delay = 300) {
        const recipientGroupId = await getGroupIdByUuid(this.groupUuid)
        if (!recipientGroupId) {
            chlog
                .child({ groupUuid: this.groupUuid, msg })
                .error("Failed to get group ID by UUID for bot message")
            return
        }
        const message = await createMessage({
            body: msg,
            recipientGroupId,
            recipientId: null,
            senderId: null,
        })
        if (!message || !message.message) {
            chlog.error("Bot message creation failed", JSON.stringify(message))
            return
        }
        setTimeout(async () => {
            this.io.to(this.groupUuid).emit("message", {
                uuid: message.message!.uuid,
                userUuid: message.sender?.uuid || null,
                text: msg,
                time: message.message!.createdAt,
            })
        }, delay)
    }
}

export function start(server: Server, pool: Pool) {
    const io = new SocketIO(server)

    /** Reuse session/authentication from Express server. */
    const sessionMiddleware = session(pool)
    io.use((socket: EverglotChatSocket, next) => {
        // @ts-ignore
        sessionMiddleware(socket.request, {}, next)
    })

    const bots: Record<Group["uuid"], Bot> = {}
    async function sendBotMessage(
        msg: string,
        groupUuid: Group["uuid"],
        delay = 300
    ) {
        return bots[groupUuid].sendMessage(msg, delay)
    }

    // Run when client connects
    io.on("connection", (socket: EverglotChatSocket) => {
        const { session } = socket.request

        socket.on("joinRoom", async ({ groupUuid }: { groupUuid: string }) => {
            const res = await performQuery<ChatUserQuery>(
                `query ChatUser($id: Int!) {
                        user(id: $id) {
                            id
                            username
                            uuid
                            avatarUrl
                        }
                    }`,
                { id: session.user_id }
            )
            if (
                !res.data ||
                !res.data.user ||
                !res.data?.user?.username?.length
            ) {
                chlog.warn(
                    "Insufficient chat user result",
                    JSON.stringify({
                        sessionUserId: session.user_id,
                        res,
                    })
                )
                return
            }
            // TODO: Check that this is an actual group UUID and that
            // the user is part of this group.
            if (!groupUuid || !uuidValidate(groupUuid)) {
                chlog.info(
                    "Bad group UUID",
                    JSON.stringify({
                        groupUuid,
                    })
                )
                return
            }
            const group = await getChatGroupByUuid(groupUuid)
            if (!group || !group.groupByUuid?.language?.alpha2) {
                chlog.info(
                    "Group not found",
                    JSON.stringify({
                        groupUuid,
                    })
                )
                return
            }
            bots[groupUuid] ||= new Bot(
                groupUuid,
                group.groupByUuid?.language?.alpha2,
                io
            )

            const alpha2 = group.groupByUuid?.language?.alpha2
            const chatUser = userJoin(socket.id, res.data.user, groupUuid)
            socket.join(groupUuid)
            if (userIsNew(chatUser) && chatUser?.user?.username) {
                bots[groupUuid].send("welcome", {
                    username: chatUser.user.username,
                })

                let welcome = await translate(alpha2)("welcome", {
                    username: chatUser.user.username,
                })
                if (welcome) {
                    sendBotMessage(welcome, groupUuid)
                }

                userGreeted(chatUser)
            }

            socket.emit("welcome", {
                groupUuid,
                user: {
                    uuid: chatUser.user.uuid,
                },
            })

            // Broadcast when a user connects
            if (alpha2 === "de") {
                socket.broadcast
                    .to(chatUser.groupUuid)
                    .emit(
                        "message",
                        formatMessage(
                            `${chatUser.user.username} ist dem Chat beigetreten.`
                        )
                    )
            } else {
                socket.broadcast
                    .to(chatUser.groupUuid)
                    .emit(
                        "message",
                        formatMessage(
                            `${chatUser.user.username} has joined the chat.`
                        )
                    )
            }

            // TODO: Get language from group.
            if (["de", "en"].includes(alpha2)) {
                const hangman = hangmanGames[alpha2 as HangmanLanguage]
                if (hangman.running) {
                    if (alpha2 === "de") {
                        sendBotMessage(
                            `Aktuelles Wort: ${hangman.publicWord}`,
                            chatUser.groupUuid
                        )
                    } else {
                        sendBotMessage(
                            `Current word: ${hangman.publicWord}`,
                            chatUser.groupUuid
                        )
                    }
                }
            }
        })

        // Listen for chatMessage
        socket.on("leaveRoom", () => {
            userLeave(socket.id)
        })

        // Listen for chatMessage
        socket.on("chatMessage", async (msg) => {
            const chatUser = getCurrentUser(socket.id)
            if (!chatUser) {
                return
            }

            if (msg) {
                const recipientGroupId = await getGroupIdByUuid(
                    chatUser.groupUuid
                )
                if (!recipientGroupId) {
                    chlog.error(
                        "Failed to get group ID by UUID for user message",
                        JSON.stringify({
                            groupUuid: chatUser.groupUuid,
                        })
                    )
                    return
                }
                const message = await createMessage({
                    body: msg,
                    recipientGroupId,
                    recipientId: null,
                    senderId: chatUser.user.id,
                })
                if (message && message.message && message.sender) {
                    io.to(chatUser.groupUuid).emit("message", {
                        uuid: message.message.uuid,
                        userUuid: message.sender.uuid,
                        text: msg,
                        time: message.message.createdAt,
                    })
                } else {
                    chlog.error(
                        "User text message creation failed",
                        JSON.stringify(message)
                    )
                    return
                }

                const group = await getChatGroupByUuid(chatUser.groupUuid)
                if (!group || !group.groupByUuid?.language?.alpha2) {
                    chlog.error(
                        "Failed to get group by UUID for user message",
                        JSON.stringify({
                            groupUuid: chatUser.groupUuid,
                        })
                    )
                    return
                }
                const alpha2 = group.groupByUuid?.language?.alpha2

                if (msg.startsWith("!help")) {
                    if (alpha2 === "de") {
                        sendBotMessage(
                            "Verfügbare Befehle: !hangman, !help",
                            chatUser.groupUuid
                        )
                    } else {
                        sendBotMessage(
                            "Available commands: !hangman, !help",
                            chatUser.groupUuid
                        )
                    }
                    return
                } else if (Object.keys(hangmanGames).includes(alpha2)) {
                    const hangman = hangmanGames[alpha2 as HangmanLanguage]
                    if (hangman.running) {
                        if (msg.length === 1) {
                            if (
                                !hangman.letterPicked(msg) &&
                                hangman.letterAvailable(msg)
                            ) {
                                hangman.pickLetter(msg)
                                if (alpha2 === "de") {
                                    sendBotMessage(
                                        `Aktuelles Wort: ${hangman.publicWord}`,
                                        chatUser.groupUuid
                                    )
                                } else {
                                    sendBotMessage(
                                        `Current word: ${hangman.publicWord}`,
                                        chatUser.groupUuid
                                    )
                                }
                                if (hangman.nextRound()) {
                                    if (alpha2 === "de") {
                                        sendBotMessage(
                                            `Du hast richtig geraten! Hier ist das nächste Wort: ${hangman.publicWord}`,
                                            chatUser.groupUuid
                                        )
                                    } else {
                                        sendBotMessage(
                                            `You guessed correctly! Here's the next word: ${hangman.publicWord}`,
                                            chatUser.groupUuid
                                        )
                                    }
                                }
                            }
                        }
                    }
                    if (msg.startsWith("!hangman")) {
                        if (hangman.running) {
                            if (alpha2 === "de") {
                                sendBotMessage(
                                    "Es läuft bereits ein Hangman-Spiel.",
                                    chatUser.groupUuid
                                )
                            } else {
                                sendBotMessage(
                                    "Hangman is already running.",
                                    chatUser.groupUuid
                                )
                            }
                        } else {
                            hangman.start()
                            if (alpha2 === "de") {
                                sendBotMessage(
                                    `Wir fangen ein Hangman-Spiel an: ${hangman.publicWord}`,
                                    chatUser.groupUuid
                                )
                            } else {
                                sendBotMessage(
                                    `Started a hangman game: ${hangman.publicWord}`,
                                    chatUser.groupUuid
                                )
                            }
                        }
                    }
                } else {
                    if (msg.startsWith("!hangman")) {
                        sendBotMessage(
                            "So far, hangman is only supported in English and German.",
                            chatUser.groupUuid
                        )
                    }
                }
            }
        })

        // Runs when client disconnects
        socket.on("disconnect", () => {
            const chatUser = userLeave(socket.id)
            if (!chatUser) {
                return
            }

            sendBotMessage(
                `${chatUser.user.username} has left the chat`,
                chatUser.groupUuid
            )
        })
    })
}

async function getChatGroupByUuid(
    uuid: Group["uuid"]
): Promise<ChatGroupByUuidQuery | null> {
    const res = await performQuery<ChatGroupByUuidQuery>(
        `query ChatGroupByUuid($uuid: UUID!) {
            groupByUuid(uuid: $uuid) {
                language {
                    alpha2
                }
            }
        }`,
        { uuid }
    )
    if (!res.data?.groupByUuid) {
        return null
    }
    return res.data || null
}

export default {
    start,
}
