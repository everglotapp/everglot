/* eslint-disable camelcase */

exports.shorthands = undefined

/* Example:
create function app_public.current_user_id() returns int as $$
  select nullif(current_setting('jwt.claims.user_id', true), '')::int;
$$ language sql stable set search_path from current;
*/
const NAME = { schema: "app_public", name: "profile_completed" }
const PARAMS = []
const OPTS = {
    returns: "int",
    language: "sql",
    replace: false,
    behavior: "stable",
}

exports.up = (pgm) => {
    pgm.createFunction(
        NAME,
        PARAMS,
        OPTS,
        `not_implemented
    `
    )
}

exports.down = (pgm) => {
    pgm.dropFunction(NAME, PARAMS, {
        ifExists: false,
        casade: false,
    })
}
