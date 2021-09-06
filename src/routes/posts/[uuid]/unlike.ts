import { validate as uuidValidate } from "uuid"

import { unprocessableEntity } from "../../../helpers"
import log from "../../../logger"

const chlog = log.child({
    namespace: "posts-uuid-unlike",
})

import type { Request, Response } from "express"
import {
    deletePostLike,
    getPostIdByUuid,
    getPostLikeIdByPostIdAndUserId,
} from "../../../server/posts"

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
    const postLikeId = await getPostLikeIdByPostIdAndUserId(postId, userId)
    if (!postLikeId) {
        chlog
            .child({ userId, postId })
            .debug("Did not find post like by post ID and user ID")
        res.json({
            success: false,
        })
        next()
        return
    }
    const postLike = await deletePostLike({ id: postLikeId })
    if (postLike) {
        chlog
            .child({ postLike, postLikeId })
            .debug("User successfully unliked post")
        res.json({
            success: true,
        })
    } else {
        chlog.child({ postLike, postLikeId }).debug("Failed to unlike post")
        unprocessableEntity(res, "You have not liked this post")
    }
}
