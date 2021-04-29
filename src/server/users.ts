import { performQuery } from "./gql"

import log from "../logger"

const chlog = log.child({ namespace: "users" })

import type {
    RegisterUserActivityMutation,
    RegisterUserActivityMutationVariables,
    UpdateUserAvatarUrlMutation,
    UpdateUserAvatarUrlMutationVariables,
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

export async function updateUserAvatarUrl(
    vars: UpdateUserAvatarUrlMutationVariables
): Promise<boolean> {
    const res = await performQuery<UpdateUserAvatarUrlMutation>(
        `mutation UpdateUserAvatarUrl($avatarUrl: String!, $id: Int!) {
            updateUser(input: { patch: { avatarUrl: $avatarUrl }, id: $id }) {
                user {
                    avatarUrl
                }
            }
        }`,
        vars
    )
    if (!res.data || !res.data.updateUser || res.errors) {
        chlog.child({ res }).error("Failed to change user's avatarUrl")
        return false
    }
    return true
}
