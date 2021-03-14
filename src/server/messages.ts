import moment from "moment"

import type { User } from "../types/generated/graphql"

export type Message = {
    username: User["username"]
    text: string
    time: string
}

export function formatMessage(
    username: User["username"],
    text: string
): Message {
    return {
        username,
        text,
        time: moment().format("h:mm a"),
    }
}
