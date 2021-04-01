/* eslint-disable camelcase */

exports.shorthands = undefined

/* Example:
create function app_public.users_without_groups()
returns setof app_public.users as $$

$$ language sql stable;
*/
const NAME = { schema: "app_public", name:"users_without_groups" }
const PARAMS = []
const OPTS = {
    returns: "setof app_public.users",
    language: "sql",
    replace: false,
    behavior: "stable",
}

exports.up = (pgm) => {
    pgm.createFunction(
        NAME,
        PARAMS,
        OPTS,
        `select * from app_public.users where id in (
            select
                u.id
            from app_public.group_user gu
            full join app_public.users u
                on gu.user_id = u.id
            where gu.id is null)
    `
    )
}

exports.down = (pgm) => {
    pgm.dropFunction(NAME, PARAMS, {
        ifExists: false,
        casade: false,
    })
}
