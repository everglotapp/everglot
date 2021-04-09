/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "password_hash", {
        type: "varchar(60)",
        notNull: false,
    })
}

exports.down = (pgm) => {
    pgm.db.query(`
        truncate table app_public.user_languages
    `)
    pgm.db.query(`
        delete from app_public.users
        where password_hash is null
    `)
    pgm.alterColumn({ schema: "app_public", name: "users" }, "password_hash", {
        type: "varchar(60)",
        notNull: true,
    })
}
