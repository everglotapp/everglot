import type { ChatUserQuery, User } from "../../types/generated/graphql"
import { performQuery } from "../gql"

import log from "../../logger"
const chlog = log.child({
    namespace: "chat-utils",
})

export async function getChatUserByUserId(userId: User["id"]) {
    const res = await performQuery<ChatUserQuery>(
        `query ChatUser($id: Int!) {
                user(id: $id) {
                    id
                    username
                    uuid
                    avatarUrl
                }
            }`,
        { id: userId }
    )
    if (!res.data || !res.data.user || !res.data?.user?.username?.length) {
        chlog
            .child({
                userId,
                res,
            })
            .warn("Insufficient chat user result")
        return null
    }
    return res.data.user
}
