/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "group_users" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.group_users TO evg_server`)
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "group_users" },
        "select_server",
        {
            ifExists: false,
        }
    )
}
