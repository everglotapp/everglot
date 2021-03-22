/* eslint-disable camelcase */

exports.shorthands = undefined

const NAME = "APP_SERVER"

exports.up = (pgm) => {
    pgm.createRole(NAME, { bypassrls: true })
}

exports.down = (pgm) => {
    pgm.dropRole(NAME)
}
