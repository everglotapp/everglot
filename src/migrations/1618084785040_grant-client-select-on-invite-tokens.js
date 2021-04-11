/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `
            (
                user_id = app_public.current_user_id()
            )`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.invite_tokens TO evg_client`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE SELECT ON app_public.invite_tokens FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "invite_tokens" },
        "select_client",
        {
            ifExists: false,
        }
    )
}
