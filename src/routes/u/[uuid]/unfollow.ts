import { validate as uuidValidate } from "uuid"

import { unprocessableEntity } from "../../../helpers"
import log from "../../../logger"

const chlog = log.child({
    namespace: "u-uuid-unfollow",
})

import type { Request, Response } from "express"
import {
    deleteUserFollowership,
    getUserIdByUuid,
    getUserFollowershipIdByUserIdAndFollowerId,
} from "../../../server/users"

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: currentUserId } = req.session
    if (!currentUserId) {
        res.redirect("/")
        return
    }
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ currentUserId, uuid }).debug("Invalid UUID")
        next()
        return
    }
    const userId = await getUserIdByUuid(uuid)
    if (!userId) {
        chlog.child({ currentUserId, uuid }).debug("Did not find User by UUID")
        next()
        return
    }
    const userFollowershipId = await getUserFollowershipIdByUserIdAndFollowerId(
        userId,
        currentUserId
    )
    if (!userFollowershipId) {
        chlog
            .child({ currentUserId, userId })
            .debug("Did not find followership by user ID and follower ID")
        res.json({
            success: false,
        })
        next()
        return
    }
    const userFollowership = await deleteUserFollowership({
        id: userFollowershipId,
    })
    if (userFollowership) {
        chlog
            .child({ userFollowership, userFollowershipId })
            .debug("User successfully unfollowed another user")
        res.json({
            success: true,
        })
    } else {
        chlog
            .child({ userFollowership, userFollowershipId })
            .debug("Failed to unlike User")
        unprocessableEntity(res, "You have not liked this User")
    }
}
