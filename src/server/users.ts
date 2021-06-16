import { performQuery } from "./gql"

import log from "../logger"

const chlog = log.child({ namespace: "users" })

import type {
    RegisterUserActivityMutation,
    RegisterUserActivityMutationVariables,
    UpdateUserAvatarUrlMutation,
    UpdateUserAvatarUrlMutationVariables,
    User,
    UserUuidByIdQuery,
    UserHasCompletedProfileQuery,
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

export async function getUserUuidById(id: User["id"]): Promise<string | null> {
    const res = await performQuery<UserUuidByIdQuery>(
        `query UserUuidById($id: Int!) {
            user(id: $id) {
                uuid
            }
        }`,
        { id }
    )
    if (!res.data) {
        return null
    }
    return res.data.user?.uuid || null
}

export async function userHasCompletedProfile(
    userId: number
): Promise<boolean> {
    const queryResult = await performQuery<UserHasCompletedProfileQuery>(
        `query UserHasCompletedProfile($id: Int!) {
            user(id: $id) {
                username
                userLanguages {
                    totalCount
                }
            }
        }
        `,
        { id: userId }
    )
    if (queryResult.data && queryResult.data.user) {
        const {
            user: { username, userLanguages },
        } = queryResult.data
        if (username !== null && userLanguages.totalCount) {
            return true
        }
    }
    return false
}
