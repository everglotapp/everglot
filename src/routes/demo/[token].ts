import log from "../../logger"

import type { Request, Response } from "express"
import { getUserIdByEmail } from "../../server/users"
import { serverError } from "../../helpers"

const chlog = log.child({
    namespace: "demo-with-token",
})

const { DEMO_TOKEN, DEMO_USER_EMAIL } = process.env

export async function get(req: Request, res: Response, next: () => void) {
    if (!DEMO_TOKEN) {
        chlog.debug("No demo token has been set, not allowing demo access")
        res.status(404)
        next()
        return
    }
    if (!DEMO_USER_EMAIL) {
        chlog.debug("No demo user email has been set, not allowing demo access")
        res.status(404)
        next()
        return
    }
    const token = req.params["token"]
    if (!token || typeof token !== "string" || !token.length) {
        chlog.child({ token }).debug("Invalid demo token format")
        res.status(404)
        next()
        return
    }
    if (DEMO_TOKEN !== token) {
        chlog.child({ token }).debug("Wrong demo token")
        res.status(404)
        next()
        return
    }
    const demoUserId = await getUserIdByEmail(DEMO_USER_EMAIL)
    if (!demoUserId) {
        chlog
            .child({ demoUserId, DEMO_USER_EMAIL })
            .error("Could not find demo user by email")
        res.status(404)
        next()
        return
    }
    req.session.regenerate(function (err: any) {
        if (err) {
            chlog
                .child({ demoUserId, DEMO_USER_EMAIL })
                .info("Failed to (re)generate session: %s", err.message)
            serverError(res)
        } else {
            chlog
                .child({ demoUserId, DEMO_USER_EMAIL })
                .info("User logged in with demo URL")
            req.session.user_id = demoUserId
            res.redirect("/")
        }
    })
}
