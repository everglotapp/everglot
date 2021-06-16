import { userHasCompletedProfile } from "../server/users"

import type { Request, Response } from "express"

export async function get(req: Request, res: Response, next: () => void) {
    if (!req.session.user_id) {
        return
    }
    if (await userHasCompletedProfile(req.session.user_id)) {
        res.redirect("/global")
        return
    }
    next()
}
