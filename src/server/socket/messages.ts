import fs from "fs"
import path from "path"
import URI from "uri-js"

import mime from "mime-types"
import { v4 as uuidv4 } from "uuid"

import fetch from "node-fetch"
import _anchorme from "anchorme"
// @ts-ignore
const anchorme: typeof _anchorme = _anchorme.default || _anchorme

import { performQuery } from "../gql"

import type {
    User,
    CreateMessageMutation,
    CreateMessageMutationVariables,
    CreateMessagePreviewMutation,
    CreateMessagePreviewMutationVariables,
    MessagePreview,
    Message,
} from "../../types/generated/graphql"

import log from "../../logger"
import UIDGenerator from "uid-generator"
import { MESSAGE_PREVIEW_BASE_PATH } from "../../constants"
import type { ChatMessage } from "../../types/chat"

import type { Server as SocketIO } from "socket.io"

const chlog = log.child({
    namespace: "messages",
})

import {
    MESSAGE_PREVIEW_IMAGES_DIRECTORY,
    MESSAGE_PREVIEW_IMAGES_ACCEPTED_CONTENT_TYPES,
} from "../constants"
import { getCurrentUser } from "./users"
import { getGroupIdByUuid, getGroupLanguageByUuid } from "../groups"

export function handleUserConnected(io: SocketIO, socket: EverglotChatSocket) {
    socket.on("chatMessage", async (msg) => {
        const chatUser = getCurrentUser(socket)
        if (!chatUser) {
            return
        }

        if (!msg) {
            chlog.debug("User sent chatMessage with empty body")
            return
        }
        const recipientGroupId = await getGroupIdByUuid(chatUser.groupUuid)
        if (!recipientGroupId) {
            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                })
                .error("Failed to get group ID by UUID for user message")
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
            chlog.child({ message }).error("User text message creation failed")
            return
        }

        const group = await getGroupLanguageByUuid(chatUser.groupUuid)
        if (!group || !group.groupByUuid?.language?.alpha2) {
            chlog
                .child({
                    groupUuid: chatUser.groupUuid,
                })
                .error("Failed to get group by UUID for user message")
            return
        }

        if (!msg.startsWith("!")) {
            chlog.child({ message }).debug("Trying to obtain message preview")
            generateMessagePreview(
                { id: message.message.id, body: msg },
                (imageUrl) => {
                    // TODO: Send preview metadata
                    chlog
                        .child({ message, imageUrl })
                        .debug("Callback for message preview was called")
                    io.to(chatUser.groupUuid).emit("messagePreview", {
                        messageUuid: message.message!.uuid,
                        type: "image",
                        url: imageUrl,
                    })
                }
            )
        }
    })
}

export function formatMessage(
    text: string,
    userUuid: string | null = null
): ChatMessage {
    return {
        uuid: uuidv4(),
        userUuid,
        text,
        time: new Date().toISOString(),
    }
}

export async function createMessage(
    message: Omit<CreateMessageMutationVariables, "uuid">
): Promise<CreateMessageMutation["createMessage"] | null> {
    const res = await performQuery<CreateMessageMutation>(
        `mutation CreateMessage(
            $parentMessageId: Int
            $recipientGroupId: Int
            $recipientId: Int
            $senderId: Int
            $uuid: UUID!
            $body: String!
          ) {
            createMessage(
              input: {
                message: {
                  body: $body
                  parentMessageId: $parentMessageId
                  uuid: $uuid
                  senderId: $senderId
                  recipientGroupId: $recipientGroupId
                  recipientId: $recipientId
                }
              }
            ) {
              sender {
                uuid
              }
              message {
                id
                uuid
                createdAt
              }
            }
          }`,
        { ...message, uuid: uuidv4() }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createMessage
}

export async function generateMessagePreview(
    message: Pick<Message, "id" | "body">,
    callback: (imageUrl: string) => void
) {
    // Check for URLs
    const matches = anchorme.list(message.body)
    for (const match of matches) {
        const { string: url, isURL } = match
        if (!isURL) {
            chlog.child({ url }).debug("URL invalid")
            continue
        }
        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            chlog
                .child({ url })
                .debug(
                    "URL to fetch preview for does not start with https:// or http://"
                )
            continue
        }

        // TODO: Set limit for file size
        const uri = URI.serialize(URI.parse(url))
        const res = await fetch(uri).catch(() => {
            chlog
                .child({ url })
                .debug(
                    "Failed to fetch from remote URL in chat message for preview"
                )
        })
        if (!res) {
            chlog
                .child({ url })
                .debug(
                    "Empty response when fetching from remote URL in chat message for preview"
                )
            continue
        }
        const contentType = res.headers.get("content-type")
        const mimeType = contentType ? contentType.split(";")[0] : null
        if (
            !mimeType ||
            !MESSAGE_PREVIEW_IMAGES_ACCEPTED_CONTENT_TYPES.some(
                (acceptedContentType) => acceptedContentType === mimeType
            )
        ) {
            chlog
                .child({ contentType, mimeType })
                .debug("Content type does not indicate an image")
            continue
        }
        const imageBuffer = await res.buffer()
        chlog.child({ url }).debug("Found image")
        if (!imageBuffer.length) {
            chlog.child({ url }).debug("URL preview image is empty")
            continue
        }
        const uidgen = new UIDGenerator(256, UIDGenerator.BASE62)
        const filename = await uidgen.generate().catch(() => null)
        if (!filename) {
            chlog
                .child({ url })
                .error(`URL preview image random file name generation failed`)
            continue
        }
        const extension = mime.extension(mimeType)
        const basename = `${filename}${extension ? `.${extension}` : ""}`
        const filepath = path.resolve(
            MESSAGE_PREVIEW_IMAGES_DIRECTORY,
            basename
        )
        const imageUrl = `${MESSAGE_PREVIEW_BASE_PATH}/${basename}`
        fs.writeFile(filepath, imageBuffer, async () => {
            chlog
                .child({
                    url,
                    imageUrl,
                    filepath,
                    filename,
                    basename,
                    extension,
                })
                .debug("Stored preview image")

            callback(imageUrl)

            // Create in database
            createMessagePreview({
                messageId: message.id,
                filename,
                extension: extension || null,
            })
        })
        // Only consider first image that can be retrieved successfully.
        break
    }
}

export async function createMessagePreview(
    messagePreview: Omit<CreateMessagePreviewMutationVariables, "uuid">
): Promise<MessagePreview["id"] | null> {
    const res = await performQuery<CreateMessagePreviewMutation>(
        `mutation CreateMessagePreview(
            $messageId: Int!
            $filename: String!
            $extension: String
            $uuid: UUID!
          ) {
            createMessagePreview(
              input: {
                messagePreview: {
                  uuid: $uuid
                  filename: $filename
                  extension: $extension
                  messageId: $messageId
                }
              }
            ) {
              messagePreview {
                id
              }
            }
          }`,
        { ...messagePreview, uuid: uuidv4() }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createMessagePreview?.messagePreview?.id || null
}

export default {
    handleUserConnected,
}
