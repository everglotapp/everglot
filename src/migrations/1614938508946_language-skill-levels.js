/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable("language_skill_levels", {
        id: "id",
        name: "varchar(50)",
    })
}

exports.down = (pgm) => {
    pgm.dropTable("language_skill_levels")
}
