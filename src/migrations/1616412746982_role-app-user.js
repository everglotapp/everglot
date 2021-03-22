/* eslint-disable camelcase */

exports.shorthands = undefined

const NAME = "APP_USER"

exports.up = (pgm) => {
    pgm.createRole(NAME, { bypassrls: false })
}

exports.down = (pgm) => {
    pgm.dropRole(NAME)
}
