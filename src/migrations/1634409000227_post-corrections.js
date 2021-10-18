/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "post_corrections" },
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
                comment: "Author of the correction",
            },
            body: {
                type: "text",
                notNull: true,
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
        COMMENT ON CONSTRAINT post_corrections_post_id_fkey on app_public.post_corrections is
        E'@postId correctionsByPostId\n@foreignFieldName corrections\nCorrections that users have given for this post.';
    `)
    pgm.createIndex(
        { schema: "app_public", name: "post_corrections" },
        "post_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_corrections" },
        "user_id"
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_corrections" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_corrections" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_corrections TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_corrections" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_corrections TO evg_client`)
    pgm.sql(
        `GRANT INSERT(uuid, post_id, user_id, start_index, end_index, body)
        ON app_public.post_corrections
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_corrections_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_corrections" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_corrections" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_corrections TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_corrections FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_corrections" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_corrections" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_corrections_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, post_id, user_id, start_index, end_index, body)
        ON app_public.post_corrections
        FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_corrections FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_corrections" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_corrections FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_corrections" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_corrections" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropIndex({ schema: "app_public", name: "post_corrections" }, "post_id")
    pgm.dropIndex({ schema: "app_public", name: "post_corrections" }, "user_id")
    pgm.dropTable({ schema: "app_public", name: "post_corrections" })
}
