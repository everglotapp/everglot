import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    getSessionIdCookieValue,
} from "../../utils"
import type { TestUser } from "../../utils"
import { start } from "../../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../../server/db"
import type { Maybe } from "../../../types/generated/graphql"

describe("auth/refresh route", () => {
    let exampleUser: Maybe<TestUser> = null

    let db: Pool = new Pool()

    let sessionCookie: Maybe<string> = null
    let refreshToken: Maybe<string> = null

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

    const signIn = async (opts: { generateRefreshToken: boolean }) => {
        expect(exampleUser).toBeTruthy()
        const loginResult = await login(exampleUser!, opts)
        expect(loginResult.sessionCookie).toBeTruthy()
        sessionCookie = loginResult.sessionCookie
        return loginResult
    }

    const signInAndGetRefreshToken = async () => {
        const { res: loginResponse } = await signIn({
            generateRefreshToken: true,
        })
        expect(loginResponse.status).toBe(200)
        expect(loginResponse.body).toBeTruthy()
        const loginResult = await loginResponse.json()
        expect(typeof loginResult).toBe("object")
        expect(loginResult.success).toBeTruthy()
        expect(loginResult.refreshToken).toBeTruthy()
        expect(typeof loginResult.refreshToken).toBe("string")
        refreshToken = loginResult.refreshToken
    }

    test("POST fails with invalid refresh token", async () => {
        const body: string = JSON.stringify({
            refreshToken: "somethingInvalid",
        })
        const res = await fetch("/auth/refresh", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res.status).toBe(422)
    })

    test("POST when signed out regenerates refresh token", async () => {
        await signInAndGetRefreshToken()
        const body: string = JSON.stringify({
            refreshToken,
        })
        const res = await fetch("/auth/refresh", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        const result = await res.json()
        expect(typeof result).toBe("object")
        expect(result.success).toBeTruthy()
        expect(result.refreshToken).toBeTruthy()
        expect(typeof result.refreshToken).toBe("string")
        expect(result.refreshToken).not.toEqual(refreshToken)
    })

    test("POST when signed out regenerates session ID cookie", async () => {
        await signInAndGetRefreshToken()
        const body: string = JSON.stringify({
            refreshToken,
        })
        const res = await fetch("/auth/refresh", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
        expect(getSessionIdCookieValue(res.headers.raw())).not.toEqual(
            sessionCookie
        )
    })

    test("POST with the same token twice fails", async () => {
        await signInAndGetRefreshToken()
        const body: string = JSON.stringify({
            refreshToken,
        })
        const res = await fetch("/auth/refresh", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        const result = await res.json()
        expect(typeof result).toBe("object")
        expect(result.success).toBeTruthy()
        expect(result.refreshToken).toBeTruthy()
        expect(typeof result.refreshToken).toBe("string")
        expect(result.refreshToken).not.toEqual(refreshToken)
        const res2 = await fetch("/auth/refresh", {
            method: "POST",
            body, // same body as before
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res2.status).toBe(422)
    })
})
