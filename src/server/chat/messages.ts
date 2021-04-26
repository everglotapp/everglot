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

const ACCEPTED_IMAGE_CONTENT_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
] as const
export async function getMessagePreview(msg: string, cb: () => void) {
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
            !ACCEPTED_IMAGE_CONTENT_TYPES.some(
                (acceptedContentType) => acceptedContentType === contentType
            )
        ) {
            chlog
                .child({ contentType })
                .debug("Content type does not indicate an image")
            continue
        }
        const img = await res.blob()
        chlog.child({ url }).debug("Found image")
        // TODO: Check if empty
        // TODO: Save image
        void img
        cb()
        break
    }
}
