import { performQuery } from "./gql"

import type {
    RegisterUserActivityMutation,
    RegisterUserActivityMutationVariables,
    User,
} from "../types/generated/graphql"

export async function registerUserActivity(
    vars: RegisterUserActivityMutationVariables
): Promise<User["lastActiveAt"] | null> {
    const res = await performQuery<RegisterUserActivityMutation>(
        `mutation RegisterUserActivity($userId: Int!) {
            registerUserActivity(input: { userId: $userId }) {
                datetime
            }
        }`,
        vars
    )
    if (!res.data) {
        return null
    }
    return res.data?.registerUserActivity?.datetime || null
}
