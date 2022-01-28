import {
    ConfirmUserEmail,
    UserByEmailConfirmToken,
} from "../../../types/generated/graphql"
import { performQuery } from "../../gql"
import log from "../../../logger"

import type {
    ConfirmUserEmailMutation,
    ConfirmUserEmailMutationVariables,
    UserByEmailConfirmTokenQuery,
    UserByEmailConfirmTokenQueryVariables,
} from "../../../types/generated/graphql"

const chlog = log.child({ namespace: "users-email-index" })

export async function confirmUserEmail(
    vars: ConfirmUserEmailMutationVariables
) {
    const res = await performQuery<ConfirmUserEmailMutation>(
        ConfirmUserEmail.loc!.source,
        vars
    )
    if (!res.data || res.errors) {
        chlog.child({ res }).error("Failed to confirm user's email")
        return null
    }
    return res.data.updateUser || null
}

export async function getUserByEmailConfirmToken(
    vars: UserByEmailConfirmTokenQueryVariables
) {
    const res = await performQuery<UserByEmailConfirmTokenQuery>(
        UserByEmailConfirmToken.loc!.source,
        vars
    )
    if (!res.data || res.errors) {
        chlog.child({ res }).error("Failed to get user by email confirm token")
        return null
    }
    return res.data.userByEmailConfirmToken || null
}
