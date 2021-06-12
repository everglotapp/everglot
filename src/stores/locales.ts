import { derived } from "svelte/store"

import { groupUuid } from "./index"
import { allGroupsStore } from "./groups"

/**
 * Contains basic information on the currently selected group.
 */
const currentGroup = derived(
    [groupUuid, allGroupsStore],
    ([$groupUuid, $allGroupsStore]) => {
        if (!$groupUuid || !$allGroupsStore.data || $allGroupsStore.error) {
            return null
        }
        return (
            $allGroupsStore.data.groups?.nodes.find(
                (group) => group && group.uuid === $groupUuid
            ) || null
        )
    }
)

/**
 * The user locale to be enforced if non-null.
 */
export const currentGroupLocale = derived([currentGroup], ([$currentGroup]) => {
    if (!$currentGroup) {
        return null
    }
    return $currentGroup.language?.alpha2 || null
})

/**
 * The currently selected group's language in English.
 */
export const currentGroupLanguage = derived(
    [currentGroup],
    ([$currentGroup]) => {
        if (!$currentGroup) {
            return null
        }
        return $currentGroup.language?.englishName || null
    }
)
