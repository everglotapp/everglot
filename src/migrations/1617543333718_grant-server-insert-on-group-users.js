/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `GRANT INSERT(user_type, user_id, group_id) ON app_public.group_users TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.group_users_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.group_users_id_seq FROM evg_server`
    )
    pgm.sql(`REVOKE INSERT ON app_public.group_users FROM evg_server`)
}
