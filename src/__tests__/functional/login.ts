import { AuthMethod } from "../../users"
import {
    fetch,
    truncateAllTables,
    seedDatabase,
    createUser,
    login,
    makeSessionIdCookieHeader,
} from "../utils"
import type { TestUser } from "../utils"
import { start } from "../../server/gql"
import { Pool } from "pg"
import { connectToDatabase } from "../../server/db"
import type { Maybe } from "../../types/generated/graphql"

describe("login route", () => {
    let exampleUser: Maybe<TestUser> = null
    const INVALID_PASSWORD = "InvalidPassword123"
    const INVALID_EMAIL = "invalid@example.com"

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

    test("GET works", async () => {
        const res = await fetch("/login")
        expect(res.status).toBe(200)
    })

    test("GET redirects when signed in", async () => {
        await signIn()
        const res = await fetch("/login", {
            headers: {
                cookie: makeSessionIdCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(302)
    })

    test("POST succeeds when signed in", async () => {
        await signIn()
        const res = await fetch("/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                cookie: makeSessionIdCookieHeader(sessionCookie),
            },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
    })

    test("POST with email fails without auth method", async () => {
        const body = JSON.stringify({
            email: exampleUser!.email,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        const text = await res.text()
        expect(text).toBeTruthy()
        expect(JSON.parse(text)).toEqual({
            success: false,
            message: null,
        })
        expect(res.status).toBe(422)
    })

    test("POST with email fails without password", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: exampleUser!.email,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        const text = await res.text()
        expect(text).toBeTruthy()
        expect(JSON.parse(text)).toEqual({
            success: false,
            message: "Please specify a password.",
        })
        expect(res.status).toBe(422)
    })

    test("POST with email fails without email", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            password: exampleUser!.password,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        const text = await res.text()
        expect(text).toBeTruthy()
        expect(JSON.parse(text)).toEqual({
            success: false,
            message: "Please specify an email address.",
        })
        expect(res.status).toBe(422)
    })

    test("POST with email fails with invalid password", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: exampleUser!.email,
            password: INVALID_PASSWORD,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        const text = await res.text()
        expect(text).toBeTruthy()
        expect(JSON.parse(text)).toEqual({
            success: false,
            message: "That didn't work. Did you enter the correct password?",
        })
        expect(res.status).toBe(500)
    })

    test("POST with email fails with invalid email", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: INVALID_EMAIL,
            password: exampleUser!.password,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        const text = await res.text()
        expect(text).toBeTruthy()
        expect(JSON.parse(text)).toEqual({
            success: false,
            message: "That didn't work. Did you enter the correct password?",
        })
        expect(res.status).toBe(500)
    })

    test("POST with email succeeds with existing email and password", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: exampleUser!.email,
            password: exampleUser!.password,
        })
        const res = await fetch("/login", {
            method: "POST",
            body,
            headers: { "content-type": "application/json" },
            redirect: "manual",
        })
        expect(res.status).toBe(200)
    })

    test("POST with generateRefreshToken returns refresh token", async () => {
        const body = JSON.stringify({
            method: AuthMethod.EMAIL,
            email: exampleUser!.email,
            password: exampleUser!.password,
            generateRefreshToken: true,
        })
        const res = await fetch("/login", {
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
    })
})
