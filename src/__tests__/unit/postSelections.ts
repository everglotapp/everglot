import { v4 as uuidv4 } from "uuid"
import { BodyPartKind, PostGameSelectionRange } from "../../constants"
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
        const pickedRanges: PostGameSelectionRange[] = []
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection start body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 0, end: 3, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am", kind: BodyPartKind.Selected, uuid: UUID_1 },
            { value: " happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 5, end: 9, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am ", kind: BodyPartKind.Text },
            { value: "happy", kind: BodyPartKind.Selected, uuid: UUID_1 },
        ])
    })
    test("getBodyParts returns selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 2, end: 3, uuid: UUID_1 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I ", kind: BodyPartKind.Text },
            { value: "am", kind: BodyPartKind.Selected, uuid: UUID_1 },
            { value: " happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection start and end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 0, end: 0, uuid: UUID_1 },
            { start: 5, end: 9, uuid: UUID_2 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartKind.Selected, uuid: UUID_1 },
            { value: " am ", kind: BodyPartKind.Text },
            { value: "happy", kind: BodyPartKind.Selected, uuid: UUID_2 },
        ])
    })
    test("getBodyParts returns 2 selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 1, end: 3, uuid: UUID_1 },
            { start: 5, end: 5, uuid: UUID_2 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartKind.Text },
            { value: " am", kind: BodyPartKind.Selected, uuid: UUID_1 },
            { value: " ", kind: BodyPartKind.Text },
            { value: "h", kind: BodyPartKind.Selected, uuid: UUID_2 },
            { value: "appy", kind: BodyPartKind.Text },
        ])
    })
})
