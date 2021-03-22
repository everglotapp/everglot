import { postgraphile, makePluginHook } from "postgraphile"
import PersistedOperationsPlugin from "@graphile/persisted-operations"
import PgSimplifyInflectorPlugin from "@graphile-contrib/pg-simplify-inflector"
import type { PostGraphileOptions } from "postgraphile"

import type { Request, RequestHandler } from "express"

const { NODE_ENV, DATABASE_URL } = process.env
const dev = NODE_ENV === "development"

import { DATABASE_SCHEMA, DATABASE_ROLE_CLIENT } from "../db"

let middleware: RequestHandler | null

export function getPostGraphileOptions(): PostGraphileOptions {
    const pluginHook = makePluginHook([PersistedOperationsPlugin])
    // TODO: use a restricted user account for postgraphile access
    return {
        appendPlugins: [PgSimplifyInflectorPlugin],
        watchPg: true,
        graphiql: dev,
        enhanceGraphiql: dev,
        pluginHook,
        persistedOperationsDirectory: `${__dirname}/../../../.persisted_operations/`,
        allowUnpersistedOperation(req: Request) {
            return dev && req.headers.referer?.endsWith("/graphiql")
        },
        async additionalGraphQLContextFromRequest(req: Request, _res) {
            return { userId: req.session.user_id }
        },
        exportGqlSchemaPath: dev ? "schema.graphql" : undefined,
        showErrorStack: dev ? "json" : false,
        extendedErrors: dev ? ["hint", "detail", "errcode"] : [],
        allowExplain: dev
            ? (_req) => {
                  // TODO: customise condition!
                  return true
              }
            : false,
        legacyRelations: "omit",
        pgSettings: async (req: Request) => ({
            /**
             * These are requests that the client makes directly.
             * Therefore they get their own, very restricted permissions.
             */
            role: DATABASE_ROLE_CLIENT,
            "user.id": req.session.user_id,
            statement_timeout: "3000",
        }),
    } as PostGraphileOptions & { persistedOperationsDirectory: {} }
}

export function makeMiddleware(): RequestHandler {
    if (middleware) {
        return middleware
    }
    middleware = postgraphile(
        DATABASE_URL,
        DATABASE_SCHEMA,
        getPostGraphileOptions()
    )
    return middleware
}

export default makeMiddleware
