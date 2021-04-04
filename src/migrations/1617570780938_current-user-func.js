/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.current_user()
        returns app_public.users as $$
            select * from app_public.users
            where id = app_public.current_user_id()
            limit 1
        $$ language sql stable;`
    )
    pgm.sql(`GRANT EXECUTE ON FUNCTION app_public.current_user TO evg_client`)
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE EXECUTE ON FUNCTION app_public.current_user FROM evg_client`
    )
    pgm.sql(`drop function app_public.current_user;`)
}
