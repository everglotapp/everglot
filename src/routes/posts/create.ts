import log from "../../logger"
import { unprocessableEntity } from "../../helpers"

const chlog = log.child({
    namespace: "posts-create",
})

import type { Request, Response } from "express"
import { createPost, getPostIdByUuid } from "../../server/posts"

const MAX_BODY_LENGTH = 2048

function sanitizeBody(body: string) {
    return body.trim().substr(0, MAX_BODY_LENGTH)
}

export async function post(req: Request, res: Response, _next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    const unsanitizedBody = req.body["body"]
    if (!unsanitizedBody || !unsanitizedBody.length) {
        chlog.child({ userId }).debug("Empty body before sanitization")
        unprocessableEntity(res, "Body must not be empty")
        return
    }
    const body = sanitizeBody(unsanitizedBody)
    if (!body.length) {
        chlog
            .child({ userId, unsanitizedBody })
            .debug("Empty body after sanitization")
        unprocessableEntity(res, "Body must not be empty")
        return
    }
    let parentPostId: number | null = null
    const parentPostUuid = req.body["parentPostUuid"]
    if (parentPostUuid && typeof parentPostUuid === "string") {
        const postId = await getPostIdByUuid(req.body["parentPostUuid"])
        if (!postId) {
            chlog
                .child({ userId, body, parentPostUuid })
                .debug("Did not find parent post by UUID")
            unprocessableEntity(res, "Did not find parent post")
            return
        }
        parentPostId = postId
    }
    const post = await createPost({ authorId: userId, body, parentPostId })
    if (post) {
        chlog.child({ post }).debug("User successfully created post")
        res.json({
            success: true,
        })
    } else {
        res.json({
            success: false,
        })
    }
}
