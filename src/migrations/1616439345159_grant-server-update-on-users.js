/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy({ schema: "app_public", name: "users" }, "update_server", {
        command: "UPDATE",
        role: "evg_server",
        check: "true",
    })
    pgm.sql(
        `GRANT UPDATE(username, gender, last_active_at) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE UPDATE(username, gender, last_active_at) ON app_public.users FROM evg_server`
    )
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "update_server", {
        ifExists: false,
    })
}
