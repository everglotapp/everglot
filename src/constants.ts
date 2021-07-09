import { v4 as uuidv4 } from "uuid"

export const EVERGLOT_WEBSITE_BASE_URL = "https://everglot.com"

export const ANDROID_WEBVIEW_USER_AGENT = "ANDROID_WEBVIEW"
export const IOS_WEBVIEW_USER_AGENT = "IOS_WEBVIEW"

export const GOOGLE_WEB_SIGNIN_CLIENT_ID =
    "457984069949-bgc3aj14fi47olkp0arn7is4cr07cfla.apps.googleusercontent.com"
export const GOOGLE_IOS_SIGNIN_CLIENT_ID =
    "457984069949-79sdutia34vvkn2fcetcq1sblmhe38gk.apps.googleusercontent.com"
export const GOOGLE_SIGNIN_AUDIENCE = [
    GOOGLE_WEB_SIGNIN_CLIENT_ID,
    GOOGLE_IOS_SIGNIN_CLIENT_ID,
]
export const AGORA_APP_ID = "38aefcc1e5254b578fb65665fe227ed5"

export const SUPPORTED_LOCALES = ["en", "de", "zh"] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const HANGMAN_LOCALES = ["en", "de"] as const
export type HangmanLocale = typeof HANGMAN_LOCALES[number]

export const GUESS_CHARACTER_LOCALES = ["zh"] as const
export type GuessCharacterLocale = typeof GUESS_CHARACTER_LOCALES[number]

export const WOULD_YOU_RATHER_LOCALES = ["en", "de", "zh"] as const
export type WouldYouRatherLocale = typeof WOULD_YOU_RATHER_LOCALES[number]

export const RANDOM_QUESTION_LOCALES = ["en", "de", "zh"] as const
export type RandomQuestionLocale = typeof RANDOM_QUESTION_LOCALES[number]

export const MESSAGE_PREVIEW_BASE_PATH = "/images/preview" as const
export const USER_UPLOADED_IMAGES_BASE_PATH = "/images/uploads" as const
export const USER_AVATARS_BASE_PATH =
    `${USER_UPLOADED_IMAGES_BASE_PATH}/avatars` as const

export const WEBRTC_CONTEXT_KEY = "WEBRTC"

export const SIDEBAR_MENU_ICON_BUTTON_ID = uuidv4()

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
} as const

export const ENABLE_FLUENT_BIDIRECTIONAL_SUPPORT = false
