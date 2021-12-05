import session from "express-session"
import pgSimpleSessionStore from "connect-pg-simple"

import { exit } from "process"

import log from "../../logger"

import type { Pool } from "pg"
import type { RequestHandler } from "express"
import { getSessionIdCookieName } from "../../utils"
import { DATABASE_SCHEMA } from "../db"

const chlog = log.child({
    namespace: "session",
})

let middleware: RequestHandler | null

const {
    SESSION_COOKIE_VALIDATION_SECRETS,
    NODE_ENV,
    DISABLE_SECURE_COOKIES = "false",
} = process.env

const prod = NODE_ENV === "production"
const MAX_COOKIE_AGE_MS = 12 * 60 * 60 * 1000 // 12 hours

let disableSecureCookies = false
try {
    if (JSON.parse(DISABLE_SECURE_COOKIES) === true) {
        disableSecureCookies = true
    }
} catch (e) {
    chlog
        .child({ DISABLE_SECURE_COOKIES })
        .warn(
            "Failed to parse DISABLE_SECURE_COOKIES as JSON. Ignoring it and thus not disabling secure cookies."
        )
}

export function makeMiddleware(pool: Pool) {
    if (middleware) {
        return middleware
    }
    if (
        !SESSION_COOKIE_VALIDATION_SECRETS ||
        !SESSION_COOKIE_VALIDATION_SECRETS.length
    ) {
        chlog
            .child({ SESSION_COOKIE_VALIDATION_SECRETS })
            .error(
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
    } catch (err: any) {
        chlog
            .child({ SESSION_COOKIE_VALIDATION_SECRETS, message: err.message })
            .error(
                "SESSION_COOKIE_VALIDATION_SECRETS environment variable required. It should be a JSON array of random strings with the first element being the current secret, and the rest being previous secrets that are still considered valid."
            )
        exit(1)
    }

    const sess: session.SessionOptions = {
        secret,
        cookie: {
            maxAge: MAX_COOKIE_AGE_MS,
            sameSite: "strict", // Do not send this cookie to other origins.
            secure: prod && !disableSecureCookies, // Whether to require HTTPS connection for signing in.
            httpOnly: true,
        },
        store: new (pgSimpleSessionStore(session))({
            pool,
            schemaName: DATABASE_SCHEMA,
            tableName: "user_sessions",
        }),
        name: getSessionIdCookieName(),
        resave: false,
        saveUninitialized: false,
    }

    middleware = session(sess)
    return middleware
}

export default makeMiddleware
