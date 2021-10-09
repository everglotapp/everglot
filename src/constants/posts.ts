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
} as const
export type GuessCaseOption = typeof GUESS_CASE_OPTIONS[GuessCaseLocale]
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
} as const
export type GuessGenderOption = typeof GUESS_GENDER_OPTIONS[GuessGenderLocale]
export interface PostGameSelectionRange {
    uuid: string
    start: number
    end: number
}

export interface GuessGenderSelectionRange extends PostGameSelectionRange {
    option: keyof GuessGenderOption
}

export interface GuessCaseSelectionRange extends PostGameSelectionRange {
    option: keyof GuessCaseOption
}

export const enum BodyPartKind {
    Text = "TEXT",
    LineBreak = "LINEBREAK",
    Selected = "SELECTED",
}
export type BodyPart = {
    uuid?: string
    kind: BodyPartKind
    value?: string
}
