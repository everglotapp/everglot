/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createIndex(
        { schema: "app_public", name: "group_users" },
        ["group_id", "user_id"],
        {
            unique: true,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropIndex(
        { schema: "app_public", name: "group_users" },
        ["group_id", "user_id"],
        {
            unique: true,
        }
    )
}
