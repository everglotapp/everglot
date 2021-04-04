/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `GRANT INSERT(email, gender, password_hash, username, uuid, avatar_url, locale, created_at) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE INSERT(gender) ON app_public.users FROM evg_server`)
}
