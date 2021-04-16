import Fakerator from "fakerator"

import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { fetch as crossFetch } from "cross-fetch"

import { performQuery } from "../../server/gql"

import type {
    Language,
    User,
    UserLanguage,
    CreateUserMutation,
    CreateUserLanguageMutation,
    LanguageIdByAlpha2Query,
} from "../../types/generated/graphql"

const BASE_URL = "http://everglot-app:3000"

const fakerator = Fakerator()

export async function createUser() {
    let user: any = {
        ...fakerator.entity.user(),
        uuid: uuidv4(),
        gender: "m",
    }

    const res = await performQuery<CreateUserMutation>(
        `mutation CreateUser(
            $email: String!
            $gender: String!
            $passwordHash: String!
            $username: String!
            $uuid: UUID!
            $avatarUrl: String!
            $locale: Int
        ) {
            createUser(
                input: {
                    user: {
                        email: $email
                        gender: $gender
                        passwordHash: $passwordHash
                        username: $username
                        uuid: $uuid
                        avatarUrl: $avatarUrl
                        locale: $locale
                    }
                }
            ) {
                user {
                    id
                }
            }
        }`,
        {
            email: user.email,
            gender: user.gender,
            passwordHash: hashSync(user.password, 1),
            username: user.userName,
            uuid: user.uuid,
            avatarUrl: user.avatar,
            locale: null,
        }
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.data!.createUser?.user).not.toBeNull()
    expect(res.errors).toBeFalsy()
    user = { ...user, id: res.data?.createUser?.user?.id }
    return user
}

export async function createUserLanguage({
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
    const res = await performQuery<CreateUserLanguageMutation>(
        `mutation CreateUserLanguage(
            $languageId: Int!
            $languageSkillLevelId: Int
            $native: Boolean!
            $userId: Int!
        ) {
            createUserLanguage(
                input: {
                    userLanguage: {
                        languageId: $languageId
                        languageSkillLevelId: $languageSkillLevelId
                        native: $native
                        userId: $userId
                    }
                }
            ) {
                userLanguage {
                    id
                }
            }
        }`,
        {
            languageId,
            languageSkillLevelId,
            native,
            userId,
        }
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.data?.createUserLanguage?.userLanguage).not.toBeNull()
    expect(res.errors).toBeFalsy()
    userLanguage = {
        id: res.data?.createUserLanguage?.userLanguage?.id,
        languageId,
        languageSkillLevelId,
        native,
        userId,
    }
    return userLanguage
}

export async function getLanguage({ alpha2 }: { alpha2: Language["alpha2"] }) {
    const res = await performQuery<LanguageIdByAlpha2Query>(
        `query LanguageIdByAlpha2($alpha2: String!) {
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
    expect(res.data?.languageByAlpha2).not.toBeNull()
    expect(res.errors).toBeFalsy()
    return { alpha2, id: res.data?.languageByAlpha2?.id }
}

export function fetch(path: string, ...args: any[]) {
    return crossFetch(`${BASE_URL}${path}`, ...args)
}
