import { v4 as uuidv4 } from "uuid"

import log from "../logger"

import { performQuery } from "./gql"

import {
    CreateGroupMutation,
    GroupIdByUuidQuery,
    UserLanguageInfoQuery,
    UserType,
} from "../types/generated/graphql"
import type { Group, GroupUser, User } from "../types/generated/graphql"

export const GROUP_LEARNER_SIZE = 4
export const GROUP_NATIVE_SIZE = 2

async function createGroup(
    global: Boolean,
    groupName: string,
    languageId: number,
    languageSkillLevelId: number,
    uuid: string
): Promise<Group["id"] | null> {
    const res = await performQuery<CreateGroupMutation>(
        `mutation CreateGroup(
            $global: Boolean!
            $groupName: String!
            $languageId: Int!
            $languageSkillLevelId: Int!
            $uuid: UUID!
        ) {
            createGroup(
                input: {
                    group: {
                        global: $global
                        groupName: $groupName
                        languageId: $languageId
                        languageSkillLevelId: $languageSkillLevelId
                        uuid: $uuid
                    }
                }
            ) {
                group {
                    id
                }
            }
        }`,
        {
            global,
            groupName,
            languageId,
            languageSkillLevelId,
            uuid,
        }
    )
    return res.data?.createGroup?.group?.id || null
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

    // console.log(res.data)
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
        input: {
            groupUser: {
                userType: $userType,
                userId: $userId,
                groupId: $groupId
            }
        }
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
    const global = false
    const name = "random"
    const uuid = uuidv4()
    const groupId = await createGroup(
        global,
        name,
        languageId,
        languageSkillLevelId,
        uuid
    )
    if (groupId === null) {
        log.child({
            global,
            name,
            languageId,
            languageSkillLevelId,
            uuid,
        }).error("Group creation failed")
        return null
    }
    for (const learner of learnerIds) {
        if (!(await addUserToGroup(learner, groupId, UserType.Learner))) {
            log.child({
                learner,
                groupId,
                type: UserType.Learner,
            }).error("User Group membership creation failed")
            return null
        }
    }
    for (const native of nativeIds) {
        if (!(await addUserToGroup(native, groupId, UserType.Native))) {
            log.child({
                native,
                groupId,
                type: UserType.Native,
            }).error("User Group membership creation failed")
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
        log.child({
            languageId,
            languageSkillLevelId,
        }).trace("No one trying to learn this language at this skill level")
        return null
    }
    const nativeIds = await getUsersWithoutNativeGroup(
        languageId,
        GROUP_NATIVE_SIZE
    )
    if (!nativeIds) {
        log.child({
            languageId,
        }).trace("No one able to teach this language")
        return null
    }
    if (
        learnerIds.length === GROUP_LEARNER_SIZE &&
        nativeIds.length === GROUP_NATIVE_SIZE
    ) {
        const groupId = await createAndAssignGroup(
            learnerIds,
            nativeIds,
            languageId,
            languageSkillLevelId
        )
        log.info("Formed group", groupId)
        return groupId
    } else {
        log.child({
            learnerIds,
            nativeIds,
        }).trace("Not enough learners or native speakers")
    }
    return null
}

async function getUserLanguageInfo(
    userId: User["id"]
): Promise<
    | NonNullable<
          NonNullable<
              UserLanguageInfoQuery["user"]
          >["userLanguages"]["nodes"][0]
      >[]
    | null
> {
    const res = await performQuery<UserLanguageInfoQuery>(
        `query UserLanguageInfo($id: Int!) {
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
        }`,
        { id: userId }
    )
    if (!res.data || !res.data?.user?.userLanguages?.nodes) {
        return null
    }
    const nodes = res.data.user.userLanguages.nodes
    if (!nodes.every((node) => node)) {
        log.child({
            userLanguages: res.data.user.userLanguages.nodes,
        }).error("Invalid user language")
        return null
    }
    return nodes.map((node) => node!)
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
        log.child({ userId, userLanguageInfo }).error(
            "Empty user language info"
        )
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
                } else {
                    // console.log("Did not form native group", {
                    //     userId,
                    //     language,
                    //     languageLevel: allLanguageLevelIds[randomIndex],
                    // })
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
            } else {
                // console.log("Did not form learner group", { userId, language })
            }
        }
    }
    return groupIds
}

export async function getGroupIdByUuid(
    uuid: Group["uuid"]
): Promise<number | null> {
    const res = await performQuery<GroupIdByUuidQuery>(
        `query GroupIdByUuid($uuid: UUID!) {
            groupByUuid(uuid: $uuid) {
                id
            }
        }`,
        { uuid }
    )
    // console.log(res.data?.user.userLanguages.nodes)
    if (!res.data) {
        return null
    }
    return res.data.groupByUuid?.id || null
}
