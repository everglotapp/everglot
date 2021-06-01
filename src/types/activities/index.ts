export enum GroupActivityKind {
    Hangman,
    WouldYouRather,
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
    solution: string | null
}

export interface WouldYouRatherState extends GroupActivityState {
    endTime: string | null
    question: string | null
    answers: string[] | null
}
