import fetch from "cross-fetch"
import { initClient, dedupExchange, fetchExchange } from "@urql/svelte"
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"
import { persistedMutationFetchExchange } from "./persistedMutationFetchExchange"
// import { cacheExchange } from "./cacheExchange"
import { devtoolsExchange } from "@urql/devtools"

import persistedOperations from "../../../graphql.client.json"

import type { DocumentNode, OperationDefinitionNode } from "graphql"

const GRAPHQL_ENDPOINT = "/graphql"

type WindowLocationProtocol<T extends string = string> = `${T}:`
type GraphqlProtocol = WindowLocationProtocol<"https" | "http">
type GraphqlBaseUrl = `${GraphqlProtocol}${string}`
/**
 * @returns Base URL for GraphQL requests.
 */
function baseUrl(): GraphqlBaseUrl {
    const { protocol, host } = ((): {
        protocol: GraphqlProtocol
        host: string
    } => {
        if (typeof window !== "undefined") {
            const {
                location: { protocol, host },
            } = window
            if (protocol !== "http:" && protocol !== "https:") {
                throw new Error(
                    `Protocol ${protocol} not supported for GraphQL queries`
                )
            }
            return { protocol, host }
        }
        const { NODE_ENV, HOST = "127.0.0.1", PORT = 3000 } = process.env
        const prod = NODE_ENV === "production"
        return {
            protocol: prod ? "https:" : "http:",
            host: `${HOST}${PORT ? `:${PORT}` : ""}`,
        }
    })()
    return `${protocol}//${host}`
}

export function setupUrql() {
    return initClient({
        url: `${baseUrl()}${GRAPHQL_ENDPOINT}`,
        fetch,
        exchanges: [
            devtoolsExchange,
            dedupExchange,
            // cacheExchange,
            persistedMutationFetchExchange({
                // Disable until PostGraphile supports queries via GET
                // https://github.com/graphile/postgraphile/issues/442
                preferGetForPersistedQueries: false,
                enforcePersistedQueries: true,
                generateHash,
            }),
            persistedFetchExchange({
                // Disable until PostGraphile supports queries via GET
                // https://github.com/graphile/postgraphile/issues/442
                preferGetForPersistedQueries: false,
                enforcePersistedQueries: true,
                generateHash,
            }),
            fetchExchange,
        ],
    })
}

async function generateHash(
    _query: string,
    document: DocumentNode
): Promise<string> {
    // Note that we're assuming that the first definition is a operation
    // definition rather than a FragmentDefinitionNode.
    // Also we're ignoring the query variable meaning that we
    // cannot just use raw query strings. To change that, return its hash.
    const operationName = (document?.definitions[0] as OperationDefinitionNode)
        ?.name?.value
    if (operationName) {
        return persistedOperations[
            operationName as keyof typeof persistedOperations
        ]
    }
    throw new Error("Failed to resolve persisted operation hash")
}
