import compression from "compression"
import sirv from "sirv"
import { json } from "express"
import cookieParser from "cookie-parser"

import * as sapper from "@sapper/server"

import postgraphile from "./middlewares/postgraphile"
import session from "./middlewares/session"
import uploads from "./middlewares/uploads"

import log from "../logger"
import { registerUserActivity } from "./users"

import type { Express, Request } from "express"
import type { Pool } from "pg"

const { NODE_ENV, DEMO_TOKEN, DEMO2_TOKEN } = process.env
const dev = NODE_ENV === "development"

const APP_IS_BEHIND_REVERSE_PROXY = true // could be an env variable

const chlog = log.child({
    namespace: "express",
})

export default function configureExpress(app: Express, pool: Pool): Express {
    app.use(
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        sirv("dynamic", { dev: true }),
        json(),
        cookieParser()
    )

    if (!dev) {
        if (APP_IS_BEHIND_REVERSE_PROXY) {
            app.set("trust proxy", 1) // trust first proxy (nginx)
        }
    }

    app.use(session(pool))

    app.use((req, res, next) => {
        if (pathIsProtected(req) && !req.session.user_id) {
            chlog.debug(`Unauthorized access to path "${req.path}"`)
            // TODO: Add parameter with request path to redirect to after login
            res.redirect("/login")
            return
        }
        next()
    })

    app.use(uploads)

    app.use(async (req, _res, next) => {
        const { user_id: userId } = req.session
        if (userId) {
            if (!(await registerUserActivity({ userId }))) {
                chlog
                    .child({
                        userId,
                    })
                    .error("Failed to register user activity")
            }
        }
        next()
    })

    app.use(postgraphile())

    app.use(sapper.middleware())

    return app
}

const UNPROTECTED_ROUTES = [
    "/join",
    "/join/",
    "/login",
    "/login/",
    "/users/password/reset",
    "/users/password/reset/",
    "/users/password/reset/update",
    "/users/password/reset/update/",
    "/service-worker.js",
    "/global.css",
    "/favicon.ico",
    "/manifest.json",
    "/placeholder",
] as const
function pathIsProtected(req: Request): boolean {
    const method = req.method.toLowerCase()
    const path = req.path

    if ((UNPROTECTED_ROUTES as readonly string[]).includes(path)) {
        return false
    }
    if (path.startsWith("/client/") && "get" === method) {
        // static files
        return false
    }
    if (
        DEMO_TOKEN &&
        DEMO_TOKEN.length &&
        `/demo/${DEMO_TOKEN}` === path &&
        "get" === method
    ) {
        return false
    }
    if (
        DEMO2_TOKEN &&
        DEMO2_TOKEN.length &&
        `/demo/${DEMO2_TOKEN}` === path &&
        "get" === method
    ) {
        return false
    }
    // For tokens passed via GET in query string.
    if (path.startsWith("/email/unsubscribe") && "get" === method) {
        return false
    }
    if (path.startsWith("/users/password/reset/") && "get" === method) {
        return false
    }
    // if (dev && path === "/graphql") {
    //     return false
    // }
    return true
}
