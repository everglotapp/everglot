import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    sessionCookieHeader,
    getLanguage,
    createUserLanguage,
    TestLanguage,
    getAppUrl,
} from "../utils"
import type { TestUser } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"
import type { Maybe } from "../../types/generated/graphql"

describe("index route", () => {
    let exampleUser: Maybe<TestUser> = null
    let english: Maybe<TestLanguage> = null

    let db: Pool = new Pool()

    let sessionCookie: Maybe<string> = null

    const signIn = async () => {
        expect(exampleUser).toBeTruthy()
        sessionCookie = (await login(exampleUser!)).sessionCookie
        expect(sessionCookie).toBeTruthy()
    }

    beforeAll(async () => {
        const pool = await connectToDatabase()
        expect(pool).toBeTruthy()
        db = pool!
        await start()
    })

    beforeEach(async () => {
        await truncateAllTables(db)
        await seedDatabase(db)

        exampleUser = await createUser()
        english = await getLanguage({ alpha2: "en" })
        expect(english).toBeTruthy()
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("GET redirects when not signed in", async () => {
        const res = await fetch("/", {
            redirect: "manual",
        })
        expect(res.status).toBe(302)
        expect(res.headers.get("location")).toBe(getAppUrl("/login"))
    })

    test("GET redirects when signed in but profile has not been set up", async () => {
        await signIn()
        const res = await fetch("/", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(302)
        expect(res.headers.get("location")).toBe(getAppUrl("/signup"))
    })

    test("GET does not redirect when signed in and profile has been set up", async () => {
        await signIn()
        await createUserLanguage({
            userId: exampleUser!.id,
            languageId: english!.id,
            native: true,
            languageSkillLevelId: null,
        })
        const res = await fetch("/", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
    })
})
