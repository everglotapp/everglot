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
    const res = await db?.query<{ id: InviteToken["id"] }>({
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
    const success = res?.rowCount === 1
    if (!res || !success) {
        log.child({ userId, token, rowCount: res?.rowCount }).error(
            `Token insertion failed`
        )
        return null
    }
    const tokenId = res.rows[0].id
    return tokenId || null
}

export async function getTokenIdByToken(
    token: String
): Promise<Maybe<InviteToken["id"]>> {
    const res = await db?.query<{ id: InviteToken["id"] }>({
        text: `SELECT id
        FROM app_public.invite_tokens
        WHERE invite_token = $1
        LIMIT 1`,
        values: [token],
    })
    let success = res?.rowCount === 1
    if (!res || !success) {
        log.child({ token, rowCount: res?.rowCount }).debug(
            `Could not find any invite_tokens record for the given token`
        )
        return null
    }
    const tokenId = res.rows[0].id
    log.child({ token, tokenId }).trace(
        `Found an invite_tokens record for the given token`
    )
    return tokenId || null
}
