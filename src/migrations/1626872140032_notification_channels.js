/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "notification_channels" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                notNull: true,
                unique: true,
                default: pgm.func("gen_random_uuid()"),
            },
            name: {
                type: "text",
                notNull: false,
                unique: true,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "notification_channels" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "notification_channels" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.notification_channels TO evg_server`)
    pgm.createIndex(
        { schema: "app_public", name: "notification_channels" },
        "name"
    )
    pgm.sql(
        `GRANT INSERT(uuid, name)
        ON app_public.notification_channels
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.notification_channels_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "notification_channels" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "notification_channels" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.notification_channels_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, name)
        ON app_public.notification_channels
        FROM evg_server`
    )
    pgm.dropIndex(
        { schema: "app_public", name: "notification_channels" },
        "name"
    )
    pgm.sql(`REVOKE SELECT ON app_public.notification_channels FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "notification_channels" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "notification_channels" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "notification_channels" })
}
