import { writable } from "svelte/store"
import { operationStore } from "@urql/svelte"

import {
    CurrentUser,
    LanguageCodeMappings,
    CurrentUserQuery,
    LanguageCodeMappingsQuery,
    AllGroupsQuery,
    AllGroups,
    Maybe,
    User,
    Group,
    GroupUser,
    Language,
    LanguageSkillLevel,
} from "./types/generated/graphql"

export const username = writable<string | null>(null)
export const room = writable<string>("English")

export const currentUser = operationStore<CurrentUserQuery>(CurrentUser)
export const languageCodeMappings = operationStore<LanguageCodeMappingsQuery>(
    LanguageCodeMappings
)
export const allGroups = operationStore<AllGroupsQuery>(AllGroups)

export type ChatUserNode = Maybe<
    {
        __typename?: "User"
    } & Pick<
        User,
        "bio" | "avatarUrl" | "uuid" | "username" | "lastActiveAt"
    > & {
            groupUsers: {
                __typename?: "GroupUsersConnection"
            } & {
                nodes: Array<
                    Maybe<
                        {
                            __typename?: "GroupUser"
                        } & Pick<GroupUser, "userType"> & {
                                group?: Maybe<
                                    {
                                        __typename?: "Group"
                                    } & Pick<Group, "id"> & {
                                            language?: Maybe<
                                                {
                                                    __typename?: "Language"
                                                } & Pick<
                                                    Language,
                                                    "englishName"
                                                >
                                            >
                                            languageSkillLevel?: Maybe<
                                                {
                                                    __typename?: "LanguageSkillLevel"
                                                } & Pick<
                                                    LanguageSkillLevel,
                                                    "name"
                                                >
                                            >
                                        }
                                >
                            }
                    >
                >
            }
        }
>
