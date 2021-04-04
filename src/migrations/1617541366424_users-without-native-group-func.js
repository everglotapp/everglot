/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.users_without_native_group(lid int)
        returns setof app_public.users as $$
        select * from app_public.users where id in (
            select u.id from app_public.user_languages ul
            left join app_public.users u
            on ul.user_id = u.id
            left join app_public.languages l
            on ul.language_id = l.id
            full join (
                select gu.*
                from app_public.group_users gu
                inner join app_public.groups g
                on g.language_id = lid
                and g.id = gu.group_id
            ) gu
            on gu.user_id = u.id
            where gu.id is null and
                  native = true and
                  language_id = lid
            order by u.created_at asc)
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.users_without_native_group;`)
}
