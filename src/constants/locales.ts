export const SUPPORTED_LOCALES = [
    "en",
    "de",
    "zh",
    "it",
    "es",
    "fr",
    "ja",
    "ko",
    "ru",
    "pt",
] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const HANGMAN_LOCALES = [
    "en",
    "de",
    "pt",
    "fr",
    "es",
    "it",
    "ru",
] as const
export type HangmanLocale = typeof HANGMAN_LOCALES[number]

export const GUESS_CHARACTER_LOCALES = ["zh"] as const
export type GuessCharacterLocale = typeof GUESS_CHARACTER_LOCALES[number]

export const WOULD_YOU_RATHER_LOCALES = [
    "en",
    "de",
    "zh",
    "it",
    "es",
    "fr",
    "ja",
    "ko",
    "ru",
    "pt",
] as const
export type WouldYouRatherLocale = typeof WOULD_YOU_RATHER_LOCALES[number]

export const RANDOM_QUESTION_LOCALES = [
    "en",
    "de",
    "zh",
    "it",
    "es",
    "fr",
    "ja",
    "ko",
    "ru",
    "pt",
] as const
export type RandomQuestionLocale = typeof RANDOM_QUESTION_LOCALES[number]

export const PROMPT_LOCALES = [
    "en",
    "de",
    "zh",
    "it",
    "es",
    "fr",
    "ja",
    "ko",
    "ru",
    "pt",
] as const
export type PromptLocale = typeof PROMPT_LOCALES[number]

export const GAMIFY_POST_LOCALES = SUPPORTED_LOCALES
export type GamifyPostLocale = typeof GAMIFY_POST_LOCALES[number]

export const GUESS_CASE_LOCALES = ["en", "de", "it"] as const
export type GuessCaseLocale = typeof GUESS_CASE_LOCALES[number]

export const GUESS_GENDER_LOCALES = [
    "fr",
    "es",
    "it",
    "pt",
    "de",
    "ru",
] as const
export type GuessGenderLocale = typeof GUESS_GENDER_LOCALES[number]

export const ALPHABET: Record<HangmanLocale, readonly string[]> = {
    en: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ] as const,
    de: [
        "a",
        "ä",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "ö",
        "p",
        "q",
        "r",
        "s",
        "ß",
        "t",
        "u",
        "ü",
        "v",
        "w",
        "x",
        "y",
        "z",
        "A",
        "Ä",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "Ö",
        "P",
        "Q",
        "R",
        "S",
        "ẞ",
        "T",
        "U",
        "Ü",
        "V",
        "W",
        "X",
        "Y",
        "Z",
    ] as const,
    pt: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "à",
        "á",
        "â",
        "ã",
        "ä",
        "ç",
        "é",
        "ê",
        "ì",
        "í",
        "ò",
        "ó",
        "ô",
        "õ",
        "ù",
        "ú",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "À",
        "Á",
        "Â",
        "Ã",
        "Ä",
        "Ç",
        "É",
        "Ê",
        "Ì",
        "Í",
        "Ò",
        "Ó",
        "Ô",
        "Õ",
        "Ù",
        "Ú",
    ] as const,
    fr: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "à",
        "â",
        "ç",
        "è",
        "é",
        "ê",
        "ë",
        "î",
        "ï",
        "ô",
        "ù",
        "û",
        "ü",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "À",
        "Â",
        "Ç",
        "È",
        "É",
        "Ê",
        "Ë",
        "Î",
        "Ï",
        "Ô",
        "Ù",
        "Û",
        "Ü",
    ] as const,
    es: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "á",
        "é",
        "í",
        "ñ",
        "ó",
        "ú",
        "ü",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "Á",
        "É",
        "Í",
        "Ñ",
        "Ó",
        "Ú",
        "Ü",
    ] as const,
    it: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        "à",
        "è",
        "é",
        "ì",
        "ò",
        "ù",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "À",
        "È",
        "É",
        "Ì",
        "Ò",
        "Ù",
    ] as const,
    ru: [
        "а",
        "б",
        "в",
        "г",
        "д",
        "е",
        "ж",
        "з",
        "и",
        "й",
        "к",
        "л",
        "м",
        "н",
        "о",
        "п",
        "р",
        "с",
        "т",
        "у",
        "ф",
        "х",
        "ц",
        "ч",
        "ш",
        "щ",
        "ъ",
        "ы",
        "ь",
        "э",
        "ю",
        "я",
        "ё",
        "А",
        "Б",
        "В",
        "Г",
        "Д",
        "Е",
        "Ж",
        "З",
        "И",
        "Й",
        "К",
        "Л",
        "М",
        "Н",
        "О",
        "П",
        "Р",
        "С",
        "Т",
        "У",
        "Ф",
        "Х",
        "Ц",
        "Ч",
        "Ш",
        "Щ",
        "Ъ",
        "Ы",
        "Ь",
        "Э",
        "Ю",
        "Я",
        "Ё",
    ] as const,
} as const
