import compression from "compression"
import sirv from "sirv"
import { json } from "express"
import { ExpressPeerServer } from "peer"

import * as sapper from "@sapper/server"

import postgraphile from "./middlewares/postgraphile"
import session from "./middlewares/session"

import log from "../logger"
import { registerUserActivity } from "./users"

import type { Express } from "express"
import type { Pool } from "pg"
import type { Server } from "http"

const { NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const APP_IS_BEHIND_REVERSE_PROXY = true // could be an env variable

const WEBRTC_PATH = "/webrtc"

const chlog = log.child({
    namespace: "express",
})

export default function configureExpress(
    app: Express,
    server: Server,
    pool: Pool
): Express {
    /** Configure Peer.JS WebRTC server. */
    const peerjs = ExpressPeerServer(server, {
        path: "/",
        proxied: APP_IS_BEHIND_REVERSE_PROXY ? "true" : "false",
    })

    app.use(compression({ threshold: 0 }), sirv("static", { dev }), json())

    if (!dev) {
        if (APP_IS_BEHIND_REVERSE_PROXY) {
            app.set("trust proxy", 1) // trust first proxy (nginx)
        }
    }

    app.use(session(pool))

    app.use((req, res, next) => {
        if (pathIsProtected(req.path) && !req.session.user_id) {
            chlog.info(`Unauthorized access to path "${req.path}"`)
            // TODO: Add parameter with request path to redirect to after login
            res.redirect("/login")
            return
        }
        next()
    })

    app.use(WEBRTC_PATH, peerjs)

    app.use(async (req, _res, next) => {
        const { user_id: userId } = req.session
        if (userId) {
            if (!(await registerUserActivity({ userId }))) {
                chlog.error(
                    "Failed to register user activity",
                    JSON.stringify({
                        userId,
                    })
                )
            }
        }
        next()
    })

    app.use(postgraphile())

    app.use(sapper.middleware())

    return app
}

function pathIsProtected(path: string): boolean {
    const UNPROTECTED_ROUTES = [
        "/join",
        "/join/",
        "/login",
        "/login/",
        "/service-worker.js",
        "/global.css",
        "/favicon.ico",
        "/manifest.json",
    ]
    if (UNPROTECTED_ROUTES.includes(path)) {
        return false
    }
    if (path.startsWith("/client/")) {
        // static files
        return false
    }
    // if (dev && path === "/graphql") {
    //     return false
    // }
    return true
}
