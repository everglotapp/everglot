import { ALPHABET } from "../../../constants"
import type { HangmanLocale } from "../../../constants"
import type { HangmanState } from "../../../types/activities"

import { db } from "../../db"

import log from "../../../logger"

const chlog = log.child({
    namespace: "hangman",
})

const MIN_WORD_LENGTH = 3
const MAX_WORD_LENGTH = 11
async function getRandomWord(language: HangmanLocale): Promise<string | null> {
    const res = await db?.query<{ word: string }>(
        `
    select word from(
        select * from app_public.words_${language}
        where length >= $1
        and length <= $2
        order by random()
    ) wd limit 1
    `,
        [MIN_WORD_LENGTH, MAX_WORD_LENGTH]
    )
    if (!res || res.rowCount !== 1) {
        return null
    }
    return res.rows[0].word
}

const MAX_WRONG_LETTERS = 5
const MAX_WRONG_WORDS = 0

export class HangmanGame {
    #language: HangmanLocale
    #pickedLetters: string[] = []
    #availableLetters: string[] = []
    #pickedWords: string[] = []
    #word: string | undefined
    #wrongLetters = 0
    #wrongWords = 0
    #started = false

    constructor(language: HangmanLocale) {
        this.#language = language
        this.#availableLetters = ALPHABET[language].filter(
            (l: string) => l === l.toLowerCase()
        )
    }

    async start(): Promise<boolean> {
        const word = await getRandomWord(this.#language)
        if (!word) {
            return false
        }
        this.#word = word
        this.#started = true
        return true
    }

    guessValid(guess: string): boolean {
        if (guess.length > 50 || guess.length < 1) {
            return false
        }
        if (guess.length === 1) {
            return !this.letterPicked(guess) && this.letterAvailable(guess)
        }
        return guess
            .split("")
            .every((character) => ALPHABET[this.#language].includes(character))
    }

    processGuess(guess: string): boolean {
        if (guess.length === 1) {
            return this.pickLetter(guess)
        }
        const lowerGuess = guess.toLowerCase()
        if (lowerGuess === this.#word!.toLowerCase()) {
            if (!this.#pickedWords.includes(lowerGuess)) {
                this.#pickedWords.push(lowerGuess)
            }
            return true
        }
        if (!this.#pickedWords.includes(lowerGuess)) {
            this.#pickedWords.push(lowerGuess)
        }
        this.#wrongWords += 1
        return false
    }

    letterPicked(l: string): boolean {
        return this.#pickedLetters.includes(l.toLowerCase())
    }

    letterAvailable(l: string): boolean {
        return this.#availableLetters.includes(l.toLowerCase())
    }

    pickLetter(l: string): boolean {
        if (!this.#started) {
            return false
        }
        this.#pickedLetters.push(l.toLowerCase())
        this.#availableLetters = this.#availableLetters.filter(
            (av: string) => l.toLowerCase() !== av
        )
        const included = this.#word!.includes(l.toLowerCase())
        if (included) {
            return true
        }
        this.#wrongLetters += 1
        return false
    }

    get over(): boolean {
        if (!this.#started) {
            return false
        }

        if (this.#wrongLetters > MAX_WRONG_LETTERS) {
            return true
        }

        if (this.#wrongWords > MAX_WRONG_WORDS) {
            return true
        }

        if (this.#pickedWords.includes(this.#word!.toLowerCase())) {
            chlog
                .child({ word: this.#word })
                .trace(
                    "Hangman round completed successfully, the word has been guessed"
                )
            return true
        }
        for (let i = 0; i < this.#word!.length; ++i) {
            if (!this.#pickedLetters.includes(this.#word![i].toLowerCase())) {
                return false
            }
        }
        chlog
            .child({ word: this.#word })
            .trace(
                "Hangman round completed successfully, all letters have been guessed"
            )
        return true
    }

    async nextRound(): Promise<boolean> {
        if (!this.over) {
            return false
        }
        chlog.trace("Starting new hangman round")
        const word = await getRandomWord(this.#language)
        if (!word) {
            return false
        }
        this.reset(word)
        return true
    }

    reset(newWord: string): void {
        this.#word = newWord
        this.#pickedLetters = []
        this.#pickedWords = []
        this.#availableLetters = ALPHABET[this.#language].filter(
            (l: string) => l === l.toLowerCase()
        )
        this.#wrongLetters = 0
        this.#wrongWords = 0
    }

    get publicState(): HangmanState {
        return {
            over: this.over,
            currentWord: this.currentWord,
            pickedLetters: this.#pickedLetters,
            pickedWords: this.#pickedWords,
            solution: this.over ? this.#word || null : null,
        }
    }

    get currentWord(): (string | null)[] {
        let result = []
        if (!this.#started) {
            return []
        }
        for (let i = 0; i < this.#word!.length; ++i) {
            const letter = this.#word![i]
            result.push(
                this.#pickedLetters.includes(letter.toLowerCase())
                    ? letter
                    : null
            )
        }
        return result
    }
}
