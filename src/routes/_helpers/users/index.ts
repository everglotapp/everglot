import type { Maybe } from "../../../types/generated/graphql"

export async function toggleFollow(user: {
    uuid: string
    followedByCurrentUser?: Maybe<boolean>
}) {
    const endpoint = user.followedByCurrentUser
        ? `/u/${user.uuid}/unfollow`
        : `/u/${user.uuid}/follow`

    return await fetch(endpoint, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
}
