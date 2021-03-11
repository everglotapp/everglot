/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn("user_languages", "language_skill_level_id", {
        type: "int",
        references: "language_skill_levels",
        notNull: false,
    })
}

exports.down = (pgm) => {
    pgm.alterColumn("user_languages", "language_skill_level_id", {
        type: "serial",
        references: "language_skill_levels",
        notNull: false,
    })
}
