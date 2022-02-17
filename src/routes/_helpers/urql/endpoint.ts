const GRAPHQL_ENDPOINT = "/graphql"

type WindowLocationProtocol<T extends string = string> = `${T}:`
type GraphqlProtocol = WindowLocationProtocol<"https" | "http">
type GraphqlBaseUrl = `${GraphqlProtocol}${string}`

/**
 * @returns Endpoint for GraphQL requests.
 */
export const makeGraphqlEndpoint = () => `${getBaseUrl()}${GRAPHQL_ENDPOINT}`
export default makeGraphqlEndpoint

/**
 * @returns Base URL for GraphQL requests.
 */
function getBaseUrl(): GraphqlBaseUrl {
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
