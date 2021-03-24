/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "password_hash", {
        type: "varchar(60)",
        notNull: false,
    })
}

exports.down = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "password_hash", {
        type: "varchar(60)",
        notNull: true,
    })
}
