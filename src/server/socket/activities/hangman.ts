import { ALPHABET } from "../../../constants"
import type { HangmanLocale } from "../../../constants"
import type { HangmanState } from "../../../types/activities"

import log from "../../../logger"

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
    language: HangmanLocale
    pickedLetters: string[] = []
    availableLetters: string[] = []
    word: string

    constructor(language: HangmanLocale) {
        this.language = language
        this.availableLetters = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
        const dict = DICTIONARY[this.language]
        this.word = dict[Math.floor(Math.random() * dict.length)]
    }

    letterPicked(l: string): boolean {
        return this.pickedLetters.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.availableLetters.includes(l.toLowerCase())
    }

    pickLetter(l: string): void {
        this.pickedLetters.push(l.toLowerCase())
        this.availableLetters = this.availableLetters.filter(
            (av: string) => l.toLowerCase() !== av
        )
    }

    get over(): boolean {
        for (let i = 0; i < this.word.length; ++i) {
            if (!this.pickedLetters.includes(this.word[i].toLowerCase())) {
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
        this.pickedLetters = []
        this.availableLetters = ALPHABET[this.language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    get publicState(): HangmanState {
        return {
            over: this.over,
            currentWord: this.currentWord,
            pickedLetters: this.pickedLetters,
        }
    }

    get currentWord(): (string | null)[] {
        let result = []
        for (let i = 0; i < this.word.length; ++i) {
            result.push(
                this.pickedLetters.includes(this.word[i].toLowerCase())
                    ? this.word[i]
                    : null
            )
        }
        return result
    }

    get publicWord(): string {
        let result = ""
        for (let i = 0; i < this.word.length; ++i) {
            result += this.pickedLetters.includes(this.word[i].toLowerCase())
                ? this.word[i]
                : "_ "
        }
        return result
    }
}
