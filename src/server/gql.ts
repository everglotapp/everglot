import { graphql } from "graphql"
import { withPostGraphileContext, watchPostGraphileSchema } from "postgraphile"

import { createDatabasePool } from "./db"
import { getPostGraphileOptions } from "./middlewares/postgraphile"

import type { GraphQLSchema, Source } from "graphql"

const DATABASE_SCHEMA = "app_public"

let schema: GraphQLSchema | null

export async function performQuery(
    query: Source | string,
    variables:
        | {
              [key: string]: any
          }
        | undefined,
    operationName: string | undefined = undefined
) {
    return await withPostGraphileContext(
        {
            pgPool: createDatabasePool(),
            pgDefaultRole: "evg_server",
        },
        async (context) => {
            // Execute your GraphQL query in this function with the provided
            // `context` object, which should NOT be used outside of this
            // function.
            if (!schema) {
                throw new Error("GraphQL schema is empty")
            }
            return await graphql(
                schema,
                query,
                null,
                { ...context }, // You can add more to context if you like
                variables,
                operationName
            )
        }
    )
}

export async function start() {
    const releaseWatcher = await watchPostGraphileSchema(
        createDatabasePool(),
        DATABASE_SCHEMA,
        getPostGraphileOptions(),
        (newSchema) => {
            console.log("[PostGraphile Watcher] Generated new GraphQL schema")
            schema = newSchema
        }
    )
    await releaseWatcher()
}

export default {
    start,
    performQuery,
}
