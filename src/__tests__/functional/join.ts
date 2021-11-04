import { createInviteToken } from "../../server/inviteTokens"
import { AuthMethod } from "../../users"
import {
    fetch,
    truncateAllTables,
    seedDatabase,
    sessionCookieHeader,
    login,
    createUser,
} from "../utils"
import type { TestUser } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"

import Fakerator from "fakerator"
import type { Maybe } from "../../types/generated/graphql"
const fakerator = new Fakerator()

describe("join route", () => {
    let existingUser: Maybe<TestUser> = null
    const EXAMPLE_USER = fakerator.entity.user()

    const EXAMPLE_TOKEN = "CJeJiFdoJyytlQaYTqdFj5hXuPFwLWR3nzTWeuTPhAAE"
    const INVALID_TOKEN = "InvalidToken123"

    const createExampleToken = async () => {
        return await createInviteToken({
            userId: null,
            token: EXAMPLE_TOKEN,
        })
    }

    let db: Pool = new Pool()

    let sessionCookie: Maybe<string> = null

    const signIn = async () => {
        expect(existingUser).toBeTruthy()
        sessionCookie = (await login(existingUser!)).sessionCookie
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

        const tokenId = await createExampleToken()
        expect(tokenId).not.toBeNull()

        existingUser = await createUser()
    })

    afterEach(async () => {
        await truncateAllTables(db)
    })

    test("GET works", async () => {
        const res = await fetch("/join")
        expect(res.status).toBe(200)
    })

    test("GET redirects when signed in", async () => {
        await signIn()
        const res = await fetch("/join", {
            headers: {
                cookie: sessionCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })

    test("POST with email fails without auth method", async () => {
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

    test("POST with email fails without token", async () => {
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

    test("POST with email fails with invalid token", async () => {
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

    test("POST with email fails without password", async () => {
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

    test("POST with email succeeds with existing token", async () => {
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

    test("POST with generateRefreshToken returns refresh token", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: EXAMPLE_USER.email,
            password: EXAMPLE_USER.password,
            token: EXAMPLE_TOKEN,
            generateRefreshToken: true,
        })
        const res = await fetch("/join", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
        })
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        const result = await res.json()
        expect(typeof result).toBe("object")
        expect(result.success).toBeTruthy()
        expect(result.refreshToken).toBeTruthy()
        expect(typeof result.refreshToken).toBe("string")
    })
})
