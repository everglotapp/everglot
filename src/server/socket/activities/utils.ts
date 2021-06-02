import { getGroupLanguageByUuid } from "../../groups"

import {
    HangmanLocale,
    HANGMAN_LOCALES,
    RandomQuestionLocale,
    RANDOM_QUESTION_LOCALES,
    WouldYouRatherLocale,
    WOULD_YOU_RATHER_LOCALES,
} from "../../../constants"

import hangman, { HangmanGame, games as hangmanGames } from "./hangman"
import wouldYouRather, {
    WouldYouRatherGame,
    games as wouldYouRatherGames,
} from "./wouldYouRather"
import randomQuestion, {
    RandomQuestionGame,
    games as randomQuestionGames,
} from "./randomQuestion"

import { GroupActivityKind } from "../../../types/activities"
import type { GroupActivity } from "../../../types/activities"
import type { Group } from "../../../types/generated/graphql"

import log from "../../../logger"

const chlog = log.child({
    namespace: "activities-utils",
})

const groupActivities: Record<Group["uuid"], GroupActivity | null> = {} as const

export async function startGroupActivity(
    groupUuid: Group["uuid"],
    kind: GroupActivityKind
): Promise<GroupActivity | null> {
    if (groupActivities[groupUuid]) {
        chlog
            .child({
                groupUuid,
            })
            .debug("An activity is already running for this group")
        return null
    }
    if (kind === GroupActivityKind.Hangman) {
        groupActivities[groupUuid] = await makeHangmanActivity(groupUuid)
    } else if (kind === GroupActivityKind.WouldYouRather) {
        groupActivities[groupUuid] = await makeWouldYouRatherActivity(groupUuid)
    } else if (kind === GroupActivityKind.RandomQuestion) {
        groupActivities[groupUuid] = await makeRandomQuestionActivity(groupUuid)
    } else {
        groupActivities[groupUuid] = {
            kind,
        }
    }
    return groupActivities[groupUuid]
}

export function endGroupActivity(
    groupUuid: Group["uuid"]
): GroupActivity | null {
    const activity = groupActivities[groupUuid]
    if (!activity) {
        chlog
            .child({
                groupUuid,
            })
            .debug("No activity is running for this group")
        return null
    }
    groupActivities[groupUuid] = null
    return activity
}

export function getGroupActivity(
    groupUuid: Group["uuid"]
): GroupActivity | null {
    const activity = groupActivities[groupUuid]
    if (!activity) {
        return null
    }
    if (activity.kind === GroupActivityKind.Hangman) {
        return {
            kind: activity.kind,
            state: hangman.getPublicState(groupUuid),
        }
    } else if (activity.kind === GroupActivityKind.WouldYouRather) {
        return {
            kind: activity.kind,
            state: wouldYouRather.getPublicState(groupUuid),
        }
    } else if (activity.kind === GroupActivityKind.RandomQuestion) {
        return {
            kind: activity.kind,
            state: randomQuestion.getPublicState(groupUuid),
        }
    }
    return activity
}

async function makeHangmanActivity(
    groupUuid: Group["uuid"]
): Promise<GroupActivity | null> {
    const group = await getGroupLanguageByUuid(groupUuid)
    if (!group || !group.groupByUuid?.language?.alpha2) {
        chlog
            .child({
                groupUuid,
            })
            .debug("Group not found")
        return null
    }
    const alpha2 = group.groupByUuid?.language?.alpha2
    if (!HANGMAN_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support hangman")
        return null
    }
    const game = (hangmanGames[groupUuid] ||= new HangmanGame(
        alpha2 as HangmanLocale
    ))
    if (!(await game.start())) {
        delete hangmanGames[groupUuid]
        return null
    }
    return {
        kind: GroupActivityKind.Hangman,
        state: game.publicState,
    }
}

async function makeWouldYouRatherActivity(
    groupUuid: Group["uuid"]
): Promise<GroupActivity | null> {
    const group = await getGroupLanguageByUuid(groupUuid)
    if (!group || !group.groupByUuid?.language?.alpha2) {
        chlog
            .child({
                groupUuid,
            })
            .debug("Group not found")
        return null
    }
    const alpha2 = group.groupByUuid?.language?.alpha2
    if (!WOULD_YOU_RATHER_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support Would You Rather")
        return null
    }
    const game = (wouldYouRatherGames[groupUuid] ||= new WouldYouRatherGame(
        alpha2 as WouldYouRatherLocale
    ))
    if (!(await game.start())) {
        delete wouldYouRatherGames[groupUuid]
        return null
    }
    return {
        kind: GroupActivityKind.WouldYouRather,
        state: game.publicState,
    }
}

async function makeRandomQuestionActivity(
    groupUuid: Group["uuid"]
): Promise<GroupActivity | null> {
    const group = await getGroupLanguageByUuid(groupUuid)
    if (!group || !group.groupByUuid?.language?.alpha2) {
        chlog
            .child({
                groupUuid,
            })
            .debug("Group not found")
        return null
    }
    const alpha2 = group.groupByUuid?.language?.alpha2
    if (!RANDOM_QUESTION_LOCALES.some((locale) => locale === alpha2)) {
        chlog
            .child({
                groupUuid,
                alpha2,
            })
            .debug("Group locale does not support Random Question activity")
        return null
    }
    const game = (randomQuestionGames[groupUuid] ||= new RandomQuestionGame(
        alpha2 as RandomQuestionLocale
    ))
    if (!(await game.start())) {
        delete randomQuestionGames[groupUuid]
        return null
    }
    return {
        kind: GroupActivityKind.RandomQuestion,
        state: game.publicState,
    }
}
