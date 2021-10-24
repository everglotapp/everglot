import { getUsernameMentions } from "../../server/users"

describe("users", () => {
    test("username mentions work", async () => {
        expect(getUsernameMentions("i am @joe @no")).toEqual([
            { username: "joe", startIndex: 5, endIndex: 8 },
            { username: "no", startIndex: 10, endIndex: 12 },
        ])
        expect(getUsernameMentions("@joe@no")).toEqual([
            { username: "joe", startIndex: 0, endIndex: 3 },
            { username: "no", startIndex: 4, endIndex: 6 },
        ])
        expect(getUsernameMentions("i am @@")).toEqual([])
        expect(getUsernameMentions("@@ am @@")).toEqual([])
        expect(getUsernameMentions("@@ a@ @@")).toEqual([])
        expect(getUsernameMentions("@@ @ @@")).toEqual([])
        expect(getUsernameMentions("@")).toEqual([])
        expect(getUsernameMentions("m @")).toEqual([])
        expect(getUsernameMentions("@ m")).toEqual([])
    })
})

export {}
