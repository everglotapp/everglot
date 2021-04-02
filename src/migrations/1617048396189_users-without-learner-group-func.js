/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.users_without_learner_group(lid int, lsklid int)
        returns setof app_public.users as $$
        select * from app_public.users where id in (
            select u.id from app_public.user_languages ul
            left join app_public.users u
            on ul.user_id = u.id
            left join app_public.languages l
            on ul.language_id = l.id
            left join app_public.language_skill_levels ll
            on ul.language_skill_level_id = ll.id
            full join (
                select gu.*
                from app_public.group_user gu
                inner join app_public.groups g
                on g.language_id = lid
                and g.id = gu.group_id
            ) gu
            on gu.user_id = u.id
            where gu.id is null and
                  native = false and
                  language_id = lid and
                  language_skill_level_id = lsklid
            order by u.created_at asc)
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.users_without_learner_group;`)
}
