//import { mocked } from "ts-jest/utils"
import { start, performQuery } from "../server/gql"
import { createDatabasePool } from "../server/db"
import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import type { Language, User, UserLanguage } from "../types/generated/graphql"

import { tryFormingGroupsWithUser } from "../server/groups"

// import { foo } from './foo'
// jest.mock('./foo')

// // here the whole foo var is mocked deeply
// const mockedFoo = mocked(foo, true)
import Fakerator from "fakerator"
const fakerator = Fakerator()

const GROUP_LEARNER_SIZE = 4
const GROUP_NATIVE_SIZE = 2

async function createUser() {
    let user: any = {
        ...fakerator.entity.user(),
        uuid: uuidv4(),
        gender: "m",
    }

    const res = await performQuery<{
        createUser: { user: { id: number } }
    }>(
        `mutation MyMutation($email: String!, $gender: String!, $passwordHash: String!, $username: String!, $uuid: UUID!, $avatarUrl: String!, $locale: Int) {
            createUser(
              input: {user: {email: $email, gender: $gender, passwordHash: $passwordHash, username: $username, uuid: $uuid, avatarUrl: $avatarUrl, locale: $locale}}
            ) {
              user {
                id
              }
            }
          }
          `,
        {
            email: user.email,
            gender: user.gender,
            passwordHash: hashSync(user.password, 1),
            username: user.userName,
            uuid: user.uuid,
            avatarUrl: user.avatar,
            locale: 33, // TODO: a commit in the main branch makes this nullable, so we can remove it upon merge
        }
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.errors).toBeFalsy()
    user = { ...user, id: res.data?.createUser.user.id }
    return user
}

async function createUserLanguage({
    userId,
    languageId,
    languageSkillLevelId,
    native,
}: {
    userId: User["id"]
    languageId: UserLanguage["languageId"]
    languageSkillLevelId: UserLanguage["languageSkillLevelId"]
    native: UserLanguage["native"]
}) {
    let userLanguage: Partial<UserLanguage> | null = null
    const res = await performQuery<{
        createUserLanguage: { userLanguage: { id: number } }
    }>(
        `mutation MyMutation($languageId: Int!, $languageSkillLevelId: Int, $native: Boolean!, $userId: Int!) {
            createUserLanguage(
              input: {userLanguage: {languageId: $languageId, languageSkillLevelId: $languageSkillLevelId, native: $native, userId: $userId}}
            ) {
              userLanguage {
                id

              }
            }
          }
          `,
        {
            languageId,
            languageSkillLevelId,
            native,
            userId,
        }
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.errors).toBeFalsy()
    userLanguage = {
        id: res.data?.createUserLanguage.userLanguage.id,
        languageId,
        languageSkillLevelId,
        native,
        userId,
    }
    return userLanguage
}

async function getLanguage({ alpha2 }: { alpha2: Language["alpha2"] }) {
    const res = await performQuery<{
        languageByAlpha2: { id: number }
    }>(
        `query MyQuery($alpha2: String!) {
            languageByAlpha2(alpha2: $alpha2) {
              id
            }
          }`,
        {
            alpha2,
        }
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.errors).toBeFalsy()
    return { alpha2, id: res.data.languageByAlpha2.id }
}

const pool = createDatabasePool()

describe("groups", () => {
    let users: Partial<User>[] = []
    let userLanguages: Partial<UserLanguage>[] = []
    let english: Partial<Language> | null = null
    let german: Partial<Language> | null = null

    beforeAll(async () => {
        await start()
        english = await getLanguage({ alpha2: "en" })
        german = await getLanguage({ alpha2: "de" })
    })

    beforeEach(async () => {
        const client = await pool.connect()
        expect(client).toBeTruthy()
        await client.query(`DELETE FROM app_public.user_languages WHERE TRUE`)
        userLanguages = []
        await client.query(`DELETE FROM app_public.group_user WHERE TRUE`)
        await client.query(`DELETE FROM app_public.groups WHERE TRUE`)
        await client.query(`DELETE FROM app_public.users WHERE TRUE`)
    })

    // afterEach(async () => {
    //     const client = await pool.connect()
    //     expect(client).toBeTruthy()
    //     await client.query(`DELETE FROM app_public.user_languages WHERE TRUE`)
    //     userLanguages = []
    //     await client.query(`DELETE FROM app_public.group_user WHERE TRUE`)
    //     await client.query(`DELETE FROM app_public.groups WHERE TRUE`)
    //     let user = null
    //     while ((user = users.pop())) {
    //         await client.query(`DELETE FROM app_public.users WHERE id = $1`, [
    //             user.id,
    //         ])
    //     }
    //     expect(users).toEqual([])
    // })

    test("group forming works", async () => {
        const createTestUser = async ({
            nativeLang,
            nonNativeLang,
        }: {
            nativeLang: Partial<Language>
            nonNativeLang: Partial<Language>
        }): Promise<Partial<User>> => {
            const user = await createUser()
            users.push(user)
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: nativeLang.id,
                    languageSkillLevelId: null,
                    native: true,
                })
            )
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: nonNativeLang.id,
                    languageSkillLevelId: 1,
                    native: false,
                })
            )
            return user
        }

        let user = null
        for (let i = 0; i < GROUP_LEARNER_SIZE; ++i) {
            console.log("Adding English learner", i)
            user = await createTestUser({
                nativeLang: german,
                nonNativeLang: english,
            })
            expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        }

        for (let i = 0; i < GROUP_NATIVE_SIZE - 1; ++i) {
            console.log("Adding English native speaker", i)
            user = await createTestUser({
                nativeLang: english,
                nonNativeLang: german,
            })
            expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        }

        console.log("Adding English native speaker", GROUP_NATIVE_SIZE)
        user = await createTestUser({
            nativeLang: english,
            nonNativeLang: german,
        })
        const englishGroupIds = await tryFormingGroupsWithUser(user.id)
        expect(englishGroupIds).not.toEqual([])
        expect(englishGroupIds.length).toEqual(1)

        console.log("Adding a 3rd German learner")
        user = await createTestUser({
            nativeLang: english,
            nonNativeLang: german,
        })
        expect(await tryFormingGroupsWithUser(user.id)).toEqual([])

        console.log("Adding a 4th German learner")
        user = await createTestUser({
            nativeLang: english,
            nonNativeLang: german,
        })
        const germanGroupIds = await tryFormingGroupsWithUser(user.id)
        expect(germanGroupIds).not.toEqual([])
        expect(germanGroupIds.length).toEqual(1)
        // for (let i = 0; i < 10; ++i) {
        //     const user = await createUser()
        //     users.push(user)
        //     userLanguages.push(
        //         await createUserLanguage({
        //             userId: user.id,
        //             languageId: german.id,
        //             languageSkillLevelId: 1,
        //             native: false,
        //         })
        //     )
        //     expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        // }
        // for (let i = 0; i < 10; ++i) {
        //     const user = await createUser()
        //     users.push(user)
        //     userLanguages.push(
        //         await createUserLanguage({
        //             userId: user.id,
        //             languageId: german.id,
        //             languageSkillLevelId: null,
        //             native: true,
        //         })
        //     )
        //     if (i === 1 || i === 3) {
        //         const groupIds = await tryFormingGroupsWithUser(user.id)
        //         expect(groupIds).not.toEqual([])
        //         expect(groupIds.length).toEqual(1)
        //     } else {
        //         expect(await tryFormingGroupsWithUser(user.id)).toEqual([])
        //     }
        // }
    })
})

// test('deep', () => {
//   // there will be no TS error here, and you'll have completion in modern IDEs
//   mockedFoo.a.b.c.hello('me')
//   // same here
//   expect(mockedFoo.a.b.c.hello.mock.calls).toHaveLength(1)
// })

// test('direct', () => {
//   foo.name()
//   // here only foo.name is mocked (or its methods if it's an object)
//   expect(mocked(foo.name).mock.calls).toHaveLength(1)
// })
