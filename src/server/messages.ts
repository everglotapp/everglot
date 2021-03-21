import moment from "moment"

import type { User } from "../types/generated/graphql"

export type Message = {
    text: string
    time: string
    username: string
    uuid: User["uuid"] | null
}

export function formatMessage(
    username: Message["username"],
    text: string,
    uuid: User["uuid"] | null = null
): Message {
    return {
        username: username!,
        uuid,
        text,
        time: moment().format("h:mm a"),
    }
}
