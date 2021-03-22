/* eslint-disable camelcase */

exports.shorthands = undefined

const NAME = "evg_server"

exports.up = (pgm) => {
    pgm.createRole(NAME, { bypassrls: false })
}

exports.down = (pgm) => {
    pgm.dropRole(NAME)
}
