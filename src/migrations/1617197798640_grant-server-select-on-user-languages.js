/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`GRANT SELECT ON app_public.user_languages TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "user_languages" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: "true",
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "user_languages" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.user_languages FROM evg_server`)
}
