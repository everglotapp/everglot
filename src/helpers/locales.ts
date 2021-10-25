import {
    GAMIFY_POST_LOCALES,
    GUESS_CASE_LOCALES,
    GUESS_CHARACTER_LOCALES,
    GUESS_GENDER_LOCALES,
    HANGMAN_LOCALES,
    SUPPORTED_LOCALES,
} from "../constants"

export const localeIsSupported = (alpha2: string) =>
    (SUPPORTED_LOCALES as readonly string[]).includes(alpha2)

export const localeSupportsPostGamification = (alpha2: string) =>
    (GAMIFY_POST_LOCALES as readonly string[]).includes(alpha2)

export const localeSupportsGuessGenderGames = (alpha2: string) =>
    (GUESS_GENDER_LOCALES as readonly string[]).includes(alpha2)

export const localeSupportsGuessCaseGames = (alpha2: string) =>
    (GUESS_CASE_LOCALES as readonly string[]).includes(alpha2)

export const localeSupportsGuessCharacterGames = (alpha2: string) =>
    (GUESS_CHARACTER_LOCALES as readonly string[]).includes(alpha2)

export const localeSupportsHangmanGames = (alpha2: string) =>
    (HANGMAN_LOCALES as readonly string[]).includes(alpha2)
