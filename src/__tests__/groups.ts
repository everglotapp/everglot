//import { mocked } from "ts-jest/utils"
import { start } from "../server/gql"
import { createDatabasePool } from "../server/db"

import type { Language, User, UserLanguage } from "../types/generated/graphql"

import { tryFormingGroupsWithUser } from "../server/groups"

import { getLanguage, createUser, createUserLanguage } from "./utils"

const GROUP_LEARNER_SIZE = 4
const GROUP_NATIVE_SIZE = 2

const pool = createDatabasePool()

describe("groups", () => {
    let users: Partial<User>[] = []
    let userLanguages: Partial<UserLanguage>[] = []
    let english: Partial<Language> | null = null
    let german: Partial<Language> | null = null

    beforeAll(async () => {
        await start()
        english = await getLanguage({ alpha2: "en" })
        expect(english).toBeTruthy()
        german = await getLanguage({ alpha2: "de" })
        expect(english).toBeTruthy()
    })

    beforeEach(async () => {
        const client = await pool.connect()
        expect(client).toBeTruthy()
        await client.query(`SET ROLE TO everglot_app_user`)
        await client.query(`DELETE FROM app_public.user_languages WHERE TRUE`)
        userLanguages = []
        await client.query(`DELETE FROM app_public.group_users WHERE TRUE`)
        await client.query(`DELETE FROM app_public.messages WHERE TRUE`)
        await client.query(`DELETE FROM app_public.groups WHERE TRUE`)
        await client.query(`DELETE FROM app_public.users WHERE TRUE`)
        users = []
        await client.query(`SET ROLE TO evg_server`)
    })

    afterEach(async () => {
        const client = await pool.connect()
        expect(client).toBeTruthy()
        await client.query(`SET ROLE TO everglot_app_user`)
        await client.query(`DELETE FROM app_public.user_languages WHERE TRUE`)
        userLanguages = []
        await client.query(`DELETE FROM app_public.group_users WHERE TRUE`)
        await client.query(`DELETE FROM app_public.messages WHERE TRUE`)
        await client.query(`DELETE FROM app_public.groups WHERE TRUE`)
        await client.query(`DELETE FROM app_public.users WHERE TRUE`)
        users = []
        await client.query(`SET ROLE TO evg_server`)
    })

    test("group forming works", async () => {
        const createTestUser = async ({
            teaching,
            learning,
        }: {
            teaching: Partial<Language>
            learning: Partial<Language>
        }): Promise<Partial<User>> => {
            const user = await createUser()
            expect(user).not.toBeNull()
            users.push(user)
            const teachingMembership = await createUserLanguage({
                userId: user.id,
                languageId: teaching.id,
                languageSkillLevelId: null,
                native: true,
            })
            expect(teachingMembership).not.toBeNull()
            userLanguages.push(teachingMembership)
            const learningMembership = await createUserLanguage({
                userId: user.id,
                languageId: learning.id,
                languageSkillLevelId: 1,
                native: false,
            })
            expect(learningMembership).not.toBeNull()
            userLanguages.push(learningMembership)
            return user
        }

        let user = null
        for (let i = 0; i < GROUP_LEARNER_SIZE; ++i) {
            console.log("Adding English learner", i)
            user = await createTestUser({
                teaching: german!,
                learning: english!,
            })
            expect(user).not.toBeNull()
            expect(await tryFormingGroupsWithUser(user.id!)).toEqual([])
        }

        for (let i = 0; i < GROUP_NATIVE_SIZE - 1; ++i) {
            console.log("Adding English native speaker", i)
            user = await createTestUser({
                teaching: english!,
                learning: german!,
            })
            expect(user).not.toBeNull()
            expect(await tryFormingGroupsWithUser(user.id!)).toEqual([])
        }

        console.log("Adding English native speaker", GROUP_NATIVE_SIZE)
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        const englishGroupIds = await tryFormingGroupsWithUser(user.id!)
        expect(englishGroupIds).not.toEqual([])
        expect(englishGroupIds.length).toEqual(1)

        console.log("Adding a 3rd German learner")
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        expect(await tryFormingGroupsWithUser(user.id!)).toEqual([])

        console.log("Adding a 4th German learner")
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        const germanGroupIds = await tryFormingGroupsWithUser(user.id!)
        expect(germanGroupIds).not.toEqual([])
        expect(germanGroupIds.length).toEqual(1)
    })
})
