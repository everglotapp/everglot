import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    makeSessionIdCookieHeader,
} from "../../../utils"
import type { TestUser } from "../../../utils"
import { start } from "../../../../server/gql"
import { createAndAssignGroup } from "../../../../server/groups"
import { Pool } from "pg"
import { connectToDatabase } from "../../../../server/db"
import type { Maybe } from "../../../../types/generated/graphql"

describe("[uuid] route", () => {
    let exampleUser: Maybe<TestUser> = null

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
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("GET redirects when not signed in", async () => {
        const res = await fetch("/groups/rtc-token/this-is-a-wrong-uuid", {
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })

    test("GET fails when giving a wrong UUID", async () => {
        await signIn()
        const res = await fetch("/groups/rtc-token/this-is-a-wrong-uuid", {
            headers: {
                cookie: makeSessionIdCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
        expect(await res.json()).toEqual({
            success: false,
        })
    })

    test("GET works when giving the UUID of a group that the user is in", async () => {
        const group = await createAndAssignGroup([exampleUser!.id], [], 1, 1)
        expect(group).not.toBeNull()
        await signIn()
        const res = await fetch(`/groups/rtc-token/${group!.uuid}`, {
            headers: {
                cookie: makeSessionIdCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
        const json = await res.json()
        expect(json).toBeTruthy()
        expect(json.success).toBe(true)
        expect(typeof json.token).toBe("string")
    })
})
