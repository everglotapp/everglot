import { validate as uuidValidate } from "uuid"
import { userIsInGroup } from "../groups"

import log from "../../logger"

const chlog = log.child({ namespace: "auth" })

export async function authenticateUserInGroup(
    userId: number,
    groupUuid: string
) {
    // Check that this is an actual group UUID
    if (!groupUuid || !uuidValidate(groupUuid)) {
        chlog
            .child({
                userId,
                groupUuid,
            })
            .debug("Bad group UUID")
        return false
    }

    if (!(await userIsInGroup(userId, groupUuid))) {
        chlog
            .child({
                userId,
                groupUuid,
            })
            .debug("Group doesn't exist or user is not part of group")
        return false
    }
}
