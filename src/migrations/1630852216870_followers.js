/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "user_followers" },
        {
            id: "id",
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
            },
            follower_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
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
        COMMENT ON CONSTRAINT user_followers_follower_id_fkey on app_public.user_followers is
        E'@followerId userFollowersByFollowerId\n@foreignFieldName followedUsers\nUser that is following the other user.';
    `)
    pgm.sql(`
        COMMENT ON CONSTRAINT user_followers_user_id_fkey on app_public.user_followers is
        E'@userId userFollowersByUserId\n@foreignFieldName followers\nUser that is being followed by the follower.';
    `)
    pgm.alterTable(
        { schema: "app_public", name: "user_followers" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_followers" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.user_followers TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "user_followers" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.user_followers TO evg_client`)
    pgm.createIndex({ schema: "app_public", name: "user_followers" }, "user_id")
    pgm.createIndex(
        { schema: "app_public", name: "user_followers" },
        "follower_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "user_followers" },
        ["follower_id", "user_id"],
        { unique: true }
    )
    pgm.sql(
        `GRANT INSERT(user_id, follower_id)
        ON app_public.user_followers
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.user_followers_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_followers" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_followers" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.user_followers TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.user_followers FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_followers" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_followers" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.user_followers_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(user_id, follower_id)
        ON app_public.user_followers
        FROM evg_server`
    )
    pgm.dropIndex(
        { schema: "app_public", name: "user_followers" },
        "follower_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "user_followers" }, "user_id")
    pgm.dropIndex(
        { schema: "app_public", name: "user_followers" },
        ["follower_id", "user_id"],
        { unique: true }
    )
    pgm.sql(`REVOKE SELECT ON app_public.user_followers FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_followers" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.user_followers FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_followers" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "user_followers" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "user_followers" })
}
