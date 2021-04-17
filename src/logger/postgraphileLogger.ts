/**
 * File adapted from
 * https://github.com/graphile/postgraphile-log-consola/blob/master/index.js
 */

import type { DocumentNode } from "graphql"
import log from "."

const chlog = log.child({
    namespace: "gql-client",
})

const mode = process.env.NODE_ENV
const dev = mode === "development"

/*
 * Rather than importing GraphQL directly, we use PostGraphile's version of
 * GraphQL. This helps us to avoid issues related to having multiple GraphQL
 * versions installed.
 */
let graphql

/*
 * Below is the definition of a PostGraphile server plugin. You can read more
 * about this type of plugin here:
 *
 * https://www.graphile.org/postgraphile/plugins/
 *
 * The **most important thing** you must keep in mind when writing a plugin is
 * that each plugin method *must* return either the value it was passed, or a
 * derivative of (or replacement for) it. If you don't do this, you may get
 * spurious errors.
 */
export default {
    ["init"](_, { graphql: _graphql }) {
        // See the note by `let graphql` above.
        graphql = _graphql
        return _
    },

    ["postgraphile:options"](options) {
        return {
            ...options,
            disableQueryLog: true, // Bypass PostGraphile's internal logging
        }
    },

    ["postgraphile:http:handler"](req) {
        // For timing
        req._consolaPluginStartTime = process.hrtime()
        return req
    },

    ["postgraphile:http:result"](
        result: any,
        {
            queryDocumentAst,
            pgRole,
            req,
        }: {
            queryDocumentAst: DocumentNode
            pgRole: any
            req: any
        }
    ) {
        /*
         * Originally taken from PostGraphile's internal implementation:
         * https://github.com/graphile/postgraphile/blob/1719cbfef041e59536482ed20551d593fb82f78e/src/postgraphile/http/createPostGraphileHttpRequestHandler.ts#L748-L776
         * Augmented to use consola.
         */

        if (queryDocumentAst) {
            // We must reference this before it's deleted!
            const resultStatusCode = result.statusCode
            const timeDiff = process.hrtime(req._consolaPluginStartTime)

            // We setImmediate so that performing the log does not interfere with
            // returning the result to the user (reduces latency).
            setImmediate(() => {
                const errorCount = (result.errors || []).length
                const ms = timeDiff[0] * 1e3 + timeDiff[1] * 1e-6

                let message
                if (resultStatusCode === 401) {
                    message = `401 authentication error`
                } else if (resultStatusCode === 403) {
                    message = `403 forbidden error`
                } else {
                    message = `${errorCount} error(s)`
                }
                const hasError = errorCount > 0 || resultStatusCode >= 400
                const operationName =
                    queryDocumentAst.definitions[0]?.name?.value
                const operationType = queryDocumentAst.definitions[0]?.operation
                chlog[hasError ? "error" : "debug"](
                    `${message} ${
                        pgRole != null ? `as ${pgRole} ` : ""
                    }in ${`${ms.toFixed(2)}ms`} :: ${
                        operationName || "Unknown"
                    } ${operationType}`
                )
                if (dev) {
                    chlog
                        .child({
                            operation: graphql
                                .print(queryDocumentAst)
                                .replace(/\s+/g, " ")
                                .trim(),
                        })
                        [hasError ? "error" : "trace"](
                            `${operationName} completed with ${message}`
                        )
                }
            })
        }
        return result
    },
}
