import { validate as uuidValidate } from "uuid"

import avatars from "./avatars"
import postRecordings from "./postRecordings"

import type { Request, Response } from "express"

const UUID_V4_REGEX =
    /^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/
const UUID_V4_LENGTH = 36

const POSTS_PREFIX = "/posts/"

import log from "../../../logger"
import { getPostIdByUuid } from "../../posts"
import {
    USER_UPLOAD_AVATAR_FILE_FORM_FIELD,
    USER_CREATE_POST_RECORDING_FILE_FORM_FIELD,
} from "../../../constants"

const chlog = log.child({
    namespace: "uploads",
})

export async function uploadsMiddleware(
    req: Request,
    res: Response,
    next: () => void
) {
    if (req.path === "/profile/picture") {
        if (req.method !== "POST") {
            next()
            return
        }
        const { user_id: userId } = req.session
        if (!userId) {
            chlog.child({ userId }).error("userId unexpectedly falsy")
            throw new Error(
                "No user ID set for protected route. Are we really protected?"
            )
        }
        avatars.single(USER_UPLOAD_AVATAR_FILE_FORM_FIELD)(req, res, next)
        return
    }
    if (
        // /posts/[uuid]/recordings/create
        req.path.startsWith(POSTS_PREFIX) &&
        req.path.endsWith("/recordings/create")
    ) {
        if (req.method !== "POST") {
            next()
            return
        }
        const { user_id: userId } = req.session
        if (!userId) {
            chlog.child({ userId }).error("userId unexpectedly falsy")
            throw new Error(
                "No user ID set for protected route. Are we really protected?"
            )
        }
        const matches = req.path
            .substr(POSTS_PREFIX.length, UUID_V4_LENGTH)
            .match(UUID_V4_REGEX)
        if (matches) {
            const uuid = matches[0]
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
            postRecordings.single(USER_CREATE_POST_RECORDING_FILE_FORM_FIELD)(
                req,
                res,
                next
            )
            return
        }
    }
    next()
}
export default uploadsMiddleware
