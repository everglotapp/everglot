import hangman from "./hangman"
import guessCharacter from "./guessCharacter"
import wouldYouRather from "./wouldYouRather"
import randomQuestion from "./randomQuestion"

import { GroupActivityKind } from "../../../types/activities"
import type { GroupActivity } from "../../../types/activities"

import log from "../../../logger"

const chlog = log.child({
    namespace: "activities-utils",
})

const groupActivities: Record<string, GroupActivity | null> = {} as const

export async function startGroupActivity(
    groupUuid: string,
    kind: GroupActivityKind
): Promise<GroupActivity | null> {
    if (groupActivities[groupUuid]) {
        chlog
            .child({
                groupUuid,
            })
            .error("An activity is already running for this group")
        return null
    }
    if (kind === GroupActivityKind.Hangman) {
        groupActivities[groupUuid] = await hangman.start(groupUuid)
    } else if (kind === GroupActivityKind.WouldYouRather) {
        groupActivities[groupUuid] = await wouldYouRather.start(groupUuid)
    } else if (kind === GroupActivityKind.RandomQuestion) {
        groupActivities[groupUuid] = await randomQuestion.start(groupUuid)
    } else if (kind === GroupActivityKind.GuessCharacter) {
        groupActivities[groupUuid] = await guessCharacter.start(groupUuid)
    } else {
        chlog
            .child({ groupUuid, kind })
            .error("Tried to start group activity of unknown kind")
        return null
    }
    return groupActivities[groupUuid]
}

export function endGroupActivity(groupUuid: string): GroupActivity | null {
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

export function getGroupActivity(groupUuid: string): GroupActivity | null {
    const activity = groupActivities[groupUuid]
    if (!activity) {
        return null
    }
    if (activity.kind === GroupActivityKind.Hangman) {
        return {
            kind: activity.kind,
            state: hangman.getPublicState(groupUuid),
            groupUuid,
        }
    } else if (activity.kind === GroupActivityKind.GuessCharacter) {
        return {
            kind: activity.kind,
            state: guessCharacter.getPublicState(groupUuid),
            groupUuid,
        }
    } else if (activity.kind === GroupActivityKind.WouldYouRather) {
        return {
            kind: activity.kind,
            state: wouldYouRather.getPublicState(groupUuid),
            groupUuid,
        }
    } else if (activity.kind === GroupActivityKind.RandomQuestion) {
        return {
            kind: activity.kind,
            state: randomQuestion.getPublicState(groupUuid),
            groupUuid,
        }
    }
    return activity
}
