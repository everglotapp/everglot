import { performQuery } from "./gql"

import log from "../logger"

const chlog = log.child({ namespace: "users" })

import {
    RegisterUserActivityMutation,
    RegisterUserActivityMutationVariables,
    UpdateUserAvatarUrlMutation,
    UpdateUserAvatarUrlMutationVariables,
    User,
    UserUuidByIdQuery,
    UserHasCompletedProfileQuery,
    UserGroupMembershipsQuery,
    UserIdByEmailQuery,
    UserIdByEmail,
    UserGroupMemberships,
    UserHasCompletedProfile,
    UserUuidById,
    UpdateUserAvatarUrl,
    RegisterUserActivity,
} from "../types/generated/graphql"

export async function registerUserActivity(
    vars: RegisterUserActivityMutationVariables
): Promise<User["lastActiveAt"] | null> {
    const res = await performQuery<RegisterUserActivityMutation>(
        RegisterUserActivity.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to register user activity")
        return null
    }
    return res.data?.registerUserActivity?.datetime || null
}

export async function updateUserAvatarUrl(
    vars: UpdateUserAvatarUrlMutationVariables
): Promise<boolean> {
    const res = await performQuery<UpdateUserAvatarUrlMutation>(
        UpdateUserAvatarUrl.loc!.source,
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
        UserUuidById.loc!.source,
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
        UserHasCompletedProfile.loc!.source,
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

export async function userGroupMemberships(userId: number) {
    const queryResult = await performQuery<UserGroupMembershipsQuery>(
        UserGroupMemberships.loc!.source,
        { id: userId }
    )
    if (queryResult.data && queryResult.data.user?.groupUsers.edges) {
        return queryResult.data.user.groupUsers.edges
    }
    return null
}

export async function getUserIdByEmail(
    email: User["email"]
): Promise<number | null> {
    const res = await performQuery<UserIdByEmailQuery>(
        UserIdByEmail.loc!.source,
        { email }
    )
    if (!res.data) {
        return null
    }
    return res.data.userByEmail?.id || null
}
