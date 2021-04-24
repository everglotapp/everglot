import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    sessionCookieHeader,
} from "../utils"
import type { TestUser } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"
import type { Maybe } from "../../types/generated/graphql"

describe("chat route", () => {
    let exampleUser: Maybe<TestUser> = null

    let db: Pool = new Pool()

    let sessionCookie: Maybe<string> = null

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
        sessionCookie = await login(exampleUser)
        expect(sessionCookie).toBeTruthy()
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("GET redirects when not signed in", async () => {
        const res = await fetch("/chat", {
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })

    test("GET works when signed in", async () => {
        const res = await fetch("/chat", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
    })
})
