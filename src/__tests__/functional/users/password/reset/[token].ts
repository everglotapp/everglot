import { fetch } from "../../../../utils"

describe("users/password/reset/[token] route", () => {
    test("GET works", async () => {
        const res = await fetch("/users/password/reset/someToken")
        expect(res.status).toBe(200)
    })
})
