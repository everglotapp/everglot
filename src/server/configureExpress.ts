import { exit } from "process"

import compression from "compression"
import sirv from "sirv"
import { json } from "body-parser"
import session from "express-session"

import * as sapper from "@sapper/server"

import type { Express } from "express"

const { NODE_ENV } = process.env
const dev = NODE_ENV === "development"

export default function configureExpress(app: Express): Express {
    app.use(compression({ threshold: 0 }), sirv("static", { dev }), json())

    if (
        !process.env.SESSION_COOKIE_VALIDATION_SECRETS ||
        !process.env.SESSION_COOKIE_VALIDATION_SECRETS.length
    ) {
        console.error(
            "SESSION_COOKIE_VALIDATION_SECRETS environment variable required. It should be a JSON array of random strings with the first element being the current secret, and the rest being previous secrets that are still considered valid."
        )
        exit(1)
    }
    let secret: string[] | null
    try {
        secret = JSON.parse(process.env.SESSION_COOKIE_VALIDATION_SECRETS)
        if (
            !Array.isArray(secret) ||
            !secret.length ||
            !(secret as any[]).every((s) => typeof s === "string" && s.length)
        ) {
            throw new SyntaxError(
                "Bad format of environment variable SESSION_COOKIE_VALIDATION_SECRETS, expected a non-empty array of non-empty strings"
            )
        }
        secret = secret as string[]
    } catch (e: any) {
        console.error(
            "SESSION_COOKIE_VALIDATION_SECRETS environment variable required. It should be a JSON array of random strings with the first element being the current secret, and the rest being previous secrets that are still considered valid.",
            e.message,
            e.stack
        )
        exit(1)
    }
    const sess: session.SessionOptions = {
        secret,
        cookie: {},
    }

    if (!dev) {
        const APP_IS_BEHIND_REVERSE_PROXY = true // could be an env variable
        if (APP_IS_BEHIND_REVERSE_PROXY) {
            app.set("trust proxy", 1) // trust first proxy (nginx)
        }
        sess.cookie = { ...sess.cookie, secure: true } // serve secure cookies
    }

    app.use(session(sess))

    app.use(sapper.middleware())

    return app
}
