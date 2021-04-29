import { jsonResponse, serverError } from "../../helpers"

import log from "../../logger"

import type { Request, Response } from "express"
import { updateUserAvatarUrl } from "../../server/users"
import { USER_AVATARS_BASE_PATH } from "../../constants"

export async function post(req: Request, res: Response, _next: () => void) {
    jsonResponse(res)
    // save to user record
    if (!req.file) {
        res.status(422).json({
            success: false,
            message: "Please provide a file",
        })
        return
    }
    log.child({ file: req.file }).debug("Parsed avatar file")

    const avatarUrl = `${USER_AVATARS_BASE_PATH}/${req.file.filename}`
    if (!updateUserAvatarUrl({ avatarUrl, id: req.session.user_id! })) {
        log.child({ avatarUrl, userId: req.session.user_id }).error(
            "Failed to save stored avatar to database"
        )
        // TODO: Remove file
        serverError(res)
        return
    }

    log.child({ avatarUrl, userId: req.session.user_id }).debug(
        "Successfully saved new avatar"
    )
    res.status(200).json({
        success: true,
        message: null,
        meta: {
            avatarUrl,
        },
    })
}
