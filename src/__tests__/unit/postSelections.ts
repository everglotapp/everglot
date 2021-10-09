import { v4 as uuidv4 } from "uuid"
import { BodyPartType, PostGameRange } from "../../constants"
import { getBodyParts } from "../../routes/_helpers/posts/selections"

describe("postSelections", () => {
    let UUID_1: string
    let UUID_2: string

    beforeAll(() => {
        UUID_1 = uuidv4()
        UUID_2 = uuidv4()
    })

    test("getBodyParts returns single text body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = []
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am happy", kind: BodyPartType.Text },
        ])
    })
    test("getBodyParts returns selection start body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = [
            { start: 0, end: 3, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am", kind: BodyPartType.Range, uuid: UUID_1 },
            { value: " happy", kind: BodyPartType.Text },
        ])
    })
    test("getBodyParts returns selection end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = [
            { start: 5, end: 9, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am ", kind: BodyPartType.Text },
            { value: "happy", kind: BodyPartType.Range, uuid: UUID_1 },
        ])
    })
    test("getBodyParts returns selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = [
            { start: 2, end: 3, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I ", kind: BodyPartType.Text },
            { value: "am", kind: BodyPartType.Range, uuid: UUID_1 },
            { value: " happy", kind: BodyPartType.Text },
        ])
    })
    test("getBodyParts returns selection start and end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = [
            { start: 0, end: 0, uuid: UUID_1 },
            { start: 5, end: 9, uuid: UUID_2 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartType.Range, uuid: UUID_1 },
            { value: " am ", kind: BodyPartType.Text },
            { value: "happy", kind: BodyPartType.Range, uuid: UUID_2 },
        ])
    })
    test("getBodyParts returns 2 selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameRange[] = [
            { start: 1, end: 3, uuid: UUID_1 },
            { start: 5, end: 5, uuid: UUID_2 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartType.Text },
            { value: " am", kind: BodyPartType.Range, uuid: UUID_1 },
            { value: " ", kind: BodyPartType.Text },
            { value: "h", kind: BodyPartType.Range, uuid: UUID_2 },
            { value: "appy", kind: BodyPartType.Text },
        ])
    })
})
