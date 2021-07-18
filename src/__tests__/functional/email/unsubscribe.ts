import { AuthMethod } from "../../../users"
import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    getAppUrl,
} from "../../utils"
import type { TestUser } from "../../utils"
import { start } from "../../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../../server/db"
import type { Maybe } from "../../../types/generated/graphql"

describe("login route", () => {
    let exampleUser: Maybe<TestUser> = null
    const INVALID_TOKEN = "INVALIDTOKEN"

    let db: Pool = new Pool()

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

    test("GET not found", async () => {
        const res = await fetch("/email/unsubscribe")
        expect(res.status).toBe(404)
    })

    test("POST succeeds when passing the right token", async () => {
        const res = await fetch(
            `/email/unsubscribe?token=${exampleUser?.emailUnsubscribeToken}`,
            {
                method: "POST",
                redirect: "manual",
            }
        )
        expect(res.status).toBe(302)
        expect(res.headers.get("location")).toBe(
            getAppUrl("/email/unsubscribe/success")
        )
    })

    test("POST fails without a correct token", async () => {
        const body = JSON.stringify({
            email: exampleUser!.email,
        })
        const res = await fetch(`/email/unsubscribe?token=${INVALID_TOKEN}`, {
            method: "POST",
            body,
            redirect: "manual",
        })
        expect(res.status).toBe(422)
        expect(res.headers.get("location")).toBe(
            getAppUrl("/email/unsubscribe/failure")
        )
    })
})
