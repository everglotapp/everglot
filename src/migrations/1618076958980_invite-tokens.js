/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "invite_tokens" },
        {
            id: "id",
            user_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "users",
                },
                notNull: false,
            },
            signed_up_with_token: {
                type: "string",
                notNull: false,
                default: "",
            },
            invite_token: {
                type: "string",
                notNull: true,
                default: false,
            },
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.invite_tokens TO evg_server`)
    pgm.sql(
        `GRANT INSERT(user_id, signed_up_with_token, invite_token)
        ON app_public.invite_tokens
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.invite_tokens_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.invite_tokens_id_seq FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.invite_tokens FROM evg_server `)
    pgm.sql(
        `REVOKE INSERT(user_id, signed_up_with_token, invite_token)
        ON app_public.invite_tokens
        FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.dropTable({ schema: "app_public", name: "invite_tokens" })
}
