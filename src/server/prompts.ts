import { performQuery } from "./gql"

import log from "../logger"
const chlog = log.child({ namespace: "prompts" })

import { PromptIdByUuid, PromptIdByUuidQuery } from "../types/generated/graphql"

export async function getPromptIdByUuid(uuid: string): Promise<number | null> {
    const res = await performQuery<PromptIdByUuidQuery>(
        PromptIdByUuid.loc!.source,
        { uuid }
    )
    if (!res.data) {
        chlog.child({ res, uuid }).error("Failed to find post ID by UUID")
        return null
    }
    return res.data?.promptByUuid?.id || null
}
