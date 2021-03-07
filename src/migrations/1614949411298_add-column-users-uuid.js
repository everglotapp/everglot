/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query("TRUNCATE TABLE users, user_languages")
    pgm.addColumns("users", {
        uuid: { type: "uuid", notNull: true, unique: true },
    })
}

exports.down = (pgm) => {
    pgm.dropColumns("users", ["uuid"])
}
