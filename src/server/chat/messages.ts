import moment from "moment"

import { v4 as uuidv4 } from "uuid"

import type { User } from "../../types/generated/graphql"

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
        time: moment().format("h:mm a"),
    }
}
