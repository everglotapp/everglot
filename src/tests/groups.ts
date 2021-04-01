//import { mocked } from "ts-jest/utils"
import { start, performQuery } from "../server/gql"
import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from "uuid"

import type { Language, User, UserLanguage } from "../types/generated/graphql"

// import { foo } from './foo'
// jest.mock('./foo')

// // here the whole foo var is mocked deeply
// const mockedFoo = mocked(foo, true)
// import { assignGroup } from "../server/groups"
import Fakerator from "fakerator"
const fakerator = Fakerator()

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
    return { alpha2, res.data.languageByAlpha2.id }
}

describe("groups", () => {
    let users: Partial<User>[] = []
    let userLanguages: Partial<UserLanguage>[] = []

    beforeAll(async () => {
        await start()
    })

    beforeEach(async () => {
        for (let i = 0; i < 10; ++i) {
            const user = await createUser()
            users.push(user)
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: 33,
                    languageSkillLevelId: 1,
                    native: false,
                })
            )
        }
        for (let i = 0; i < 10; ++i) {
            const user = await createUser()
            users.push(user)
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: 33,
                    languageSkillLevelId: null,
                    native: true,
                })
            )
        }
        for (let i = 0; i < 10; ++i) {
            const user = await createUser()
            users.push(user)
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: 37,
                    languageSkillLevelId: 1,
                    native: false,
                })
            )
        }
        for (let i = 0; i < 10; ++i) {
            const user = await createUser()
            users.push(user)
            userLanguages.push(
                await createUserLanguage({
                    userId: user.id,
                    languageId: 37,
                    languageSkillLevelId: null,
                    native: true,
                })
            )
        }
    })

    test("t", () => {
        for (let i = 0; i < 40; i += 10) {
            console.log({
                user: users[i],
                languages: [userLanguages[i]],
            })
        }
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
