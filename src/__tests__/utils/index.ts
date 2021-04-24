import Fakerator from "fakerator"

import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import { fetch as crossFetch } from "cross-fetch"

import { performQuery } from "../../server/gql"

import log from "../../logger"

import type {
    Language,
    User,
    UserLanguage,
    CreateUserMutation,
    CreateUserLanguageMutation,
    LanguageIdByAlpha2Query,
} from "../../types/generated/graphql"
import type { Pool } from "pg"
import type { Gender } from "../../users"

const BASE_URL = "http://everglot-app:3000"

const fakerator = new Fakerator()

export type TestUser = {
    id: User["id"]
    uuid: string
    email: User["email"]
    username: User["username"]
    gender: Gender
    avatarUrl: User["avatarUrl"]
    passwordHash: User["passwordHash"]
    locale: User["locale"]
    signedUpWithTokenId: User["signedUpWithTokenId"]
}

export type TestLanguage = Pick<Language, "alpha2" | "id">

const chlog = log.child({ namespace: "test-utils" })

export async function createUser(): Promise<TestUser> {
    const fakeUser = fakerator.entity.user()
    const user = {
        uuid: uuidv4(),
        gender: "m" as Gender,
        email: fakeUser.email,
        passwordHash: hashSync(fakeUser.password, 1),
        username: fakeUser.userName,
        avatarUrl: fakeUser.avatar,
        locale: null,
        signedUpWithTokenId: null,
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
            $signedUpWithTokenId: Int
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
                        signedUpWithTokenId: $signedUpWithTokenId
                    }
                }
            ) {
                user {
                    id
                }
            }
        }`,
        user
    )
    expect(res).not.toBeNull()
    expect(res.data).not.toBeNull()
    expect(res.data!.createUser?.user).not.toBeNull()
    expect(res.errors).toBeFalsy()
    chlog
        .child({ user: { ...user, id: res.data!.createUser!.user!.id! } })
        .trace("Created test user")
    return { ...user, id: res.data!.createUser!.user!.id! }
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
    chlog.child({ userLanguage }).trace("Created test user language")
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
    return { alpha2, id: res.data!.languageByAlpha2!.id! }
}

export async function fetch(path: string, init?: RequestInit | undefined) {
    return await crossFetch(`${BASE_URL}${path}`, init)
}

/**
 * Empties all tables that aren't purely lookup tables.
 * Expects the truncation to succeed.
 *
 * Can be used to obtain a clean database state before and after individual tests.
 */
export async function truncateAllTables(db: Pool) {
    const success = await doTruncateNonLookupTables(db).catch(() => false)
    expect(success).toBe(true)
}

/**
 * Runs a database transaction that empties all tables that aren't
 * purely lookup tables such as `languages` or `language_skill_levels`.
 *
 * @throws any error that occurs during truncation transaction
 */
export async function doTruncateNonLookupTables(db: Pool) {
    const client = await db.connect()
    try {
        await client.query("begin")
        await client.query(`set role to everglot_app_user`)
        await client.query(`delete from app_public.user_languages where true`)
        await client.query(`delete from app_public.group_users where true`)
        await client.query(`delete from app_public.messages where true`)
        await client.query(`delete from app_public.groups where true`)
        await client.query(
            `update app_public.users set signed_up_with_token_id = null where true`
        )
        await client.query(`delete from app_public.invite_tokens where true`)
        await client.query(`delete from app_public.users where true`)
        await client.query("commit")
        return true
    } catch (e) {
        await client.query("rollback")
        chlog.child({ e }).error("Failed to truncate non-lookup tables")
        throw e
    } finally {
        client.release()
    }
}
