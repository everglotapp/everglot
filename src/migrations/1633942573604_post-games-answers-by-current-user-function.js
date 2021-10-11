/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.post_games_answers_by_current_user(post_game_row app_public.post_games)
        returns setof app_public.post_game_answers as $$
          SELECT pga.*
          FROM app_public.post_game_answers pga
          INNER JOIN (
            SELECT id
            FROM app_public.post_game_ranges pgr
            WHERE game_id = post_game_row.id
          ) pgr
          ON pga.range_id = pgr.id
          WHERE pga.user_id = app_public.current_user_id()
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.post_games_answers_by_current_user;`)
}
