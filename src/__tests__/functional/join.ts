import { createToken } from "../../server/inviteTokens"
import { AuthMethod } from "../../users"
import { fetch, truncateAllTables, seedDatabase } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"

import Fakerator from "fakerator"
const fakerator = new Fakerator()

describe("join", () => {
    const EXAMPLE_USER = fakerator.entity.user()

    const EXAMPLE_TOKEN = "CJeJiFdoJyytlQaYTqdFj5hXuPFwLWR3nzTWeuTPhAAE"
    const INVALID_TOKEN = "InvalidToken123"

    const createExampleToken = async () => {
        return await createToken({
            userId: null,
            token: EXAMPLE_TOKEN,
        })
    }

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

        const tokenId = await createExampleToken()
        expect(tokenId).not.toBeNull()
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("fetching route works", async () => {
        const res = await fetch("/join")
        expect(res.status).toBe(200)
    })

    test("joining with email fails without auth method", async () => {
        const body = JSON.stringify({
            email: EXAMPLE_USER.email,
            token: EXAMPLE_TOKEN,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(422)
    })

    test("joining with email fails without token", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: EXAMPLE_USER.email,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(422)
    })

    test("joining with email fails with invalid token", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: EXAMPLE_USER.email,
            token: INVALID_TOKEN,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(422)
    })

    test("joining with email fails without password", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: EXAMPLE_USER.email,
            token: EXAMPLE_TOKEN,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(422)
    })

    test("joining with email succeeds with existing token", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: EXAMPLE_USER.email,
            password: EXAMPLE_USER.password,
            token: EXAMPLE_TOKEN,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(200)
    })
})
