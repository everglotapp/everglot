import { operationStore } from "@urql/svelte"
import { UserByUsernameFollowerships } from "../types/generated/graphql"
import type { UserByUsernameFollowershipsQuery } from "../types/generated/graphql"

export const userFollowershipsStore =
    operationStore<UserByUsernameFollowershipsQuery>(
        UserByUsernameFollowerships
    )
userFollowershipsStore.context = { paused: true }
