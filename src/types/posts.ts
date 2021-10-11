import type { GrammaticalCase, GrammaticalGender } from "./generated/graphql"

export type PostGameAnswerPayload = {
    rangeUuid: string
    caseOption?: GrammaticalCase | undefined
    genderOption?: GrammaticalGender | undefined
    clozeAnswer?: string | undefined
}
