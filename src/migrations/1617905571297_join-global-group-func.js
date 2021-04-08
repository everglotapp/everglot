/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.join_global_group(group_uuid uuid)
        returns app_public.group_users as $$
            insert into app_public.group_users(
                user_id,
                group_id,
                user_type
            ) values(
                app_public.current_user_id(),
                (select id
                    from app_public.groups
                    where uuid = group_uuid
                    and global is true),
                    'global'::user_type
            )
            returning *
            $$ language sql strict volatile security definer;`
    )
    pgm.sql(
        `GRANT EXECUTE ON FUNCTION app_public.join_global_group(group_uuid uuid) TO evg_client`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE EXECUTE ON FUNCTION app_public.join_global_group(group_uuid uuid) FROM evg_server`
    )
    pgm.sql(`drop function app_public.join_global_group(group_uuid uuid);`)
}
