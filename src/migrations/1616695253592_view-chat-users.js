/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    // This view should filter chat users by the current user's groups.
    pgm.createView(
        { schema: "app_public", name: "chat_users" },
        {
            checkOption: "CASCADED",
        },
        `SELECT username, uuid, bio, avatar_url
        FROM app_public.users`
    )
    pgm.sql(`GRANT SELECT ON app_public.chat_users TO evg_client`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE SELECT ON app_public.chat_users FROM evg_client`)
    pgm.dropView({ schema: "app_public", name: "chat_users" })
}
