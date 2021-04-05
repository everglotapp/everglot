import { performQuery } from "./gql"

import type { User } from "../types/generated/graphql"

async function registerUserActivity(
    userId
): Promise<User["lastActiveAt"] | null> {
    const res = await performQuery<{
        registerUserActivity: { datetime: User["lastActiveAt"] }
    }>(
        `mutation RegisterUserActivity ($userId: Int!) {
            registerUserActivity(input: {userId: $userId}) {
              datetime
            }
          }
          `,
        { userId }
    )
    if (!res.data) {
        return null
    }
    return res.data?.registerUserActivity.datetime
}
