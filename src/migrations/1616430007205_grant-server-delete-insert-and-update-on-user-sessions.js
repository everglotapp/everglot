/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "user_sessions" },
        "update_server",
        {
            command: "UPDATE",
            role: "evg_server",
            check: "true",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_sessions" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: "true",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_sessions" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(
        `GRANT INSERT(sid, sess, expire) ON app_public.user_sessions TO evg_server`
    )
    pgm.sql(
        `GRANT UPDATE(sess, expire) ON app_public.user_sessions TO evg_server`
    )
    pgm.sql(`GRANT DELETE ON app_public.user_sessions TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.user_sessions FROM evg_server`)
    pgm.sql(
        `REVOKE UPDATE(sess, expire) ON app_public.user_sessions FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(sid, sess, expire) ON app_public.user_sessions FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_sessions" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_sessions" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_sessions" },
        "update_server",
        {
            ifExists: false,
        }
    )
}
