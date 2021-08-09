/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "posts" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            author_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: false,
            },
            body: {
                type: "text",
                notNull: true,
            },
            parent_post_id: {
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
        COMMENT ON CONSTRAINT posts_parent_post_id_fkey on app_public.posts is
        E'@parentPostId postsByParentPostId\n@foreignFieldName replies\nPosts replying to this post.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "posts" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy({ schema: "app_public", name: "posts" }, "select_server", {
        command: "SELECT",
        role: "evg_server",
        using: `true`,
    })
    pgm.sql(`GRANT SELECT ON app_public.posts TO evg_server`)
    pgm.createPolicy({ schema: "app_public", name: "posts" }, "select_client", {
        command: "SELECT",
        role: "evg_client",
        using: `true`,
    })
    pgm.sql(`GRANT SELECT ON app_public.posts TO evg_client`)
    pgm.createIndex({ schema: "app_public", name: "posts" }, "author_id")
    pgm.createIndex({ schema: "app_public", name: "posts" }, "parent_post_id")
    pgm.sql(
        `GRANT INSERT(uuid, author_id, body, parent_post_id)
        ON app_public.posts
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.posts_id_seq TO evg_server`
    )
    pgm.createPolicy({ schema: "app_public", name: "posts" }, "insert_server", {
        command: "INSERT",
        role: "evg_server",
        check: `true`,
    })
}

exports.down = (pgm) => {
    pgm.dropPolicy({ schema: "app_public", name: "posts" }, "insert_server", {
        ifExists: false,
    })
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.posts_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, author_id, body, parent_post_id)
        ON app_public.posts
        FROM evg_server`
    )
    pgm.dropIndex({ schema: "app_public", name: "posts" }, "parent_post_id")
    pgm.dropIndex({ schema: "app_public", name: "posts" }, "author_id")
    pgm.sql(`REVOKE SELECT ON app_public.posts FROM evg_client`)
    pgm.dropPolicy({ schema: "app_public", name: "posts" }, "select_client", {
        ifExists: false,
    })
    pgm.sql(`REVOKE SELECT ON app_public.posts FROM evg_server`)
    pgm.dropPolicy({ schema: "app_public", name: "posts" }, "select_server", {
        ifExists: false,
    })
    pgm.alterTable(
        { schema: "app_public", name: "posts" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "posts" })
}
