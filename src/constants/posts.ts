import {
    GrammaticalCase,
    GrammaticalGender,
    PostGameType,
} from "../types/generated/graphql"
import type { GuessCaseLocale, GuessGenderLocale } from "./locales"

export const AVAILABLE_POST_GAME_TYPES = [
    PostGameType.GuessCase,
    PostGameType.GuessGender,
    PostGameType.Cloze,
] as const

export const GUESS_CASE_OPTIONS: Record<
    GuessCaseLocale,
    Record<GrammaticalCase, string>
> = {
    de: {
        NOMINATIVE: "nominative",
        GENITIVE: "genitive",
        DATIVE: "dative",
        ACCUSATIVE: "accusative",
    },
    it: {
        SUBJECT: "subject",
        INDIRECT_OBJECT: "indirect_object",
        DIRECT_OBJECT: "direct_object",
    },
    zh: {
        SUBJECT: "subject",
        INDIRECT_OBJECT: "indirect_object",
        DIRECT_OBJECT: "direct_object",
    },
} as const
export type GuessCaseOption = typeof GUESS_CASE_OPTIONS[GuessCaseLocale]
export const GUESS_GENDER_OPTIONS: Record<
    GuessGenderLocale,
    Record<GrammaticalGender, string>
> = {
    fr: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
    },
    it: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
    },
    es: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
    },
    de: {
        MASCULINE: "masculine",
        FEMININE: "feminine",
        NEUTRAL: "neuter",
    },
} as const
export type GuessGenderOption = typeof GUESS_GENDER_OPTIONS[GuessGenderLocale]
export interface PostGameRange {
    uuid: string
    start: number
    end: number
}

export interface GuessGenderRange extends PostGameRange {
    option: keyof GuessGenderOption
}

export interface GuessCaseRange extends PostGameRange {
    option: keyof GuessCaseOption
}

export const enum BodyPartType {
    Text = "TEXT",
    LineBreak = "LINEBREAK",
    Range = "RANGE",
}
export type BodyPart = {
    uuid?: string
    type: BodyPartType
    value?: string
}
