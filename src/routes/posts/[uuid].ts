import { validate as uuidValidate } from "uuid"
import log from "../../logger"

const chlog = log.child({
    namespace: "posts-view",
})

import type { Request, Response } from "express"
import { getPostIdByUuid } from "../../server/posts"

export async function get(req: Request, res: Response, next: () => void) {
    const uuid = req.params["uuid"]
    if (!uuid || !uuidValidate(uuid)) {
        chlog.child({ uuid }).debug("Invalid UUID")
        res.status(404)
        next()
        return
    }
    const postId = await getPostIdByUuid(uuid)
    if (!postId) {
        chlog.child({ uuid }).debug("Could not find post ID by UUID")
        res.status(404)
        next()
        return
    }
    next()
}
