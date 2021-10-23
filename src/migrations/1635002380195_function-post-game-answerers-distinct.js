/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`drop function app_public.post_games_answerers;`)
    pgm.sql(
        `create function app_public.post_games_answerers(post_game_row app_public.post_games)
    returns setof app_public.users as $$
      SELECT u.*
      FROM app_public.users u
      INNER JOIN
      (
        SELECT DISTINCT pga.user_id id
        FROM app_public.post_game_answers pga
        WHERE pga.range_id IN (
          SELECT id
          FROM app_public.post_game_ranges pgr
          WHERE pgr.game_id = post_game_row.id
        )
      ) pga_users
      ON u.id = pga_users.id
    $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.post_games_answerers;`)
    pgm.sql(
        `create function app_public.post_games_answerers(post_game_row app_public.post_games)
    returns setof app_public.users as $$
      SELECT u.*
      FROM app_public.users u
      INNER JOIN
      (
        SELECT pga.user_id id
        FROM app_public.post_game_answers pga
        WHERE pga.game_id = post_game_row.id
        OR pga.range_id IN (
          SELECT id
          FROM app_public.post_game_ranges pgr
          WHERE pgr.game_id = post_game_row.id
        )
      ) pga_users
      ON u.id = pga_users.id
    $$ language sql stable;`
    )
}
