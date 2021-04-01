import { performQuery } from "./gql"

import { UserType } from "../types/generated/graphql"

import { db } from "../server/db"

export const GROUP_LEARNER_SIZE = 4
export const GROUP_NATIVE_SIZE = 2

// export async function createGroup(global: Boolean, language: string, language_skill_level: string) {
//   const queryResult = await db?.query({
//     text: `INSERT INTO groups (
//             global,
//             groupName,
//             languageId,
//             languageSkillLevelId
//           )
//           VALUES (
//               $1,
//               $2,
//               (
//                 SELECT id
//                 FROM languages
//                 WHERE alpha2 = $3
//                 LIMIT 1
//               ),
//               (
//                 SELECT id
//                 FROM language_skill_levels
//                 WHERE name = $4
//                 LIMIT 1
//               )
//           )
//           RETURNING id`,
//     values: [global, language + language_skill_level, language, language_skill_level],
//   })
//   return queryResult
// }

// export const test = async () => {
//     const res = await performQuery(
//     `mutation MyMutation($global: Boolean,) {
//       createGroup(
//         input: {group: {global: false, groupName: "dasdasd", languageId: 1, languageSkillLevelId: 1}}
//       ) {
//         group {
//           id
//         }
//       }
//     }`,
//     { id: userId }
//     )
//     console.log(res.data?.user.id)
// }

export async function createGroup(
    global: Boolean,
    group_name: string,
    languageId: number,
    languageSkillLevelId: number
): Promise<number | null> {
    const res = await performQuery(
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

export async function getUsersWithoutLearnerGroup(
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
    console.log(res.data?.usersWithoutLearnerGroup.nodes)
    if (!res.data) {
        return null
    }
    return res.data.usersWithoutLearnerGroup.nodes.map((node) => node.id)
}

export async function getUsersWithoutNativeGroup(
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
    console.log(res.data?.usersWithoutNativeGroup.nodes)
    if (!res.data) {
        return null
    }
    return res.data.usersWithoutNativeGroup.nodes.map((node) => node.id)
}

export async function addUserToGroup(
    userId: number,
    groupId: number,
    userType: UserType
): Promise<number | null> {
    const res = await performQuery(
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
    return res.data?.createGroup.group.id
}

export async function createAndAssignGroup(
    learnerIds: Array<number>,
    nativeIds: Array<number>,
    languageId: number,
    languageSkillLevelId: number
) {
    const groupId = await createGroup(
        false,
        "random",
        languageId,
        languageSkillLevelId
    )
    if (groupId === null) {
        return false
    }
    for (const learner of learnerIds) {
        if (!addUserToGroup(learner, groupId, UserType.Learner)) {
            return false
        }
    }
    for (const native of nativeIds) {
        if (!addUserToGroup(native, groupId, UserType.Native)) {
            return false
        }
    }
    return true
}

// export async function assignGroups() {
//   const all_suported_langs_id = []
//   const all_levels_id = []
//   for (var lang of all_suported_langs) {
//     for (var level of all_levels ) {
//       while (len(getUsersWithoutLearnerGroup(lang, level, GROUP_LEARNER_SIZE)) == GROUP_LEARNER_SIZE && len(getUsersWithoutNativeGroup(lang, GROUP_NATIVE_SIZE) == GROUP_NATIVE_SIZE) {
//        const learnerIds = getUsersWithoutLearnerGroup(lang, level, GROUP_NATIVE_SIZE)
//        const nativeIds = getUsersWithoutNativeGroup(lang, GROUP_NATIVE_SIZE)
//        createAndAssignGroup(learnerIds, nativeIds, lang, level)
//       }
//     }
//   }
//  }

export async function assignGroup(
    languageId: number,
    languageSkillLevelId: number
): Promise<boolean> {
    const learnerIds = await getUsersWithoutLearnerGroup(
        languageId,
        languageSkillLevelId,
        GROUP_LEARNER_SIZE
    )
    if (!learnerIds) {
        return false
    }
    const nativeIds = await getUsersWithoutNativeGroup(
        languageId,
        GROUP_NATIVE_SIZE
    )
    if (!nativeIds) {
        return false
    }
    if (
        learnerIds.length == GROUP_LEARNER_SIZE &&
        nativeIds.length == GROUP_NATIVE_SIZE
    ) {
        createAndAssignGroup(
            learnerIds,
            nativeIds,
            languageId,
            languageSkillLevelId
        )
    }
    return true
}
