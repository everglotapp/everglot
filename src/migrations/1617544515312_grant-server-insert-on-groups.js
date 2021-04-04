/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `GRANT INSERT(global, group_name, language_id, language_skill_level_id) ON app_public.groups TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.groups_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.groups_id_seq FROM evg_server`
    )
    pgm.sql(`REVOKE INSERT ON app_public.groups FROM evg_server`)
}
