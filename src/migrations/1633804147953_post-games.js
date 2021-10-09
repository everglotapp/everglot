/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createType("post_game_type", ["guess_case", "guess_gender", "cloze"])
    pgm.createTable(
        { schema: "app_public", name: "post_games" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            post_id: {
                type: "integer",
                references: { schema: "app_public", name: "posts" },
                notNull: true,
            },
            game_type: {
                type: "post_game_type",
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
        COMMENT ON CONSTRAINT post_games_post_id_fkey on app_public.post_games is
        E'@postId postGamesByPostId\n@foreignFieldName games\nPost that this game is based on.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "post_games" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_games" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_games TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_games" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_games TO evg_client`)
    pgm.createIndex({ schema: "app_public", name: "post_games" }, "user_id")
    pgm.createIndex({ schema: "app_public", name: "post_games" }, "post_id")
    pgm.createIndex(
        { schema: "app_public", name: "post_games" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(
        `GRANT INSERT(user_id, post_id, game_type)
        ON app_public.post_games
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_games_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_games" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_games" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_games TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_games FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_games" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_games" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_games_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(user_id, post_id, game_type)
        ON app_public.post_games
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "post_games" }, "post_id")
    pgm.dropIndex({ schema: "app_public", name: "post_games" }, "user_id")
    pgm.dropIndex(
        { schema: "app_public", name: "post_games" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_games FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_games" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_games FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_games" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_games" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "post_games" })
    pgm.dropType("post_game_type")
}
