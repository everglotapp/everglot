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
    pgm.db.query(`
        delete from user_languages
        where language_skill_level_id is null
    `)
    pgm.alterColumn("user_languages", "language_skill_level_id", {
        type: "int",
        references: "language_skill_levels",
        notNull: true,
    })
}
