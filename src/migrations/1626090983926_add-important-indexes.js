/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createIndex({ schema: "app_public", name: "group_users" }, "user_id")
    pgm.createIndex({ schema: "app_public", name: "group_users" }, "group_id")
    pgm.createIndex({ schema: "app_public", name: "groups" }, "language_id")
    pgm.createIndex(
        { schema: "app_public", name: "groups" },
        "language_skill_level_id"
    )
    pgm.createIndex({ schema: "app_public", name: "invite_tokens" }, "user_id")
    pgm.createIndex({ schema: "app_public", name: "users" }, "google_id")
}

exports.down = (pgm) => {
    pgm.dropIndex({ schema: "app_public", name: "invite_tokens" }, "user_id")
    pgm.dropIndex(
        { schema: "app_public", name: "groups" },
        "language_skill_level_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "groups" }, "language_id")
    pgm.dropIndex({ schema: "app_public", name: "group_users" }, "group_id")
    pgm.dropIndex({ schema: "app_public", name: "group_users" }, "user_id")
    pgm.dropIndex({ schema: "app_public", name: "users" }, "google_id")
}
