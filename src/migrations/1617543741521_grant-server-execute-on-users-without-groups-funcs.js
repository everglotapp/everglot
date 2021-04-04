/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `GRANT EXECUTE ON FUNCTION app_public.users_without_learner_group(integer, integer) TO evg_server`
    )
    pgm.sql(
        `GRANT EXECUTE ON FUNCTION app_public.users_without_native_group(integer) TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE EXECUTE ON FUNCTION app_public.users_without_native_group(integer) FROM evg_server`
    )
    pgm.sql(
        `REVOKE EXECUTE ON FUNCTION app_public.users_without_learner_group(integer, integer) FROM evg_server`
    )
}
