import type { FluentVariable } from "@fluent/bundle"

import type { Server as SocketIO } from "socket.io"

import { createMessage } from "./messages"
import { translate } from "./locales"
import { getGroupIdByUuid } from "../groups"
import log from "../../logger"

import type { Group, Language, Maybe } from "../../types/generated/graphql"

const chlog = log.child({
    namespace: "bot",
})

export class Bot {
    groupUuid: Group["uuid"]
    locale: Language["alpha2"]
    io: SocketIO

    groupId: Maybe<Group["id"]> = null

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
        const messageText = await translate(this.locale)(
            fluentMessageId,
            args,
            errors
        )
        if (messageText) {
            await this.sendMessage(messageText)
        }
    }

    async sendMessage(msg: string, delay = 300) {
        const recipientGroupId = await this.getGroupId()
        if (!recipientGroupId) {
            chlog
                .child({ groupUuid: this.groupUuid })
                .error("Failed to recipient group ID by UUID for bot message")
            return
        }
        const message = await createMessage({
            body: msg,
            recipientGroupId,
            recipientId: null,
            senderId: null,
        })
        if (!message || !message.message) {
            chlog.child({ message }).error("Bot message creation failed")
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

    protected async getGroupId() {
        return (this.groupId ||= await getGroupIdByUuid(this.groupUuid))
    }
}

export default Bot
