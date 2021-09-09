import { jsonResponse, serverError } from "../../helpers"

import log from "../../logger"

import type { Request, Response } from "express"
import { updateUserBio } from "../../server/users"

const chlog = log.child({
    namespace: "profile-bio",
})

export async function post(req: Request, res: Response, _next: () => void) {
    jsonResponse(res)
    const { user_id: userId } = req.session
    if (!userId) {
        res.redirect("/")
        return
    }

    const bio = req.body["bio"]
    if (!bio || typeof bio !== "string" || !bio.length) {
        res.status(422).json({
            success: false,
            message: "Please specify a bio.",
        })
        return
    }

    if (!updateUserBio({ bio: bio.trim(), id: userId })) {
        chlog
            .child({ bio, userId })
            .error("Failed to update user bio in database")
        serverError(res)
        return
    }

    chlog.child({ bio, userId }).debug("Successfully saved new bio")
    res.status(200).json({
        success: true,
        message: null,
        meta: {
            bio,
        },
    })
}
