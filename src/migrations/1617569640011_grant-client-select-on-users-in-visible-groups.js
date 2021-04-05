/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy({ schema: "app_public", name: "users" }, "select_client", {
        command: "SELECT",
        role: "evg_client",
        using: `(
                id = app_public.current_user_id()
            ) or id in (
                select user_id
                from app_public.group_users
            )`,
    })
    pgm.sql(`GRANT SELECT ON app_public.users TO evg_client`)
}

exports.down = (pgm) => {
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "select_client", {
        ifExists: false,
    })
}
