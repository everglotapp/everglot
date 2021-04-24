import log from "../logger"

import { db } from "./db"

import type { User, InviteToken, Maybe } from "../types/generated/graphql"

export async function createToken({
    userId,
    token,
}: {
    userId: Maybe<User["id"]>
    token: InviteToken["inviteToken"]
}): Promise<InviteToken["id"] | null> {
    const tokenQueryResult = await db?.query({
        text: `INSERT INTO invite_tokens (
            user_id,
            invite_token
        )
        VALUES (
            $1,
            $2
        )
        RETURNING id`,
        values: [userId, token],
    })
    const success = tokenQueryResult?.rowCount === 1
    if (!tokenQueryResult || !success) {
        log.child({ tokenQueryResult }).error(`Token insertion failed`)
        return null
    }
    return tokenQueryResult.rows[0].id
}

export async function getTokenIdByToken(
    token: String
): Promise<Maybe<InviteToken["id"]>> {
    const queryResult = await db?.query({
        text: `SELECT id
        FROM app_public.invite_tokens
        WHERE invite_token = $1
        LIMIT 1`,
        values: [token],
    })
    const tokenId = await queryResult?.rows[0]?.id
    log.child({ token, tokenId }).trace("Got token ID by token")
    let success = queryResult?.rowCount === 1
    if (!success) {
        log.child({ queryResult }).trace(`Querying token ID failed`)
        return null
    }
    return tokenId
}
