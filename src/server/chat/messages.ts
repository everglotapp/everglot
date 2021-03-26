import moment from "moment"

import type { User } from "../types/generated/graphql"

export type ChatMessage = {
    text: string
    time: string
    username: string
    userUuid: User["uuid"] | null
}

export function formatMessage(
    username: User["username"],
    text: string,
    uuid: User["uuid"] | null = null
): ChatMessage {
    return {
        username: username!,
        userUuid: uuid,
        text,
        time: moment().format("h:mm a"),
    }
}
