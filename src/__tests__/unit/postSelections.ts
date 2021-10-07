import { BodyPartKind, PostGameSelectionRange } from "../../constants"
import { getBodyParts } from "../../routes/_helpers/posts/selections"

describe("postSelections", () => {
    test("getBodyParts returns single text body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = []
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection start body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [{ start: 0, end: 3 }]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am", kind: BodyPartKind.Selected },
            { value: " happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [{ start: 5, end: 9 }]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I am ", kind: BodyPartKind.Text },
            { value: "happy", kind: BodyPartKind.Selected },
        ])
    })
    test("getBodyParts returns selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [{ start: 2, end: 3 }]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I ", kind: BodyPartKind.Text },
            { value: "am", kind: BodyPartKind.Selected },
            { value: " happy", kind: BodyPartKind.Text },
        ])
    })
    test("getBodyParts returns selection start and end body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 0, end: 0 },
            { start: 5, end: 9 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartKind.Selected },
            { value: " am ", kind: BodyPartKind.Text },
            { value: "happy", kind: BodyPartKind.Selected },
        ])
    })
    test("getBodyParts returns 2 selection middle body parts", () => {
        const text = "I am happy"
        const pickedRanges: PostGameSelectionRange[] = [
            { start: 1, end: 3 },
            { start: 5, end: 5 },
        ]
        expect(getBodyParts(text, pickedRanges)).toEqual([
            { value: "I", kind: BodyPartKind.Text },
            { value: " am", kind: BodyPartKind.Selected },
            { value: " ", kind: BodyPartKind.Text },
            { value: "h", kind: BodyPartKind.Selected },
            { value: "appy", kind: BodyPartKind.Text },
        ])
    })
})
