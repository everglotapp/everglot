import { operationStore } from "@urql/svelte"
import {
    CurrentUserProfile,
    UserByUsernameFollowerships,
} from "../types/generated/graphql"
import type {
    UserByUsernameFollowershipsQuery,
    CurrentUserProfileQuery,
} from "../types/generated/graphql"

export const userFollowershipsStore =
    operationStore<UserByUsernameFollowershipsQuery>(
        UserByUsernameFollowerships
    )
userFollowershipsStore.context = { paused: true }

export const currentUserProfileStore =
    operationStore<CurrentUserProfileQuery>(CurrentUserProfile)
