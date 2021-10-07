import { BodyPartKind } from "../../../constants/posts"
import type { BodyPart, PostGameSelectionRange } from "../../../constants/posts"

export function getBodyParts(
    body: string,
    pickedRanges: PostGameSelectionRange[]
): BodyPart[] {
    let parts: BodyPart[] = body
        .split("\n")
        .map((text) => ({ kind: BodyPartKind.Text, value: text }))
    parts = parts.flatMap((part, i) => {
        if (i + 1 == parts.length) {
            return [part]
        }
        // add line break after all lines except for the last
        return [part, { kind: BodyPartKind.LineBreak }]
    })
    let i = 0
    const measuredParts: BodyPart[] = []
    for (const part of parts) {
        if (part.kind === BodyPartKind.LineBreak) {
            measuredParts.push(part)
            i += 1
        } else if (part.kind === BodyPartKind.Text) {
            let currentParts: BodyPart[] = []
            const value = part.value!
            const start = i
            const end = i + value.length - 1
            const overlappingRanges = pickedRanges
                .filter((range) => range.start >= start && range.end <= end)
                .sort((rangeA, rangeB) => rangeA.start - rangeB.start)
            let j = start
            let overlappingRange = overlappingRanges.shift()

            while (j <= end) {
                if (overlappingRange) {
                    if (j < overlappingRange.start) {
                        currentParts.push({
                            kind: BodyPartKind.Text,
                            value: value.substring(j, overlappingRange.start),
                        })
                        j = overlappingRange.start
                    } else {
                        currentParts.push({
                            kind: BodyPartKind.Selected,
                            value: value.substring(j, overlappingRange.end + 1),
                        })
                        j = overlappingRange.end + 1
                        overlappingRange = overlappingRanges.shift()
                    }
                } else {
                    currentParts.push({
                        kind: BodyPartKind.Text,
                        value: value.substring(j, end + 1),
                    })
                    break
                }
            }
            measuredParts.push(...currentParts.flat())
            i += value.length
        }
    }
    return measuredParts
}
