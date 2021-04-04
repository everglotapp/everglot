import { performQuery } from "./gql"

import { UserType } from "../types/generated/graphql"
import type { Group, GroupUser, User } from "../types/generated/graphql"

export const GROUP_LEARNER_SIZE = 4
export const GROUP_NATIVE_SIZE = 2

async function createGroup(
    global: Boolean,
    group_name: string,
    languageId: number,
    languageSkillLevelId: number
): Promise<Group["id"] | null> {
    const res = await performQuery<{
        createGroup: { group: { id: Group["id"] } }
    }>(
        `mutation MyMutation($global: Boolean!, $group_name: String!, $languageId: Int!, $languageSkillLevelId: Int!) {
      createGroup(
        input: {group: {global: $global, groupName: $group_name, languageId: $languageId, languageSkillLevelId: $languageSkillLevelId}}
      ) {
        group {
          id
        }
      }
    }`,
        {
            global: global,
            group_name: group_name,
            languageId: languageId,
            languageSkillLevelId: languageSkillLevelId,
        }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createGroup.group.id
}

async function getUsersWithoutLearnerGroup(
    languageId: number,
    languageSkillLevelId: number,
    learnerSize: number
): Promise<number[] | null> {
    const res = await performQuery<{
        usersWithoutLearnerGroup: { nodes: { id: number }[] }
    }>(
        `query UsersWithoutLearnerGroup ($lid: Int!, $lsklid: Int!, $learnerSize: Int!) {
      usersWithoutLearnerGroup(lid: $lid, lsklid: $lsklid, first: $learnerSize) {
        nodes {
          id
        }
      }
    }`,
        {
            lid: languageId,
            lsklid: languageSkillLevelId,
            learnerSize: learnerSize,
        }
    )
    // console.log(
    //     `users without learner group:`,
    //     {
    //         lid: languageId,
    //         lsklid: languageSkillLevelId,
    //         learnerSize: learnerSize,
    //     },
    //     res.data?.usersWithoutLearnerGroup.nodes.map((node) => node.id)
    // )
    if (!res.data) {
        return null
    }

    console.log(res.data)
    return res.data.usersWithoutLearnerGroup.nodes.map((node) => node.id)
}

async function getUsersWithoutNativeGroup(
    languageId: number,
    nativeSize: number
): Promise<number[] | null> {
    const res = await performQuery<{
        usersWithoutNativeGroup: { nodes: { id: number }[] }
    }>(
        `query UsersWithoutNativeGroup ($lid: Int!, $nativeSize: Int!) {
      usersWithoutNativeGroup(lid: $lid, first: $nativeSize) {
        nodes {
          id
        }
      }
    }`,
        { lid: languageId, nativeSize: nativeSize }
    )
    // console.log(
    //     "users without native group:",
    //     { lid: languageId, nativeSize: nativeSize },
    //     res.data?.usersWithoutNativeGroup.nodes.map((node) => node.id)
    // )
    if (!res.data) {
        return null
    }
    return res.data.usersWithoutNativeGroup.nodes.map((node) => node.id)
}

async function addUserToGroup(
    userId: number,
    groupId: number,
    userType: UserType
): Promise<number | null> {
    const res = await performQuery<{
        createGroupUser: { groupUser: { id: GroupUser["id"] } }
    }>(
        `mutation MyMutation($userType: UserType!, $userId: Int!, $groupId: Int!) {
      createGroupUser(
        input: {groupUser: {userType: $userType, userId: $userId, groupId: $groupId}}
      ) {
        groupUser {
          id
        }
      }
    }`,
        { userId, groupId, userType }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createGroupUser.groupUser.id
}

async function createAndAssignGroup(
    learnerIds: Array<number>,
    nativeIds: Array<number>,
    languageId: number,
    languageSkillLevelId: number
): Promise<Group["id"] | null> {
    const groupId = await createGroup(
        false,
        "random",
        languageId,
        languageSkillLevelId
    )
    if (groupId === null) {
        return null
    }
    for (const learner of learnerIds) {
        if (!(await addUserToGroup(learner, groupId, UserType.Learner))) {
            return null
        }
    }
    for (const native of nativeIds) {
        if (!(await addUserToGroup(native, groupId, UserType.Native))) {
            return null
        }
    }
    return groupId
}

async function formGroup(
    languageId: number,
    languageSkillLevelId: number
): Promise<Group["id"] | null> {
    const learnerIds = await getUsersWithoutLearnerGroup(
        languageId,
        languageSkillLevelId,
        GROUP_LEARNER_SIZE
    )
    if (!learnerIds) {
        return null
    }
    const nativeIds = await getUsersWithoutNativeGroup(
        languageId,
        GROUP_NATIVE_SIZE
    )
    if (!nativeIds) {
        return null
    }
    if (
        learnerIds.length === GROUP_LEARNER_SIZE &&
        nativeIds.length === GROUP_NATIVE_SIZE
    ) {
        return await createAndAssignGroup(
            learnerIds,
            nativeIds,
            languageId,
            languageSkillLevelId
        )
    }
    return null
}

async function getUserLanguageInfo(
    userId: User["id"]
): Promise<
    | {
          languageId: number
          languageSkillLevelId: number | null
          native: boolean
      }[]
    | null
> {
    const res = await performQuery<{
        user: {
            id: number
            userLanguages: {
                nodes: {
                    languageId: number
                    languageSkillLevelId: number | null
                    native: boolean
                }[]
            }
        }
    }>(
        `query MyQuery($id: Int!) {
            user(id: $id) {
              id
              userLanguages {
                nodes {
                  languageId
                  languageSkillLevelId
                  native
                }
              }
            }
          }
        `,
        { id: userId }
    )
    // console.log(res.data?.user.userLanguages.nodes)
    if (!res.data) {
        return null
    }
    return res.data.user.userLanguages.nodes
}

/**
 * Try to form new groups when a user registration makes their formation possible.
 * @param userId ID of user who signed up
 * @returns
 */
export async function tryFormingGroupsWithUser(
    userId: number
): Promise<Group["id"][]> {
    const userLanguageInfo = await getUserLanguageInfo(userId)
    if (!userLanguageInfo) {
        return []
    }
    const groupIds = []
    for (const language of userLanguageInfo) {
        if (language.native) {
            const allLanguageLevelIds = [1, 2, 3, 4, 5, 6]
            while (allLanguageLevelIds.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * allLanguageLevelIds.length
                )
                const groupId = await formGroup(
                    language.languageId,
                    allLanguageLevelIds[randomIndex]
                )
                if (groupId !== null) {
                    groupIds.push(groupId)
                    break
                }
                allLanguageLevelIds.splice(randomIndex, 1)
            }
        } else {
            const groupId = await formGroup(
                language.languageId,
                language.languageSkillLevelId!
            )
            if (groupId) {
                groupIds.push(groupId)
            }
        }
    }
    return groupIds
}
