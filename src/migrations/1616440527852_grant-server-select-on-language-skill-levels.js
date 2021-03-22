/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "language_skill_levels" },
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
        { schema: "app_public", name: "language_skill_levels" },
        "select_server",
        {
            ifExists: false,
        }
    )
}
