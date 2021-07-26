import { v4 as uuidv4 } from "uuid"

import log from "../logger"

import { performQuery } from "./gql"

import {
    AllGroupUuids,
    AllGroupUuidsQuery,
    CreateGroup,
    CreateGroupMutation,
    CreateGroupUser,
    CreateGroupUserMutation,
    GroupIdByUuid,
    GroupIdByUuidQuery,
    GroupLanguageByUuid,
    GroupLanguageByUuidQuery,
    UserIsInGroup,
    UserIsInGroupQuery,
    UserLanguageInfoQuery,
    UsersWithoutLearnerGroup,
    UsersWithoutLearnerGroupQuery,
    UsersWithoutNativeGroup,
    UsersWithoutNativeGroupQuery,
    UserType,
} from "../types/generated/graphql"
import type { Group, User } from "../types/generated/graphql"
import { enqueueEmailNotification } from "./notifications/email"

const chlog = log.child({ namespace: "groups" })

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
        CreateGroup.loc!.source,
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
) {
    const res = await performQuery<UsersWithoutLearnerGroupQuery>(
        UsersWithoutLearnerGroup.loc!.source,
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

    return (
        res.data?.usersWithoutLearnerGroup?.nodes
            .filter(Boolean)
            .map((node) => node!.id) || null
    )
}

async function getUsersWithoutNativeGroup(
    languageId: number,
    nativeSize: number
): Promise<number[] | null> {
    const res = await performQuery<UsersWithoutNativeGroupQuery>(
        UsersWithoutNativeGroup.loc!.source,
        { lid: languageId, nativeSize: nativeSize }
    )
    // console.log(
    //     "users without native group:",
    //     { lid: languageId, nativeSize: nativeSize },
    //     res.data?.usersWithoutNativeGroup.nodes.map((node) => node.id)
    // )
    return (
        res.data?.usersWithoutNativeGroup?.nodes
            .filter(Boolean)
            .map((node) => node!.id) || null
    )
}

async function addUserToGroup(
    userId: number,
    groupId: number,
    userType: UserType
): Promise<number | null> {
    const res = await performQuery<CreateGroupUserMutation>(
        CreateGroupUser.loc!.source,
        { userId, groupId, userType }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createGroupUser?.groupUser?.id || null
}

export async function createAndAssignGroup(
    learnerIds: Array<number>,
    nativeIds: Array<number>,
    languageId: number,
    languageSkillLevelId: number
): Promise<Pick<
    Group,
    | "id"
    | "uuid"
    | "global"
    | "groupName"
    | "languageId"
    | "languageSkillLevelId"
> | null> {
    const global = false
    const groupName = "random"
    const uuid = uuidv4()
    const groupId = await createGroup(
        global,
        groupName,
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
            chlog
                .child({
                    learner,
                    groupId,
                    type: UserType.Learner,
                })
                .error("User Group membership creation failed")
            return null
        }
    }
    for (const native of nativeIds) {
        if (!(await addUserToGroup(native, groupId, UserType.Native))) {
            chlog
                .child({
                    native,
                    groupId,
                    type: UserType.Native,
                })
                .error("User Group membership creation failed")
            return null
        }
    }
    return {
        id: groupId,
        global,
        groupName,
        languageId,
        languageSkillLevelId,
        uuid,
    }
}

const GROUP_ASSIGNMENT_SENDINBLUE_EMAIL_TEMPLATE_ID = 10
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
        chlog
            .child({
                languageId,
                languageSkillLevelId,
            })
            .trace("No one trying to learn this language at this skill level")
        return null
    }
    const nativeIds = await getUsersWithoutNativeGroup(
        languageId,
        GROUP_NATIVE_SIZE
    )
    if (!nativeIds) {
        chlog
            .child({
                languageId,
            })
            .trace("No one able to teach this language")
        return null
    }
    if (
        learnerIds.length === GROUP_LEARNER_SIZE &&
        nativeIds.length === GROUP_NATIVE_SIZE
    ) {
        const group = await createAndAssignGroup(
            learnerIds,
            nativeIds,
            languageId,
            languageSkillLevelId
        )
        chlog.child({ group }).debug("Formed group")
        const groupUserIds = [...learnerIds, ...nativeIds]
        for (const userId of groupUserIds) {
            if (true) {
                continue
            }
            // TODO: actually enqueue email notifications here
            const WITHHOLD_FOR_SECONDS = 3 * 60
            enqueueEmailNotification(
                userId,
                null,
                new Date(Date.now() + WITHHOLD_FOR_SECONDS * 1000),
                {
                    templateId: GROUP_ASSIGNMENT_SENDINBLUE_EMAIL_TEMPLATE_ID,
                    version: 1,
                }
            )
        }
        return group?.id || null
    } else {
        chlog
            .child({
                learnerIds,
                nativeIds,
            })
            .trace("Not enough learners or native speakers")
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
        chlog
            .child({
                userLanguages: res.data.user.userLanguages.nodes,
            })
            .error("Invalid user language")
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
        chlog
            .child({ userId, userLanguageInfo })
            .error("Empty user language info")
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

export async function getGroupIdByUuid(uuid: string): Promise<number | null> {
    const res = await performQuery<GroupIdByUuidQuery>(
        GroupIdByUuid.loc!.source,
        { uuid }
    )
    // console.log(res.data?.user.userLanguages.nodes)
    if (!res.data) {
        return null
    }
    return res.data.groupByUuid?.id || null
}

export async function userIsInGroup(
    userId: User["id"],
    groupUuid: string
): Promise<boolean | null> {
    const res = await performQuery<UserIsInGroupQuery>(
        UserIsInGroup.loc!.source,
        { userId, groupUuid }
    )
    if (
        !res.data ||
        !res.data.groupByUuid?.groupUsers ||
        typeof res.data.groupByUuid?.groupUsers?.totalCount === "undefined"
    ) {
        return null
    }
    return res.data.groupByUuid.groupUsers.totalCount > 0
}

export async function getAllGroupUuids(): Promise<string[] | null> {
    const res = await performQuery<AllGroupUuidsQuery>(
        AllGroupUuids.loc!.source,
        {}
    )
    if (!res.data) {
        return null
    }
    return res.data.groups?.nodes.map((node) => node?.uuid) || []
}

export async function getGroupLanguageByUuid(
    uuid: string
): Promise<GroupLanguageByUuidQuery | null> {
    const res = await performQuery<GroupLanguageByUuidQuery>(
        GroupLanguageByUuid.loc!.source,
        { uuid }
    )

    if (!res.data?.groupByUuid) {
        return null
    }
    return res.data || null
}
