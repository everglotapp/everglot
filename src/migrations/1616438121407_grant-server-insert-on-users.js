/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy({ schema: "app_public", name: "users" }, "insert_server", {
        command: "INSERT",
        role: "evg_server",
        check: "true",
    })
    pgm.sql(
        `GRANT INSERT(email, password_hash, uuid, created_at) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.users_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.users_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(email, password_hash, uuid, created_at) ON app_public.users FROM evg_server`
    )
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "insert_server", {
        ifExists: false,
    })
}
