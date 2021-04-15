import { fetch } from "../utils"

describe("index", () => {
    test("fetching route works", async () => {
        const res = await fetch("/")
        expect(res.status).toBe(200)
    })
})
