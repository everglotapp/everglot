import { cacheExchange as graphcacheExchange } from "@urql/exchange-graphcache"
import { relayPagination } from "@urql/exchange-graphcache/extras"

// import schema from "../../../graphql.schema.json"

export const cacheExchange = graphcacheExchange({
    resolvers: {
        Query: {
            messagesByRecipientGroupId: relayPagination(),
        },
    },
    keys: {
        // @ts-ignore
        Message: (data) => data.uuid,
        // @ts-ignore
        MessagePreview: (data) => data.uuid,
        // @ts-ignore
        User: (data) => data.uuid,
        // @ts-ignore
        Group: (data) => data.uuid,
        // @ts-ignore
        Language: (data) => data.alpha2,
        // @ts-ignore
        InviteToken: (data) => data.inviteToken,
        // @ts-ignore
        GroupUser: (data) => data.nodeId,
        // @ts-ignore
        UserLanguage: (data) => data.nodeId,
        // @ts-ignore
        LanguageSkillLevel: (data) => data.name,
    },
    // schema,
})
export default cacheExchange
