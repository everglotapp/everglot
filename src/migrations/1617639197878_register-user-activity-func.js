/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.register_user_activity(user_id int)
        returns timestamp as $$
            update app_public.users
            set last_active_at = current_timestamp
            where id = user_id
            returning last_active_at
        $$ language sql volatile;`
    )
    pgm.sql(
        `GRANT EXECUTE ON FUNCTION app_public.register_user_activity(user_id int) TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE EXECUTE ON FUNCTION app_public.register_user_activity(user_id int) FROM evg_server`
    )
    pgm.sql(`drop function app_public.register_user_activity(user_id int);`)
}
