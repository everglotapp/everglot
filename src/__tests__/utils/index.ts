import Fakerator from "fakerator"

import { hashSync } from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import nodeFetch from "node-fetch"
import type { Response, RequestInit } from "node-fetch"

import { performQuery } from "../../server/gql"

import log from "../../logger"

import {
    Language,
    User,
    UserLanguage,
    CreateUserMutation,
    CreateUserLanguageMutation,
    LanguageIdByAlpha2Query,
    Maybe,
    LanguageIdByAlpha2,
    CreateUserLanguage,
    CreateUser,
} from "../../types/generated/graphql"
import type { Pool } from "pg"
import { AuthMethod, Gender } from "../../users"
import {
    generateEmailUnsubscribeToken,
    generateEmailConfirmToken,
} from "../../helpers/tokens"

const { BASE_URL, SESSION_COOKIE_NAME } = process.env

const fakerator = new Fakerator()

export type TestUser = {
    uuid: string
    gender: Gender
    password: string
} & Pick<
    User,
    | "id"
    | "email"
    | "username"
    | "avatarUrl"
    | "passwordHash"
    | "locale"
    | "signedUpWithTokenId"
    | "emailUnsubscribeToken"
    | "emailConfirmToken"
    | "emailConfirmTokenCreatedAt"
>

export type TestLanguage = Pick<Language, "alpha2" | "id">

const chlog = log.child({ namespace: "test-utils" })

export async function createUser(): Promise<TestUser> {
    const fakeUser = fakerator.entity.user()
    const user = {
        uuid: uuidv4(),
        gender: "m" as Gender,
        email: fakeUser.email,
        password: fakeUser.password,
        passwordHash: hashSync(fakeUser.password, 1),
        username: fakeUser.userName,
        avatarUrl: fakeUser.avatar,
        locale: null,
        signedUpWithTokenId: null,
        emailUnsubscribeToken: await generateEmailUnsubscribeToken(),
        emailConfirmToken: await generateEmailConfirmToken(),
        emailConfirmTokenCreatedAt: new Date().toISOString(),
    }

    const res = await performQuery<CreateUserMutation>(
        CreateUser.loc!.source,
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
        CreateUserLanguage.loc!.source,
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
        LanguageIdByAlpha2.loc!.source,
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

export async function fetch(
    path: string,
    init: RequestInit | undefined = undefined
) {
    return await nodeFetch(`${BASE_URL}${path}`, init)
}

/**
 * Empties all tables that aren't purely lookup tables.
 * Expects the truncation to succeed.
 *
 * Can be used to obtain a clean database state before and after individual tests.
 */
export async function truncateAllTables(db: Pool) {
    await doTruncateNonLookupTables(db)
}

/**
 * Runs a database transaction that empties all tables that aren't
 * purely lookup tables such as `languages` or `language_skill_levels`.
 *
 * @throws any error that occurs during truncation transaction
 */
export async function doTruncateNonLookupTables(db: Pool) {
    const client = await db.connect()
    const SCHEMA = "app_public"
    try {
        await client.query("begin")
        await client.query(`set role to everglot_app_user`)
        await client.query(`truncate table ${SCHEMA}.refresh_tokens cascade`)
        await client.query(`truncate table ${SCHEMA}.user_languages cascade`)
        await client.query(`truncate table ${SCHEMA}.group_users cascade`)
        await client.query(`truncate table ${SCHEMA}.message_previews cascade`)
        await client.query(`truncate table ${SCHEMA}.messages cascade`)
        await client.query(`truncate table ${SCHEMA}.groups cascade`)
        await client.query(
            `update ${SCHEMA}.users set signed_up_with_token_id = null where true`
        )
        await client.query(`truncate table ${SCHEMA}.invite_tokens cascade`)
        await client.query(`truncate table ${SCHEMA}.user_sessions cascade`)
        await client.query(`truncate table ${SCHEMA}.users cascade`)
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

/**
 * Creates all records that might get deleted during database teardown.
 *
 * @throws any error that occurs during seeding transaction
 */
export async function seedDatabase(db: Pool) {
    const client = await db.connect()
    try {
        await client.query("begin")
        await client.query(
            `INSERT INTO app_public.groups(
                global,
                group_name,
                language_id,
                uuid,
                language_skill_level_id
            ) VALUES
            (true, 'General', (
                select id
                from app_public.languages
                where alpha2 = 'en'
                limit 1
            ), $1, null),
            (true, 'General', (
                select id
                from app_public.languages
                where alpha2 = 'zh'
                limit 1
            ), $2, null),
            (true, 'General', (
                select id
                from app_public.languages
                where alpha2 = 'de'
                limit 1
            ), $3, null)`,
            [uuidv4(), uuidv4(), uuidv4()]
        )
        await client.query("commit")
        return true
    } catch (e) {
        await client.query("rollback")
        chlog.child({ e }).error("Failed to setup database")
        throw e
    } finally {
        client.release()
    }
}

export async function login(
    user: TestUser,
    opts?: { generateRefreshToken: boolean }
): Promise<{ sessionCookie: Maybe<string>; res: Response }> {
    const body = JSON.stringify({
        method: AuthMethod.EMAIL,
        email: user.email,
        password: user.password,
        ...(opts || {}),
    })
    const res = await fetch("/login", {
        method: "POST",
        body,
        headers: { "content-type": "application/json" },
        redirect: "manual",
    })
    const clonedRes = res.clone()
    chlog
        .child({
            text: await res.text(),
            statusCode: res.status,
        })
        .trace("Attempted to sign in during test")
    expect(res.status).toBe(200)
    const sessionCookie = getSessionIdCookieValue(clonedRes.headers.raw())
    return { res: clonedRes, sessionCookie }
}

export function makeSessionIdCookieHeader(value: Maybe<string>) {
    if (!value) {
        return ""
    }
    return `${SESSION_COOKIE_NAME}=${value}`
}

// Adapted from https://stackoverflow.com/a/55680330/9926795
export function getSessionIdCookieValue(headers: { [k: string]: string[] }) {
    const cookies: string[] = headers["set-cookie"] || []
    const headerToCookie = (header: string) => {
        const [name, value] = header.split("=")
        return { name, value: value.split(";")[0].trim() }
    }
    const sessionCookie = cookies.find((raw) => {
        return headerToCookie(raw).name === SESSION_COOKIE_NAME
    })
    if (!sessionCookie) {
        return null
    }
    return headerToCookie(sessionCookie).value
}

export function getAppUrl(path = "/") {
    return `${BASE_URL}${path}`
}
