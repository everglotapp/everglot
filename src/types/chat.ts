import { MESSAGE_PREVIEW_BASE_PATH } from "../constants"
import type { SessionData } from "express-session"
import type { Socket } from "socket.io"
import type { User } from "./generated/graphql"
import type { IncomingMessage } from "http"

export interface EverglotChatSocket extends Socket {
    request: IncomingMessage & {
        session: SessionData
    }
}

export type ChatUser = {
    socketId: string
    user: Pick<User, "id" | "username" | "uuid" | "avatarUrl">
    groupUuid: string
    joinedAt: Date
}

export type ChatMessage = {
    text: string
    time: string
    uuid: string
    userUuid: string | null
}

const enum ChatMessagePreviewType {
    Image = "image",
}

export type ChatMessagePreview = {
    uuid: string
    url: string
    type: string
}

export function makeChatMessagePreview(
    uuid: string,
    filename: string,
    extension?: string
): ChatMessagePreview {
    return {
        uuid,
        url: `${MESSAGE_PREVIEW_BASE_PATH}/${
            extension ? `${filename}.${extension}` : filename
        }`,
        type: ChatMessagePreviewType.Image,
    }
}
