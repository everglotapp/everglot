import fetch from "cross-fetch"
import { initClient, dedupExchange, fetchExchange } from "@urql/svelte"
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"
import { persistedMutationFetchExchange } from "./persistedMutationFetchExchange"
import { cacheExchange } from "./cacheExchange"

import persistedOperations from "../../../graphql.client.json"

import type { DocumentNode, OperationDefinitionNode } from "graphql"

const GRAPHQL_ENDPOINT = "/graphql"

export function setupUrql() {
    return initClient({
        url: GRAPHQL_ENDPOINT,
        fetch,
        exchanges: [
            dedupExchange,
            cacheExchange,
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
