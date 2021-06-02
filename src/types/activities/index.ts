export enum GroupActivityKind {
    Hangman,
    WouldYouRather,
    RandomQuestion,
}

export interface GroupActivity {
    kind: GroupActivityKind
    state?: GroupActivityState
}

export interface HangmanGroupActivity extends GroupActivity {
    kind: GroupActivityKind.Hangman
    state: HangmanState
}

export interface WouldYouRatherGroupActivity extends GroupActivity {
    kind: GroupActivityKind.WouldYouRather
    state: WouldYouRatherState
}

export interface RandomQuestionGroupActivity extends GroupActivity {
    kind: GroupActivityKind.RandomQuestion
    state: RandomQuestionState
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

export interface RandomQuestionState extends GroupActivityState {
    question: string | null
}
