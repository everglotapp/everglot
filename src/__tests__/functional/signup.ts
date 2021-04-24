import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    sessionCookieHeader,
    createUserLanguage,
    getLanguage,
} from "../utils"
import type { TestUser, TestLanguage } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"
import type { Maybe } from "../../types/generated/graphql"

describe("signup route", () => {
    let exampleUser: Maybe<TestUser> = null
    let english: Maybe<TestLanguage> = null

    let db: Pool = new Pool()

    let sessionCookie: Maybe<string> = null

    beforeAll(async () => {
        const pool = await connectToDatabase()
        expect(pool).toBeTruthy()
        db = pool!
        await start()
        english = await getLanguage({ alpha2: "en" })
        expect(english).toBeTruthy()
    })

    beforeEach(async () => {
        await truncateAllTables(db)
        await seedDatabase(db)

        exampleUser = await createUser()
        sessionCookie = await login(exampleUser)
        expect(sessionCookie).toBeTruthy()
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("GET redirects when not signed in", async () => {
        const res = await fetch("/signup", {
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })

    test("GET works when user is signed in and has no languages", async () => {
        const res = await fetch("/signup", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
    })

    test("GET redirects when user is signed in and has languages", async () => {
        await createUserLanguage({
            userId: exampleUser!.id,
            languageId: english!.id,
            native: true,
            languageSkillLevelId: null,
        })
        const res = await fetch("/signup", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })
})
