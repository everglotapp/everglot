/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "language_skill_levels" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "language_skill_levels" },
        "select_client",
        {
            ifExists: false,
        }
    )
}
