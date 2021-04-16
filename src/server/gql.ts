import { ExecutionResult, graphql } from "graphql"
import { withPostGraphileContext, watchPostGraphileSchema } from "postgraphile"

import log from "../logger"

import { createDatabasePool } from "./db"
import { getPostGraphileOptions } from "./middlewares/postgraphile"

import type { GraphQLSchema, Source } from "graphql"
import { DATABASE_ROLE_SERVER, DATABASE_SCHEMA } from "./db"

let schema: GraphQLSchema | null

const chlog = log.child({
    namespace: "gql-server",
})

//export declare type QueryResult<TResult = ExecutionResult>> Promise<TResult>) => Promise<TResult>;

export async function performQuery<TData = { [key: string]: any }>(
    query: Source | string,
    variables:
        | {
              [key: string]: any
          }
        | undefined,
    operationName: string | undefined = undefined
): Promise<ExecutionResult<TData>> {
    return <any>await withPostGraphileContext(
        {
            pgPool: createDatabasePool(),
            pgDefaultRole: DATABASE_ROLE_SERVER,
        },
        async function (context) {
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

let releaseWatcher: (() => Promise<void>) | undefined
export async function start() {
    if (releaseWatcher) {
        return null
    }
    releaseWatcher = await watchPostGraphileSchema(
        createDatabasePool(),
        DATABASE_SCHEMA,
        getPostGraphileOptions(),
        (newSchema) => {
            chlog.debug("Generated new GraphQL schema")
            schema = newSchema
        }
    )
    return true
}

export async function stop() {
    if (!releaseWatcher) {
        return false
    }
    await releaseWatcher()
    return true
}

export default {
    start,
    stop,
    performQuery,
}
