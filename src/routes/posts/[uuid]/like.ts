import { validate as uuidValidate } from "uuid"
import { unprocessableEntity } from "../../../helpers"

import log from "../../../logger"

const chlog = log.child({
    namespace: "posts-like",
})

import type { Request, Response } from "express"
import { createPostLike, getPostIdByUuid } from "../../../server/posts"

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ userId, uuid }).debug("Invalid UUID")
        next()
        return
    }
    const postId = await getPostIdByUuid(uuid)
    if (!postId) {
        chlog.child({ userId, uuid }).debug("Did not find post by UUID")
        next()
        return
    }
    const postLike = await createPostLike({
        postId,
        userId,
    })
    if (postLike) {
        chlog.child({ postLike }).debug("User successfully liked post")
        res.json({
            success: true,
        })
    } else {
        chlog.child({ postLike, postId, userId }).debug("Failed to like post")
        unprocessableEntity(res, "You already liked this post")
    }
}
