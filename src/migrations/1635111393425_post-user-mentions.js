/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "post_user_mentions" },
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
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
                comment: "Mentioned user",
            },
            start_index: {
                type: "integer",
                notNull: true,
            },
            end_index: {
                type: "integer",
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
        COMMENT ON CONSTRAINT post_user_mentions_post_id_fkey on app_public.post_user_mentions is
        E'@postId userMentionsByPostId\n@foreignFieldName userMentions\nMentions of users in this post.';
    `)
    pgm.createIndex(
        { schema: "app_public", name: "post_user_mentions" },
        "post_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_user_mentions" },
        "user_id"
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_user_mentions" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_user_mentions TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_user_mentions TO evg_client`)
    pgm.sql(
        `GRANT INSERT(uuid, post_id, user_id, start_index, end_index)
        ON app_public.post_user_mentions
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_user_mentions_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_user_mentions TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_user_mentions FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_user_mentions_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, post_id, user_id, start_index, end_index)
        ON app_public.post_user_mentions
        FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_user_mentions FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_user_mentions FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_user_mentions" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_user_mentions" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropIndex(
        { schema: "app_public", name: "post_user_mentions" },
        "post_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "post_user_mentions" },
        "user_id"
    )
    pgm.dropTable({ schema: "app_public", name: "post_user_mentions" })
}
