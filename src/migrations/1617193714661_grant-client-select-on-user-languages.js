/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`GRANT SELECT ON app_public.user_languages TO evg_client`)
    pgm.createPolicy(
        { schema: "app_public", name: "user_languages" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: "user_id = app_public.current_user_id()",
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "user_languages" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.user_languages FROM evg_client`)
}
