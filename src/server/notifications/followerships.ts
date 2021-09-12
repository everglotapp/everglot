import { performQuery } from "../gql"
import log from "../../logger"

const chlog = log.child({ namespace: "notifications-followerships" })

import { UserFollowershipNotification } from "../../types/generated/graphql"
import type { UserFollowershipNotificationQuery } from "../../types/generated/graphql"

export async function getUserFollowershipNotification(userFollowerId: number) {
    const res = await performQuery<UserFollowershipNotificationQuery>(
        UserFollowershipNotification.loc!.source,
        { id: userFollowerId }
    )
    if (!res.data) {
        chlog
            .child({ res })
            .error(
                "Failed to get user followership notification data by userFollowerId ID"
            )
        return null
    }
    return res.data?.userFollower || null
}
