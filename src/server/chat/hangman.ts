import { ALPHABET } from "../../constants"
import type { HangmanLocale } from "../../constants"

import log from "../../logger"

const chlog = log.child({
    namespace: "hangman",
})

const DICTIONARY: Record<HangmanLocale, string[]> = {
    en: [
        "me",
        "new",
        "old",
        "forever",
        "think",
        "believe",
        "stubborn",
        "indicate",
        "imply",
        "lose",
        "win",
        "I",
        "you",
        "he",
        "she",
        "we",
        "us",
        "they",
        "thus",
        "hangman",
        "city",
        "country",
        "land",
        "river",
        "sea",
        "surprise",
        "zip",
        "natives",
        "speedup",
        "abort",
        "unsurprisingly",
        "absolutely",
        "effect",
        "bone",
        "place",
        "body",
        "eye",
    ],
    de: [
        "ich",
        "du",
        "er",
        "sie",
        "es",
        "verlieren",
        "gewinnen",
        "Spiel",
        "Galgenmännchen",
        "daher",
        "sobald",
        "immer",
        "oft",
        "stur",
        "Auge",
        "Hintergrund",
        "Körper",
        "selten",
        "Überraschung",
        "Brot",
        "jedenfalls",
        "unbedingt",
        "sogar",
        "durchaus",
        "soeben",
        "laufen",
        "Bürgermeister",
        "Stadt",
        "Land",
        "Fluss",
        "See",
        "Meer",
    ],
}

export class HangmanGame {
    running: boolean = false
    language: HangmanLocale
    picked: string[] = []
    available: string[] = []
    word: string

    constructor(language: HangmanLocale) {
        this.language = language
        this.available = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
        const dict = DICTIONARY[this.language]
        this.word = dict[Math.floor(Math.random() * dict.length)]
    }

    start(): void {
        chlog.debug("Starting hangman game")
        this.running = true
    }

    letterPicked(l: string): boolean {
        return this.picked.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.available.includes(l.toLowerCase())
    }

    pickLetter(l: string): void {
        this.picked.push(l.toLowerCase())
        this.available = this.available.filter(
            (av: string) => l.toLowerCase() !== av
        )
    }

    get over(): boolean {
        for (let i = 0; i < this.word.length; ++i) {
            if (!this.picked.includes(this.word[i].toLowerCase())) {
                return false
            }
        }
        chlog.trace("Hangman round completed successfully")
        return true
    }

    nextRound(): boolean {
        if (!this.over) {
            return false
        }
        chlog.trace("Starting new hangman round")
        const dict = DICTIONARY[this.language]
        this.reset(dict[Math.floor(Math.random() * dict.length)])
        return true
    }

    reset(newWord: string): void {
        this.word = newWord
        this.picked = []
        this.available = ALPHABET[this.language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    get publicState() {
        return {
            running: this.running,
            over: this.over,
            currentWord: this.currentWord,
            picked: this.picked,
        }
    }

    get currentWord(): (string | null)[] {
        let result = []
        for (let i = 0; i < this.word.length; ++i) {
            result.push(
                this.picked.includes(this.word[i].toLowerCase())
                    ? this.word[i]
                    : null
            )
        }
        return result
    }

    get publicWord(): string {
        let result = ""
        for (let i = 0; i < this.word.length; ++i) {
            result += this.picked.includes(this.word[i].toLowerCase())
                ? this.word[i]
                : "_ "
        }
        return result
    }
}

export let hangmanGames: Record<HangmanLocale, HangmanGame> = {
    en: new HangmanGame("en"),
    de: new HangmanGame("de"),
}
