/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`GRANT UPDATE(bio) ON app_public.users TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE UPDATE(bio) ON app_public.users FROM evg_server`)
}
