/* eslint-disable camelcase */

exports.shorthands = undefined

/* Example:
create function app_public.current_user_id() returns int as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::int;
$$ language sql stable set search_path from current;
*/
const NAME = "current_user_id"
const PARAMS = []
const OPTS = {
    returns: "int",
    language: "sql",
    replace: false,
    behavior: "stable",
}

exports.up = (pgm) => {
    pgm.createFunction(
        "current_user_id",
        PARAMS,
        OPTS,
        `select
            nullif(current_setting('user.id', true), '')::int
    `
    )
}

exports.down = (pgm) => {
    pgm.dropFunction(NAME, PARAMS, {
        ifExists: false,
        casade: false,
    })
}
