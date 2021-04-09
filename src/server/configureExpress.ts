import compression from "compression"
import sirv from "sirv"
import { json } from "express"
import { PeerServer } from "peer"

import * as sapper from "@sapper/server"

import postgraphile from "./middlewares/postgraphile"
import session from "./middlewares/session"

import type { Express } from "express"
import type { Pool } from "pg"
import { registerUserActivity } from "./users"

const { NODE_ENV } = process.env
const dev = NODE_ENV === "development"

export default function configureExpress(app: Express, pool: Pool): Express {
    app.use(compression({ threshold: 0 }), sirv("static", { dev }), json())

    const APP_IS_BEHIND_REVERSE_PROXY = true // could be an env variable
    if (!dev) {
        if (APP_IS_BEHIND_REVERSE_PROXY) {
            app.set("trust proxy", 1) // trust first proxy (nginx)
        }
    }

    /** Start Peer.JS WebRTC server. */
    const peerjs = PeerServer({
        path: "/webrtc",
        proxied: APP_IS_BEHIND_REVERSE_PROXY,
    })
    app.use("/webrtc", peerjs)

    app.use(session(pool))

    app.use((req, res, next) => {
        console.log(req.path)
        if (pathIsProtected(req.path) && !req.session.user_id) {
            console.log(`Unauthorized access to path "${req.path}"`)
            // TODO: Add parameter with request path to redirect to after login
            res.redirect("/login")
            return
        }
        next()
    })

    app.use(async (req, _res, next) => {
        const { user_id: userId } = req.session
        if (userId) {
            if (!(await registerUserActivity({ userId }))) {
                console.log("Failed to register user activity", {
                    userId,
                })
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
