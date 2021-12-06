import log from "../logger"

import { DATABASE_SCHEMA, db } from "./db"

import type { User, InviteToken, Maybe } from "../types/generated/graphql"

const chlog = log.child({ namespace: "inviteTokens" })

export async function createInviteToken({
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
        chlog
            .child({ userId, token, rowCount: res?.rowCount })
            .error(`Token insertion failed`)
        return null
    }
    const tokenId = res.rows[0].id
    return tokenId || null
}

export async function getInviteTokenIdByToken(
    token: string
): Promise<Maybe<InviteToken["id"]>> {
    const res = await db?.query<{ id: InviteToken["id"] }>({
        text: `SELECT id
        FROM ${DATABASE_SCHEMA}.invite_tokens
        WHERE invite_token = $1
        LIMIT 1`,
        values: [token],
    })
    let success = res?.rowCount === 1
    if (!res || !success) {
        chlog
            .child({ token, rowCount: res?.rowCount })
            .debug(
                `Could not find any invite_tokens record for the given token`
            )
        return null
    }
    const tokenId = res.rows[0].id
    chlog
        .child({ token, tokenId })
        .trace(`Found an invite_tokens record for the given token`)
    return tokenId || null
}
