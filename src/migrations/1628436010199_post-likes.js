/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "post_likes" },
        {
            id: "id",
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: false,
            },
            post_id: {
                type: "integer",
                references: { schema: "app_public", name: "posts" },
                notNull: false,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.sql(`
        COMMENT ON CONSTRAINT post_likes_post_id_fkey on app_public.post_likes is
        E'@postId postLikessByPostId\n@foreignFieldName likes\nPost that is being liked.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "post_likes" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_likes" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_likes TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_likes" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_likes TO evg_client`)
    pgm.createIndex({ schema: "app_public", name: "post_likes" }, "user_id")
    pgm.createIndex({ schema: "app_public", name: "post_likes" }, "post_id")
    pgm.createIndex(
        { schema: "app_public", name: "post_likes" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(
        `GRANT INSERT(user_id, post_id)
        ON app_public.post_likes
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_likes_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_likes" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_likes" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_likes TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_likes FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_likes" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_likes" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_likes_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(user_id, post_id)
        ON app_public.post_likes
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "post_likes" }, "post_id")
    pgm.dropIndex({ schema: "app_public", name: "post_likes" }, "user_id")
    pgm.dropIndex(
        { schema: "app_public", name: "post_likes" },
        ["post_id", "user_id"],
        { unique: true }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_likes FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_likes" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_likes FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_likes" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_likes" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "post_likes" })
}
