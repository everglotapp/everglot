/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.post_games_revealed_by_current_user(post_game_row app_public.post_games)
        returns boolean as $$
          SELECT EXISTS(
            SELECT id
            FROM app_public.post_game_answers pga
            WHERE pga.user_id = app_public.current_user_id()
            AND pga.game_id = post_game_row.id
          )
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.post_games_revealed_by_current_user;`)
}
