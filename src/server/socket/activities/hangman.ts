import { ALPHABET } from "../../../constants"
import type { HangmanLocale } from "../../../constants"
import type { HangmanState } from "../../../types/activities"

import { db } from "../../db"

import log from "../../../logger"

const chlog = log.child({
    namespace: "hangman",
})

const MAX_WORD_LENGTH = 11
async function getRandomWord(language: HangmanLocale): Promise<string | null> {
    const res = await db?.query<{ word: string }>(
        `
    select word from(
        select * from app_public.words_${language}
        where length <= $1
        order by random()
    ) wd limit 1
    `,
        [MAX_WORD_LENGTH]
    )
    if (!res || res.rowCount !== 1) {
        return null
    }
    return res.rows[0].word
}

const MAX_WRONG_LETTERS = 5

export class HangmanGame {
    language: HangmanLocale
    pickedLetters: string[] = []
    availableLetters: string[] = []
    word: string | undefined
    wrongLetters = 0
    wrongWords = 0
    started = false

    constructor(language: HangmanLocale) {
        this.language = language
        this.availableLetters = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    async start(): Promise<boolean> {
        const word = await getRandomWord(this.language)
        if (!word) {
            return false
        }
        this.word = word
        this.started = true
        return true
    }

    letterPicked(l: string): boolean {
        return this.pickedLetters.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.availableLetters.includes(l.toLowerCase())
    }

    pickLetter(l: string): boolean {
        if (!this.started) {
            return false
        }
        this.pickedLetters.push(l.toLowerCase())
        this.availableLetters = this.availableLetters.filter(
            (av: string) => l.toLowerCase() !== av
        )
        const included = this.word!.includes(l.toLowerCase())
        if (included) {
            return true
        }
        this.wrongLetters += 1
        return false
    }

    get over(): boolean {
        if (!this.started) {
            return false
        }

        if (this.wrongLetters > MAX_WRONG_LETTERS) {
            return true
        }

        for (let i = 0; i < this.word!.length; ++i) {
            if (!this.pickedLetters.includes(this.word![i].toLowerCase())) {
                return false
            }
        }
        chlog.trace("Hangman round completed successfully")
        return true
    }

    async nextRound(): Promise<boolean> {
        if (!this.over) {
            return false
        }
        chlog.trace("Starting new hangman round")
        const word = await getRandomWord(this.language)
        if (!word) {
            return false
        }
        this.reset(word)
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
            solution: this.over ? this.word || null : null,
        }
    }

    get currentWord(): (string | null)[] {
        let result = []
        if (!this.started) {
            return []
        }
        for (let i = 0; i < this.word!.length; ++i) {
            result.push(
                this.pickedLetters.includes(this.word![i].toLowerCase())
                    ? this.word![i]
                    : null
            )
        }
        return result
    }
}
