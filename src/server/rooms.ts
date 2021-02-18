export type Room = {
    languageCode2: Language["code2"]
}

export type Language = {
    code2: string //two letters ISO 639-1 language code
    code3: string // three letters ISO 639-2
    enName:
        | "English"
        | "German"
        | "French"
        | "Italian"
        | "Spanish"
        | "Chinese"
        | "Japanese"
}

export const LANGUAGES: Language[] = [
    {
        code2: "en",
        code3: "eng",
        enName: "English",
    },
    {
        code2: "de",
        code3: "deu",
        enName: "German",
    },
    {
        code2: "fr",
        code3: "fra",
        enName: "French",
    },
    {
        code2: "it",
        code3: "ita",
        enName: "Italian",
    },
    {
        code2: "es",
        code3: "esp",
        enName: "Spanish",
    },
    {
        code2: "zh",
        code3: "zho",
        enName: "Chinese",
    },
    {
        code2: "jp",
        code3: "jap",
        enName: "Japanese",
    },
]
