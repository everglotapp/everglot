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
    Partial<Record<GrammaticalCase, string>>
> = {
    de: {
        NOMINATIVE: "de-nominative",
        GENITIVE: "de-genitive",
        DATIVE: "de-dative",
        ACCUSATIVE: "de-accusative",
    },
    en: {
        NOMINATIVE: "en-nominative",
        GENITIVE: "en-genitive",
        DATIVE: "en-dative",
        ACCUSATIVE: "en-accusative",
    },
    it: {
        NOMINATIVE: "it-nominative",
        // GENITIVE: "it-genitive",
        DATIVE: "it-dative",
        ACCUSATIVE: "it-accusative",
    },
    // zh: {
    //     SUBJECT: "subject",
    //     INDIRECT_OBJECT: "indirect_object",
    //     DIRECT_OBJECT: "direct_object",
    // },
} as const
export type GuessCaseOption = typeof GUESS_CASE_OPTIONS[GuessCaseLocale]
export const GUESS_GENDER_OPTIONS: Record<
    GuessGenderLocale,
    Partial<Record<GrammaticalGender, string>>
> = {
    fr: {
        MASCULINE: "fr-masculine",
        FEMININE: "fr-feminine",
    },
    it: {
        MASCULINE: "it-masculine",
        FEMININE: "it-feminine",
    },
    es: {
        MASCULINE: "es-masculine",
        FEMININE: "es-feminine",
    },
    pt: {
        MASCULINE: "pt-masculine",
        FEMININE: "pt-feminine",
    },
    de: {
        MASCULINE: "de-masculine",
        FEMININE: "de-feminine",
        NEUTRAL: "de-neutral",
    },
    ru: {
        MASCULINE: "ru-masculine",
        FEMININE: "ru-feminine",
        NEUTRAL: "ru-neutral",
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
