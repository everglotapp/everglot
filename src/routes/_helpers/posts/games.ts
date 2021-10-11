import type {
    GrammaticalCase,
    GrammaticalGender,
} from "../../../types/generated/graphql"

export async function createPostGameAnswer({
    gameUuid,
    answers,
}: {
    gameUuid: string
    answers: {
        rangeUuid: string
        caseOption?: GrammaticalCase
        genderOption?: GrammaticalGender
        clozeAnswer?: string
    }[]
}) {
    return await fetch(`/post-games/${gameUuid}/answers/create`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            answers,
        }),
    })
}
