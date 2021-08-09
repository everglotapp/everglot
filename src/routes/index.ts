import { userHasCompletedProfile } from "../server/users"

import type { Request, Response } from "express"

export async function get(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        return
    }
    if (await userHasCompletedProfile(userId)) {
        // render feed
        next()
        return
    }
    res.redirect("/signup")
}
