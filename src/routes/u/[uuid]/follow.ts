import { validate as uuidValidate } from "uuid"
import { unprocessableEntity } from "../../../helpers"

import log from "../../../logger"

const chlog = log.child({
    namespace: "u-uuid-follow",
})

import type { Request, Response } from "express"
import { createUserFollowership, getUserIdByUuid } from "../../../server/users"

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
        chlog.child({ uuid }).debug("Did not find post by UUID")
        next()
        return
    }
    if (userId === currentUserId) {
        chlog
            .child({ userId, currentUserId })
            .debug("User tried to follow themselves")
        unprocessableEntity(res, "You cannot follow yourself")
        return
    }
    const userFollowership = await createUserFollowership({
        userId,
        followerId: currentUserId,
    })
    if (userFollowership) {
        chlog
            .child({ userFollowership })
            .debug("User successfully followed another")
        res.json({
            success: true,
        })
    } else {
        chlog
            .child({ userFollowership, followerId: currentUserId, userId })
            .debug("Failed to like post")
        unprocessableEntity(res, "You already liked this post")
    }
}
