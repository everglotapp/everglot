import fetch from "cross-fetch"
import { initClient, dedupExchange, fetchExchange } from "@urql/svelte"
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch"
import { persistedMutationFetchExchange } from "./persistedMutationFetchExchange"
// import { cacheExchange } from "./cacheExchange"
import { devtoolsExchange } from "@urql/devtools"

import makeGraphqlEndpoint from "./endpoint"
import generateHash from "./persistedOperationsHash"

export function setupUrql() {
    return initClient({
        url: makeGraphqlEndpoint(),
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
