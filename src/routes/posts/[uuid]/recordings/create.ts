import { validate as uuidValidate } from "uuid"

import { serverError } from "../../../../helpers"

import log from "../../../../logger"

import type { Request, Response } from "express"
import { getPostIdByUuid, createPostRecording } from "../../../../server/posts"
import path from "path"

const chlog = log.child({
    namespace: "posts-recordings-create",
})

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        chlog.child({ userId }).error("userId unexpectedly falsy")
        throw new Error(
            "No user ID set for protected route. Are we really protected?"
        )
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
    const { file } = req
    if (!file) {
        res.status(422).json({
            success: false,
            message: "Please provide a file",
        })
        return
    }
    log.child({ file, postId, userId }).debug("Parsed post recording file")

    const parsedPath = path.parse(file.path)
    const { name, ext } = parsedPath
    const filename = name
    const extension = ext.startsWith(".") ? ext.substring(1) : ext
    const postRecording = await createPostRecording({
        filename,
        extension,
        postId,
        userId,
    })
    if (!postRecording) {
        log.child({ parsedPath, postId, userId }).error(
            "Failed to save stored recording to database"
        )
        // TODO: Remove file
        serverError(res)
        return
    }

    log.child({ parsedPath, postId, userId }).debug(
        "Successfully saved new post recording"
    )
    res.status(200).json({
        success: true,
        meta: {
            postRecording: {
                uuid: postRecording.uuid,
                nodeId: postRecording.nodeId,
            },
        },
    })
}
