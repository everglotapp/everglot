import { v4 as uuidv4 } from "uuid"

import { BodyPartType } from "../../../constants/posts"
import type { BodyPart, PostRange } from "../../../constants/posts"

export function getBodyParts(body: string, ranges: PostRange[]): BodyPart[] {
    ranges = [...ranges].sort((rangeA, rangeB) => rangeA.start - rangeB.start)
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
            const overlappingRanges = ranges.filter(
                (range) => range.start >= start && range.end <= end
            )
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
    // console.log({ body, ranges, measuredParts })
    return measuredParts
}

export function getBodyPartsWithOverlaps(
    body: string,
    ranges: PostRange[]
): BodyPart[] {
    ranges = [...ranges].sort((rangeA, rangeB) => rangeA.start - rangeB.start)
    const allOverlappingRanges = getAllOverlappingRanges(ranges)
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
    let rangeIdx = 0
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
            const overlappingRanges = ranges.filter(
                (range) => range.start >= start && range.end <= end
            )
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
                        let range2Idx = rangeIdx + 1
                        while (
                            allOverlappingRanges[rangeIdx].includes(range2Idx)
                        ) {
                            range2Idx += 1
                        }
                        const curRanges: PostRange[] = [
                            overlappingRange,
                            ...overlappingRanges.splice(
                                0,
                                range2Idx - rangeIdx - 1
                            ),
                        ]
                        if (curRanges.length > 1) {
                            let furthestEnd: number = 0
                            for (const range of curRanges) {
                                if (
                                    furthestEnd === null ||
                                    range.end > furthestEnd
                                ) {
                                    furthestEnd = range.end
                                }
                            }
                            currentParts.push({
                                uuid: uuidv4(),
                                type: BodyPartType.Ranges,
                                value: value.substring(j, furthestEnd + 1),
                                // ranges: curRanges,
                            })
                            j = furthestEnd + 1
                            rangeIdx += curRanges.length
                            overlappingRange = overlappingRanges.shift()
                        } else {
                            currentParts.push({
                                uuid: overlappingRange.uuid,
                                type: BodyPartType.Range,
                                value: value.substring(
                                    j,
                                    overlappingRange.end + 1
                                ),
                            })
                            j = overlappingRange.end + 1
                            rangeIdx += 1
                            overlappingRange = overlappingRanges.shift()
                        }
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
    // console.log({ body, ranges, measuredParts })
    return measuredParts
}

function getAllOverlappingRanges(ranges: PostRange[]) {
    const indexByUuid: Record<string, number> = {}
    for (let i = 0; i < ranges.length; ++i) {
        indexByUuid[ranges[i].uuid] = i
    }
    const overlappingIndices: number[][] = []
    for (let i = 0; i < ranges.length; ++i) {
        const overlappingRanges = getAllOverlappingRangesForRange(
            ranges,
            ranges[i]
        )
        overlappingIndices.push(
            overlappingRanges.map(({ uuid }) => indexByUuid[uuid])
        )
    }
    return overlappingIndices
}

function getAllOverlappingRangesForRange(
    ranges: PostRange[],
    range: PostRange
) {
    return ranges.filter(
        (otherRange) =>
            otherRange.uuid !== range.uuid &&
            rangesOverlapAnywhere(range, otherRange)
    )
}

export function rangesOverlapAnywhere(
    { start: x, end: y }: Pick<PostRange, "start" | "end">,
    { start: a, end: b }: Pick<PostRange, "start" | "end">
): boolean {
    return (x >= a && x <= b) || (y >= a && y >= b) || (x < a && y > b)
}
