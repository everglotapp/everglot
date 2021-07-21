/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "notifications" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                notNull: true,
                unique: true,
                default: pgm.func("gen_random_uuid()"),
            },
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
            },
            channel_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "notification_channels",
                },
                notNull: true,
            },
            params: {
                type: "json",
                notNull: false,
            },
            sent_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: pgm.func("current_timestamp"),
            },
            expires_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: pgm.func("current_timestamp"),
            },
            read_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: pgm.func("current_timestamp"),
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "notifications" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "notifications" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.notifications TO evg_server`)
    pgm.createIndex({ schema: "app_public", name: "notifications" }, "user_id")
    pgm.createIndex(
        { schema: "app_public", name: "notifications" },
        "channel_id"
    )
    pgm.sql(
        `GRANT UPDATE(expires_at, read_at)
        ON app_public.notifications
        TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(uuid, channel_id, user_id, params, sent_at, expires_at, read_at)
        ON app_public.notifications
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.notifications_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "notifications" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "notifications" },
        "update_server",
        {
            command: "UPDATE",
            role: "evg_server",
            check: `true`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "notifications" },
        "update_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "notifications" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.notifications_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, channel_id, user_id, params, sent_at, expires_at, read_at)
        ON app_public.notifications
        FROM evg_server`
    )
    pgm.sql(
        `REVOKE UPDATE(expires_at, read_at)
        ON app_public.notifications
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "notifications" }, "channel_id")
    pgm.dropIndex({ schema: "app_public", name: "notifications" }, "user_id")
    pgm.sql(`REVOKE SELECT ON app_public.notifications FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "notifications" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "notifications" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "notifications" })
}
