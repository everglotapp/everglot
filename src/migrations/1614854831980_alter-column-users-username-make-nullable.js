/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn("users", "username", {
        type: "varchar(50)",
        notNull: false,
    })
}

exports.down = (pgm) => {
    pgm.alterColumn("users", "username", {
        type: "varchar(50)",
        notNull: true,
    })
}
