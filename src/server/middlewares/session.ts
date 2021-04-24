import session from "express-session"
import pgSimpleSessionStore from "connect-pg-simple"

import { exit } from "process"

import type { Pool } from "pg"
import type { RequestHandler } from "express"

let middleware: RequestHandler | null

export const {
    SESSION_COOKIE_VALIDATION_SECRETS,
    SESSION_COOKIE_NAME = "everglot_sid",
    NODE_ENV,
} = process.env
const dev = NODE_ENV === "development"

export function makeMiddleware(pool: Pool) {
    if (middleware) {
        return middleware
    }
    if (
        !SESSION_COOKIE_VALIDATION_SECRETS ||
        !SESSION_COOKIE_VALIDATION_SECRETS.length
    ) {
        console.error(
            "SESSION_COOKIE_VALIDATION_SECRETS environment variable required. It should be a JSON array of random strings with the first element being the current secret, and the rest being previous secrets that are still considered valid."
        )
        exit(1)
    }
    let secret: string[] | null
    try {
        secret = JSON.parse(SESSION_COOKIE_VALIDATION_SECRETS)
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
        cookie: { maxAge: 3 * 24 * 60 * 60 * 1000 }, // 3 days until touch or re-login
        store: new (pgSimpleSessionStore(session))({
            pool,
            schemaName: "app_public",
            tableName: "user_sessions",
        }),
        name: SESSION_COOKIE_NAME,
        resave: false,
        saveUninitialized: false,
    }

    if (!dev) {
        sess.cookie = { ...sess.cookie, secure: true } // serve secure cookies
    }
    middleware = session(sess)
    return middleware
}

export default makeMiddleware
