/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    // we should not have real users yet, so just remove all to avoid null error
    pgm.db.query("TRUNCATE TABLE users")
    pgm.addColumns("users", {
        password_hash: { type: "varchar(60)", notNull: true },
    })
}

exports.down = (pgm) => {
    pgm.dropColumns("users", ["password_hash"])
}
