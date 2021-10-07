import type { GuessCaseLocale, GuessGenderLocale } from "./locales"

export enum PostGameKind {
    GuessCase = "GUESS_CASE",
    GuessGender = "GUESS_GENDER",
    Cloze = "CLOZE",
}

export const GUESS_CASE_OPTIONS: Record<
    GuessCaseLocale,
    { [k: string]: string }
> = {
    de: {
        NOMINATIVE: "nominative",
        GENITIVE: "genitive",
        DATIVE: "dative",
        ACCUSATIVE: "accusative",
    },
}
type GuessCaseOption = typeof GUESS_CASE_OPTIONS[GuessCaseLocale]
export const GUESS_GENDER_OPTIONS: Record<
    GuessGenderLocale,
    { [k: string]: string }
> = {
    en: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
    },
    de: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
        NEUTER: "neuter",
    },
}
type GuessGenderOption = typeof GUESS_GENDER_OPTIONS[GuessGenderLocale]
export interface PostGameSelectionRange {
    start: number
    end: number
}
// @ts-expect-error
type _GuessGenderSelectionRange = PostGameSelectionRange & {
    option: keyof GuessGenderOption
}
// @ts-expect-error
type _GuessCaseSelectionRange = PostGameSelectionRange & {
    option: keyof GuessCaseOption
}

export const enum BodyPartKind {
    Text,
    LineBreak,
    Selected,
}
export type BodyPart = {
    kind: BodyPartKind
    value?: string
}
