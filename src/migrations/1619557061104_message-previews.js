/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "message_previews" },
        {
            id: "id",
            uuid: { type: "uuid", notNull: true, unique: true },
            filename: {
                type: "text",
                notNull: true,
                comment: "Basename without extension",
            },
            extension: {
                type: "text",
                notNull: false,
                comment: "Extension without leading dot",
            },
            message_id: {
                type: "integer",
                references: { schema: "app_public", name: "messages" },
                notNull: true,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "message_previews" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "message_previews" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.message_previews TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "message_previews" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: "true",
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.message_previews TO evg_client`)
    pgm.createIndex(
        { schema: "app_public", name: "message_previews" },
        "message_id"
    )
    pgm.sql(
        `GRANT INSERT(uuid, message_id, filename, extension)
        ON app_public.message_previews
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.message_previews_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "message_previews" },
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
        { schema: "app_public", name: "message_previews" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.message_previews_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, message_id, filename, extension)
        ON app_public.message_previews
        FROM evg_server`
    )
    pgm.dropIndex(
        { schema: "app_public", name: "message_previews" },
        "message_id"
    )
    pgm.sql(`REVOKE SELECT ON app_public.message_previews FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "message_previews" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.message_previews FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "message_previews" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "message_previews" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "message_previews" })
}
