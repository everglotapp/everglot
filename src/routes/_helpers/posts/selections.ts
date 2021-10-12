import { BodyPartType } from "../../../constants/posts"
import type { BodyPart, PostGameRange } from "../../../constants/posts"

export function getBodyParts(
    body: string,
    pickedRanges: PostGameRange[]
): BodyPart[] {
    let parts: BodyPart[] = body
        .split("\n")
        .map((text) => ({ type: BodyPartType.Text, value: text }))
    parts = parts.flatMap((part, i) => {
        if (i + 1 == parts.length) {
            return [part]
        }
        // add line break after all lines except for the last
        return [part, { type: BodyPartType.LineBreak }]
    })
    let i = 0
    const measuredParts: BodyPart[] = []
    for (const part of parts) {
        if (part.type === BodyPartType.LineBreak) {
            measuredParts.push(part)
            i += 1
        } else if (part.type === BodyPartType.Text) {
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
                            type: BodyPartType.Text,
                            value: value.substring(j, overlappingRange.start),
                        })
                        j = overlappingRange.start
                    } else {
                        currentParts.push({
                            uuid: overlappingRange.uuid,
                            type: BodyPartType.Range,
                            value: value.substring(j, overlappingRange.end + 1),
                        })
                        j = overlappingRange.end + 1
                        overlappingRange = overlappingRanges.shift()
                    }
                } else {
                    currentParts.push({
                        type: BodyPartType.Text,
                        value: value.substring(j, end + 1),
                    })
                    break
                }
            }
            measuredParts.push(...currentParts.flat())
            i += value.length
        }
    }
    // console.log({ body, pickedRanges, measuredParts })
    return measuredParts
}
