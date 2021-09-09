import { jsonResponse, serverError } from "../../helpers"

import log from "../../logger"

import type { Request, Response } from "express"
import { updateUserAvatarUrl } from "../../server/users"
import { USER_AVATARS_BASE_PATH } from "../../constants"

const chlog = log.child({
    namespace: "profile-picture",
})

export async function post(req: Request, res: Response, _next: () => void) {
    jsonResponse(res)
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }
    // save to user record
    if (!req.file) {
        res.status(422).json({
            success: false,
            message: "Please provide a file",
        })
        return
    }
    chlog.child({ file: req.file }).debug("Parsed avatar file")

    const avatarUrl = `${USER_AVATARS_BASE_PATH}/${req.file.filename}`
    if (!updateUserAvatarUrl({ avatarUrl, id: userId })) {
        chlog
            .child({ avatarUrl, userId })
            .error("Failed to save stored avatar to database")
        // TODO: Remove file
        serverError(res)
        return
    }

    chlog.child({ avatarUrl, userId }).debug("Successfully saved new avatar")
    // TODO: Remove old avatar
    res.status(200).json({
        success: true,
        message: null,
        meta: {
            avatarUrl,
        },
    })
}
