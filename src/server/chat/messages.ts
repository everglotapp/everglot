import fs from "fs"
import path from "path"

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
} from "../../types/generated/graphql"

import log from "../../logger"

const chlog = log.child({
    namespace: "messages",
})

const MESSAGE_PREVIEW_IMAGES_DIRECTORY = path.resolve(
    __dirname,
    "../../../static/images/preview"
)
const MESSAGE_PREVIEW_IMAGES_ACCEPTED_CONTENT_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
] as const

export type ChatMessage = {
    text: string
    time: string
    uuid: string
    userUuid: User["uuid"] | null
}

export function formatMessage(
    text: string,
    userUuid: User["uuid"] | null = null
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

export async function getMessagePreview(
    msg: string,
    callback: (imageUrl: string) => void
) {
    // Check for URLs
    const matches = anchorme.list(msg)
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
        const res = await fetch(url).catch(() => {
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
        if (
            !contentType ||
            !MESSAGE_PREVIEW_IMAGES_ACCEPTED_CONTENT_TYPES.some(
                (acceptedContentType) => acceptedContentType === contentType
            )
        ) {
            chlog
                .child({ contentType })
                .debug("Content type does not indicate an image")
            continue
        }
        const imageBuffer = await res.buffer()
        chlog.child({ url }).debug("Found image")
        // TODO: Check if empty
        // TODO: Generate filename
        const filename = "photo.jpg"
        const filepath = path.resolve(
            MESSAGE_PREVIEW_IMAGES_DIRECTORY,
            filename
        )
        const imageUrl = `/images/preview/${filename}`
        fs.writeFile(filepath, imageBuffer, () => {
            chlog
                .child({ url, imageUrl, filepath, filename })
                .debug("Stored preview image")
            callback(imageUrl)
        })
        // Only consider first image that can be retrieved successfully.
        break
    }
}
