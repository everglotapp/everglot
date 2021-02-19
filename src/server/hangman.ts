import { ALPHABET } from "../constants"

export type HangmanLanguage = "English" | "German"

export class HangmanGame {
    running: boolean = false
    language: HangmanLanguage
    picked: string[] = []
    available: string[] = []
    word: string = "Test"

    constructor(language: HangmanLanguage) {
        this.language = language
        this.available = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    start(): void {
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
        return true
    }

    nextRound(): boolean {
        if (!this.over) {
            return false
        }
        this.reset("newword")
        return true
    }

    reset(newWord: string): void {
        this.word = newWord
        this.picked = []
        this.available = ALPHABET[this.language].filter(
            (l: string) => l === l.toLowerCase()
        )
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

export let hangmanGames: Record<HangmanLanguage, HangmanGame> = {
    English: new HangmanGame("English"),
    German: new HangmanGame("German"),
}
