import { findPotentialUsernameMentions } from "../../server/users"

describe("users", () => {
    test("username mentions work", async () => {
        expect(findPotentialUsernameMentions("i am @joe @no")).toEqual([
            { username: "joe", startIndex: 5, endIndex: 8 },
            { username: "no", startIndex: 10, endIndex: 12 },
        ])
        expect(findPotentialUsernameMentions("@joe@no")).toEqual([
            { username: "joe", startIndex: 0, endIndex: 3 },
            { username: "no", startIndex: 4, endIndex: 6 },
        ])
        expect(findPotentialUsernameMentions("i am @@")).toEqual([])
        expect(findPotentialUsernameMentions("@@ am @@")).toEqual([])
        expect(findPotentialUsernameMentions("@@ a@ @@")).toEqual([])
        expect(findPotentialUsernameMentions("@@ @ @@")).toEqual([])
        expect(findPotentialUsernameMentions("@")).toEqual([])
        expect(findPotentialUsernameMentions("m @")).toEqual([])
        expect(findPotentialUsernameMentions("@ m")).toEqual([])
    })
})

export {}
