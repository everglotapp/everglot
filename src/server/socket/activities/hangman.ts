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
        "time",
        "path",
        "think",
        "believe",
        "undermine",
        "stubborn",
        "indicate",
        "imply",
        "lose",
        "win",
        "I",
        "way",
        "you",
        "he",
        "celebrate",
        "she",
        "join",
        "love",
        "why",
        "we",
        "us",
        "boss",
        "they",
        "thus",
        "hangman",
        "improve",
        "client",
        "call",
        "city",
        "welcome",
        "leave",
        "sit",
        "country",
        "house",
        "land",
        "river",
        "severe",
        "sea",
        "surprise",
        "zip",
        "fast",
        "natives",
        "speedup",
        "date",
        "run",
        "abort",
        "see",
        "employee",
        "scenario",
        "absolutely",
        "change",
        "effect",
        "bone",
        "leg",
        "grow",
        "stand",
        "place",
        "body",
        "eye",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
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
        "Haus",
        "Mal",
        "sobald",
        "immer",
        "Bein",
        "oft",
        "stur",
        "Auge",
        "Hintergrund",
        "Körper",
        "überhaupt",
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
        "stets",
        "See",
        "Meer",
        "eins",
        "zwei",
        "drei",
        "vier",
        "fünf",
        "sechs",
        "sieben",
        "acht",
        "neun",
        "zehn",
    ],
}

const MAX_WRONG_LETTERS = 5

export class HangmanGame {
    language: HangmanLocale
    pickedLetters: string[] = []
    availableLetters: string[] = []
    word: string
    wrongLetters = 0
    wrongWords = 0

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

    pickLetter(l: string): boolean {
        this.pickedLetters.push(l.toLowerCase())
        this.availableLetters = this.availableLetters.filter(
            (av: string) => l.toLowerCase() !== av
        )
        const included = this.word.includes(l.toLowerCase())
        if (included) {
            return true
        }
        this.wrongLetters += 1
        return false
    }

    get over(): boolean {
        if (this.wrongLetters > MAX_WRONG_LETTERS) {
            return true
        }

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
        this.wrongLetters = 0
        this.wrongWords = 0
    }

    get publicState(): HangmanState {
        return {
            over: this.over,
            currentWord: this.currentWord,
            pickedLetters: this.pickedLetters,
            solution: this.over ? this.word : null,
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
