import {
    findPotentialUsernameMentions,
    sanitizeUsername,
} from "../../server/users"

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

    test("replacing username characters works", async () => {
        expect(sanitizeUsername("Jane Doe")).toEqual("Jane_Doe")
        expect(sanitizeUsername(" Jane Doe ")).toEqual("_Jane_Doe_")
        expect(sanitizeUsername("  Jane Doe")).toEqual("__Jane_Doe")
        expect(sanitizeUsername("Jane Doe  ")).toEqual("Jane_Doe__")
        expect(sanitizeUsername("Jane")).toEqual("Jane")
        expect(sanitizeUsername("jane")).toEqual("jane")
        expect(sanitizeUsername("jane12")).toEqual("jane12")
        expect(sanitizeUsername("12jane")).toEqual("12jane")
        expect(sanitizeUsername("**jane")).toEqual("__jane")
        expect(sanitizeUsername("jane**")).toEqual("jane__")
        expect(sanitizeUsername("*_54öjanü!_#*_*`^°")).toEqual(
            "__54_jan__________"
        )
        expect(sanitizeUsername("")).toEqual("")
    })
})

export {}
