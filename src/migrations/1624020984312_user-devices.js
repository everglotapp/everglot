/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "user_devices" },
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
                notNull: false,
            },
            fcm_token: {
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
        { schema: "app_public", name: "user_devices" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_devices" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.user_devices TO evg_server`)
    pgm.createIndex({ schema: "app_public", name: "user_devices" }, "user_id")
    pgm.sql(
        `GRANT INSERT(uuid, user_id, fcm_token)
        ON app_public.user_devices
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.user_devices_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_devices" },
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
        { schema: "app_public", name: "user_devices" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.user_devices_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, user_id, fcm_token)
        ON app_public.user_devices
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "user_devices" }, "user_id")
    pgm.sql(`REVOKE SELECT ON app_public.user_devices FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_devices" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "user_devices" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "user_devices" })
}
