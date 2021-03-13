import { exit } from "process"

import compression from "compression"
import sirv from "sirv"
import session from "express-session"
import { json } from "express"
import pgSimpleSessionStore from "connect-pg-simple"

import * as sapper from "@sapper/server"

import { postgraphile, makePluginHook } from "postgraphile"
import PersistedOperationsPlugin from "@graphile/persisted-operations"
import type { PostGraphileOptions } from "postgraphile"

import type { Express } from "express"
import type { Pool } from "pg"

const {
    NODE_ENV,
    DATABASE_URL,
    SESSION_COOKIE_VALIDATION_SECRETS,
    SESSION_COOKIE_NAME = "everglot_sid",
} = process.env
const dev = NODE_ENV === "development"

export default function configureExpress(app: Express, pool: Pool): Express {
    app.use(compression({ threshold: 0 }), sirv("static", { dev }), json())

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
            tableName: "user_sessions",
        }),
        name: SESSION_COOKIE_NAME,
        resave: false,
        saveUninitialized: false,
    }

    if (!dev) {
        const APP_IS_BEHIND_REVERSE_PROXY = true // could be an env variable
        if (APP_IS_BEHIND_REVERSE_PROXY) {
            app.set("trust proxy", 1) // trust first proxy (nginx)
        }
        sess.cookie = { ...sess.cookie, secure: true } // serve secure cookies
    }

    app.use(session(sess))

    app.use((req, res, next) => {
        if (pathIsProtected(req.path) && !req.session.user_id) {
            console.log(`Unauthorized access to path "${req.path}"`)
            // TODO: Add parameter with request path to redirect to after login
            res.redirect("/login")
            return
        }
        next()
    })

    const pluginHook = makePluginHook([PersistedOperationsPlugin])
    app.use(
        // TODO: use a restricted user account for postgraphile access
        postgraphile(DATABASE_URL, "public", {
            watchPg: true,
            graphiql: true,
            enhanceGraphiql: dev,
            pluginHook,
            persistedOperations: {}, // disable all queries for now, TODO: persist them
            async additionalGraphQLContextFromRequest(req, _res) {
                return { req }
            },
            pgSettings: {
                statement_timeout: "3000",
            },
        } as PostGraphileOptions & { persistedOperations: {} })
    )

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
    return true
}
