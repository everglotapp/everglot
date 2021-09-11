/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "user_preferences" },
        {
            id: "id",
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
                unique: true,
            },
            feed_language_id: {
                type: "integer",
                references: { schema: "app_public", name: "languages" },
                notNull: true,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.sql(`
        COMMENT ON CONSTRAINT user_preferences_user_id_fkey on app_public.user_preferences is
        E'@userId userPreferenceByUserId\n@foreignFieldName preference\nUser that has these preferences.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "user_preferences" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_preferences" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.user_preferences TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "user_preferences" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `user_id = app_public.current_user_id()`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.user_preferences TO evg_client`)
    pgm.createIndex(
        { schema: "app_public", name: "user_preferences" },
        "user_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "user_preferences" },
        "feed_language_id"
    )
    pgm.sql(
        `GRANT INSERT(user_id, feed_language_id)
        ON app_public.user_preferences
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.user_preferences_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_preferences" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_preferences" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.user_preferences TO evg_server`)

    pgm.createPolicy(
        { schema: "app_public", name: "user_preferences" },
        "update_server",
        {
            command: "UPDATE",
            role: "evg_server",
            check: `true`,
            using: `true`,
        }
    )
    pgm.sql(
        `GRANT UPDATE(user_id, feed_language_id)
      ON app_public.user_preferences
      TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE UPDATE(user_id, feed_language_id) ON app_public.user_preferences FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_preferences" },
        "update_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE DELETE ON app_public.user_preferences FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_preferences" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_preferences" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.user_preferences_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(user_id, feed_language_id)
        ON app_public.user_preferences
        FROM evg_server`
    )
    pgm.dropIndex(
        { schema: "app_public", name: "user_preferences" },
        "feed_language_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "user_preferences" }, "user_id")
    pgm.sql(`REVOKE SELECT ON app_public.user_preferences FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_preferences" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.user_preferences FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_preferences" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "user_preferences" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "user_preferences" })
}
