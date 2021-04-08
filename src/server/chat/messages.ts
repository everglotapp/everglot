import { v4 as uuidv4 } from "uuid"

import { performQuery } from "../gql"

import type {
    User,
    CreateMessageMutation,
    CreateMessageMutationVariables,
} from "../../types/generated/graphql"

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
