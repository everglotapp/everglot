import { performQuery } from "../gql"

import log from "../../logger"

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
    UserIdByUuidQuery,
    UserIdByUuid,
    CreateUserFollowershipMutationVariables,
    CreateUserFollowershipMutation,
    CreateUserFollowership,
    DeleteUserFollowershipMutation,
    DeleteUserFollowership,
    DeleteUserFollowershipMutationVariables,
    UserFollowershipIdByUserIdAndFollowerIdQuery,
    UserFollowershipIdByUserIdAndFollowerId,
    UpdateUserBioMutationVariables,
    UpdateUserBioMutation,
    UpdateUserBio,
    UpsertUserPreferenceMutationVariables,
    UpsertUserPreferenceMutation,
    UpsertUserPreference,
    CreateUserPreferenceMutationVariables,
    CreateUserPreferenceMutation,
    CreateUserPreference,
    UserPasswordResetDataByEmailQuery,
    UserPasswordResetDataByEmail,
    UserPasswordResetDataByEmailQueryVariables,
    UpdateUserResetPasswordTokenMutation,
    UpdateUserResetPasswordTokenMutationVariables,
    UpdateUserResetPasswordToken,
    UserByResetPasswordTokenQuery,
    UserByResetPasswordTokenQueryVariables,
    UserByResetPasswordToken,
    ResetUserPasswordMutationVariables,
    ResetUserPassword,
    UserIdByUsername,
    UserIdByUsernameQuery,
} from "../../types/generated/graphql"

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

export async function updateUserBio(
    vars: UpdateUserBioMutationVariables
): Promise<boolean> {
    const res = await performQuery<UpdateUserBioMutation>(
        UpdateUserBio.loc!.source,
        vars
    )
    if (!res.data || !res.data.updateUser || res.errors) {
        chlog.child({ res }).error("Failed to change user's bio")
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

export async function getUserIdByUuid(uuid: string): Promise<number | null> {
    const res = await performQuery<UserIdByUuidQuery>(
        UserIdByUuid.loc!.source,
        { uuid }
    )
    if (!res.data) {
        chlog.child({ res, uuid }).error("Failed to find user ID by UUID")
        return null
    }
    return res.data?.userByUuid?.id || null
}

export async function getUserIdByUsername(
    username: User["username"]
): Promise<number | null> {
    const res = await performQuery<UserIdByUsernameQuery>(
        UserIdByUsername.loc!.source,
        { username }
    )
    if (!res.data) {
        return null
    }
    return res.data.userByUsername?.id || null
}

export async function createUserFollowership(
    vars: CreateUserFollowershipMutationVariables
): Promise<
    | NonNullable<
          CreateUserFollowershipMutation["createUserFollower"]
      >["userFollower"]
    | null
> {
    const res = await performQuery<CreateUserFollowershipMutation>(
        CreateUserFollowership.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create post like")
        return null
    }
    return res.data?.createUserFollower?.userFollower || null
}

export async function deleteUserFollowership(
    vars: DeleteUserFollowershipMutationVariables
): Promise<
    | NonNullable<
          DeleteUserFollowershipMutation["deleteUserFollower"]
      >["userFollower"]
    | null
> {
    const res = await performQuery<DeleteUserFollowershipMutation>(
        DeleteUserFollowership.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to delete post like")
        return null
    }
    return res.data?.deleteUserFollower?.userFollower || null
}

export async function getUserFollowershipIdByUserIdAndFollowerId(
    userId: number,
    followerId: number
): Promise<number | null> {
    const res =
        await performQuery<UserFollowershipIdByUserIdAndFollowerIdQuery>(
            UserFollowershipIdByUserIdAndFollowerId.loc!.source,
            { followerId, userId }
        )
    if (!res.data) {
        chlog
            .child({ res, followerId, userId })
            .error("Failed to find followership ID by user ID and follower ID ")
        return null
    }
    return res.data?.userFollowers?.totalCount === 1
        ? res.data.userFollowers.nodes[0]!.id
        : null
}

export async function upsertUserPreference(
    vars: UpsertUserPreferenceMutationVariables
): Promise<
    | NonNullable<
          UpsertUserPreferenceMutation["upsertUserPreference"]
      >["userPreference"]
    | null
> {
    const res = await performQuery<UpsertUserPreferenceMutation>(
        UpsertUserPreference.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to upsert user preference")
        return null
    }
    return res.data?.upsertUserPreference?.userPreference || null
}

export async function createUserPreference(
    vars: CreateUserPreferenceMutationVariables
): Promise<
    | NonNullable<
          CreateUserPreferenceMutation["createUserPreference"]
      >["userPreference"]
    | null
> {
    const res = await performQuery<CreateUserPreferenceMutation>(
        CreateUserPreference.loc!.source,
        vars
    )
    if (!res.data) {
        chlog.child({ res }).error("Failed to create user preference")
        return null
    }
    return res.data?.createUserPreference?.userPreference || null
}

export async function getUserPasswordResetDataByEmail(
    vars: UserPasswordResetDataByEmailQueryVariables
) {
    const res = await performQuery<UserPasswordResetDataByEmailQuery>(
        UserPasswordResetDataByEmail.loc!.source,
        vars
    )
    if (!res.data) {
        return null
    }
    return res.data.userByEmail || null
}

export async function updateUserPasswordResetToken(
    vars: UpdateUserResetPasswordTokenMutationVariables
) {
    const res = await performQuery<UpdateUserResetPasswordTokenMutation>(
        UpdateUserResetPasswordToken.loc!.source,
        vars
    )
    if (!res.data) {
        return null
    }
    return res.data.updateUser || null
}

export async function getUserByResetPasswordToken(
    vars: UserByResetPasswordTokenQueryVariables
) {
    const res = await performQuery<UserByResetPasswordTokenQuery>(
        UserByResetPasswordToken.loc!.source,
        vars
    )
    if (!res.data) {
        return null
    }
    return res.data.userByResetPasswordToken || null
}

export async function resetUserPassword(
    vars: ResetUserPasswordMutationVariables
) {
    const res = await performQuery<ResetUserPasswordMutationVariables>(
        ResetUserPassword.loc!.source,
        vars
    )
    return Boolean(!res.errors && res.data)
}

const USERNAME_MENTION_REGEX = /(\@\w{1,50})/g
export function findPotentialUsernameMentions(body: string) {
    const matches = [...body.matchAll(USERNAME_MENTION_REGEX)]
    for (const match of matches) {
        if (typeof match.index === "undefined") {
            chlog
                .child({ match, matches, body })
                .error("invalid username match")
            return []
        }
    }
    return matches.map((match) => {
        const atWithUsername = match[0]
        const username = atWithUsername.slice(1)
        // TODO: try to find username
        const startIndex = match.index!
        const endIndex = match.index! + atWithUsername.length - 1
        return { username, startIndex, endIndex }
    })
}

export function sanitizeUsername(username: string) {
    return username.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase()
}
