/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "post_recordings" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
            },
            post_id: {
                type: "integer",
                references: { schema: "app_public", name: "posts" },
                notNull: true,
            },
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
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.sql(`
        COMMENT ON CONSTRAINT post_recordings_post_id_fkey on app_public.post_recordings is
        E'@postId postRecordingsByPostId\n@foreignFieldName recordings\nPost that has been recorded.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "post_recordings" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_recordings" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_recordings TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_recordings" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_recordings TO evg_client`)
    pgm.createIndex(
        { schema: "app_public", name: "post_recordings" },
        "user_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_recordings" },
        "post_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_recordings" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(
        `GRANT INSERT(user_id, post_id, filename, extension)
        ON app_public.post_recordings
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_recordings_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_recordings" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_recordings" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_recordings TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_recordings FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_recordings" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_recordings" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_recordings_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(user_id, post_id, filename, extension)
        ON app_public.post_recordings
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "post_recordings" }, "post_id")
    pgm.dropIndex({ schema: "app_public", name: "post_recordings" }, "user_id")
    pgm.dropIndex(
        { schema: "app_public", name: "post_recordings" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_recordings FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_recordings" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_recordings FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_recordings" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_recordings" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "post_recordings" })
}
