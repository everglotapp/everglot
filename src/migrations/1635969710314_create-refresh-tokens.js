/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "refresh_tokens" },
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
            jti: {
                type: "string",
                notNull: true,
            },
            used_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: null,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.createIndex({ schema: "app_public", name: "refresh_tokens" }, "user_id")
    pgm.createPolicy(
        { schema: "app_public", name: "refresh_tokens" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "refresh_tokens" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.refresh_tokens TO evg_server`)
    pgm.sql(
        `GRANT INSERT(user_id, jti)
        ON app_public.refresh_tokens
        TO evg_server`
    )
    pgm.sql(
        `GRANT UPDATE(used_at)
        ON app_public.refresh_tokens
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.refresh_tokens_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.refresh_tokens_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE UPDATE(used_at)
        ON app_public.refresh_tokens
        FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.refresh_tokens FROM evg_server `)
    pgm.sql(
        `REVOKE INSERT(user_id, jti)
        ON app_public.refresh_tokens
        FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "refresh_tokens" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "refresh_tokens" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.dropIndex({ schema: "app_public", name: "refresh_tokens" }, "user_id")
    pgm.dropTable({ schema: "app_public", name: "refresh_tokens" })
}
