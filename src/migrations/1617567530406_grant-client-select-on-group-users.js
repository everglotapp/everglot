/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.user_is_in_group(gid int) returns boolean as $$
            select exists(
                select group_id
                from app_public.group_users
                where user_id = app_public.current_user_id()
                and group_id = gid
            ) limit 1

        $$ language sql strict stable security definer;`
    )
    pgm.sql(
        `create function app_public.group_is_global(gid int) returns boolean as $$
            select exists(
                select id
                from app_public.groups
                where id = gid
                and global is true
            ) limit 1

        $$ language sql strict stable security definer;`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "group_users" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `
            (
                user_id = app_public.current_user_id()
            )
            or app_public.user_is_in_group(group_id)
            or app_public.group_is_global(group_id)`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.group_users TO evg_client`)
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "group_users" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`drop function app_public.group_is_global;`)
    pgm.sql(`drop function app_public.user_is_in_group;`)
}
