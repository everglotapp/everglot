import log from "../../logger"

import { start } from "../../server/gql"
import { connectToDatabase } from "../../server/db"

import type { Maybe } from "../../types/generated/graphql"

import { tryFormingGroupsWithUser } from "../../server/groups"

import {
    getLanguage,
    createUser,
    createUserLanguage,
    truncateAllTables,
    seedDatabase,
} from "../utils"
import type { TestUser, TestLanguage } from "../utils"
import { Pool } from "pg"

const GROUP_LEARNER_SIZE = 4
const GROUP_NATIVE_SIZE = 2

// jest.setTimeout(15000)

describe("groups", () => {
    let english: Maybe<TestLanguage> = null
    let german: Maybe<TestLanguage> = null

    let db: Pool = new Pool()

    const createTestUser = async ({
        teaching,
        learning,
    }: {
        teaching: TestLanguage
        learning: TestLanguage
    }): Promise<TestUser> => {
        const user = await createUser()
        expect(user).not.toBeNull()
        const teachingMembership = await createUserLanguage({
            userId: user.id,
            languageId: teaching.id,
            languageSkillLevelId: null,
            native: true,
        })
        expect(teachingMembership).not.toBeNull()
        const learningMembership = await createUserLanguage({
            userId: user.id,
            languageId: learning.id,
            languageSkillLevelId: 1,
            native: false,
        })
        expect(learningMembership).not.toBeNull()
        return user
    }

    beforeAll(async () => {
        const pool = await connectToDatabase()
        expect(pool).toBeTruthy()
        db = pool!
        await start()
        english = await getLanguage({ alpha2: "en" })
        expect(english).toBeTruthy()
        german = await getLanguage({ alpha2: "de" })
        expect(english).toBeTruthy()
    })

    beforeEach(async () => {
        await truncateAllTables(db)
        await seedDatabase(db)
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    afterAll(async () => {
        // await disconnectFromDatabase()
    })

    test("group forming works", async () => {
        const chlog = log.child({
            namespace: "group forming works",
        })
        let user = null
        for (let i = 0; i < GROUP_LEARNER_SIZE; ++i) {
            chlog.debug("Adding English learner", i)
            user = await createTestUser({
                teaching: german!,
                learning: english!,
            })
            expect(user).not.toBeNull()
            expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        }

        for (let i = 0; i < GROUP_NATIVE_SIZE - 1; ++i) {
            chlog.debug("Adding English native speaker", i)
            user = await createTestUser({
                teaching: english!,
                learning: german!,
            })
            expect(user).not.toBeNull()
            expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        }

        chlog.debug("Adding English native speaker", GROUP_NATIVE_SIZE)
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        const englishGroupIds = await tryFormingGroupsWithUser(user.id)
        expect(englishGroupIds).not.toEqual([])
        expect(englishGroupIds.length).toEqual(1)

        chlog.debug("Adding a 3rd German learner")
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        expect(await tryFormingGroupsWithUser(user.id)).toEqual([])

        chlog.debug("Adding a 4th German learner")
        user = await createTestUser({
            teaching: english!,
            learning: german!,
        })
        expect(user).not.toBeNull()
        const germanGroupIds = await tryFormingGroupsWithUser(user.id)
        expect(germanGroupIds).not.toEqual([])
        expect(germanGroupIds.length).toEqual(1)
    })
})
