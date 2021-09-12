/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.users_followed_by_current_user(user_row app_public.users)
        returns boolean as $$
          SELECT EXISTS(
            SELECT id
            FROM app_public.user_followers
            WHERE follower_id = app_public.current_user_id()
            AND user_id = user_row.id
          )
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.users_followed_by_current_user;`)
}
