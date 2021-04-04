/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.dropView({ schema: "app_public", name: "chat_users" })
}

exports.down = (pgm) => {
    pgm.createView(
        { schema: "app_public", name: "chat_users" },
        {
            checkOption: "CASCADED",
        },
        `SELECT username, uuid, bio, avatar_url
        FROM app_public.users`
    )
}
