export enum GroupActivityKind {
    Hangman,
    WouldYouRather,
    RandomQuestion,
}

export interface GroupActivity {
    kind: GroupActivityKind
    state?: GroupActivityState
}

interface GroupActivityState {}

export interface HangmanState extends GroupActivityState {
    over: boolean
    currentWord: (string | null)[]
    pickedLetters: string[]
    pickedWords: string[]
    solution: string | null
}

export interface WouldYouRatherState extends GroupActivityState {
    endTime: string | null
    question: string | null
    answers: string[] | null
}
