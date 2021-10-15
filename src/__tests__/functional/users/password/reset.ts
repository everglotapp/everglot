import { fetch } from "../../../utils"

describe("users/password/reset route", () => {
    test("GET works", async () => {
        const res = await fetch("/users/password/reset")
        expect(res.status).toBe(200)
    })
})
