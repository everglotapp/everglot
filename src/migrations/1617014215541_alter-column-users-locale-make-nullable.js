/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "locale", {
        type: "integer",
        references: { schema: "app_public", name: "languages" },
        notNull: false,
    })
}

exports.down = (pgm) => {
    pgm.db.query(`
        delete from app_public.users
        where locale is null
    `)
    pgm.alterColumn({ schema: "app_public", name: "users" }, "locale", {
        type: "integer",
        references: { schema: "app_public", name: "languages" },
        notNull: true,
    })
}
