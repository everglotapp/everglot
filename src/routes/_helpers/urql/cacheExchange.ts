import { cacheExchange as graphcacheExchange } from "@urql/exchange-graphcache"
import { relayPagination } from "@urql/exchange-graphcache/extras"

export const cacheExchange = graphcacheExchange({
    resolvers: {
        Query: {
            messages: relayPagination(),
        },
    },
})
export default cacheExchange
