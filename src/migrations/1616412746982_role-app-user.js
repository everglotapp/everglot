/* eslint-disable camelcase */

exports.shorthands = undefined

const NAME = "evg_client"

exports.up = (pgm) => {
    pgm.createRole(NAME, { bypassrls: false })
}

exports.down = (pgm) => {
    pgm.db.query(`
        drop owned by ${NAME}
    `)
    pgm.dropRole(NAME)
}
