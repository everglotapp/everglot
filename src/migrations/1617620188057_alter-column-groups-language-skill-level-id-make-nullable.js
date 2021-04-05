/* eslint-disable camelcase */
exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn(
        { schema: "app_public", name: "groups" },
        "language_skill_level_id",
        {
            type: "integer",
            references: { schema: "app_public", name: "language_skill_levels" },
            notNull: false,
        }
    )
}

exports.down = (pgm) => {
    pgm.alterColumn(
        { schema: "app_public", name: "groups" },
        "language_skill_level_id",
        {
            type: "integer",
            references: { schema: "app_public", name: "language_skill_levels" },
            notNull: true,
        }
    )
}
