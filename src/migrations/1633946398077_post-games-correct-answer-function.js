/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.post_games_current_user_can_see_correct_answers(post_game_row app_public.post_games)
      returns boolean as $$
        SELECT (
          EXISTS (
            SELECT id
            FROM app_public.posts p
            WHERE p.id = post_game_row.post_id
            AND p.author_id = app_public.current_user_id()
            LIMIT 1
          )
          OR EXISTS (
            SELECT id
            FROM app_public.post_games_answers_by_current_user(post_game_row)
            LIMIT 1
          )
          OR app_public.post_games_revealed_by_current_user(post_game_row) IS TRUE
        )
      $$ language sql stable;`
    )
    pgm.sql(
        `create function app_public.post_games_correct_answers(post_game_row app_public.post_games)
        returns table(range_uuid uuid, case_option grammatical_case, gender_option grammatical_gender, cloze_answer text) as $$
          SELECT
            pgr.uuid,
            pgr.case_option,
            pgr.gender_option,
            CASE WHEN post_game_row.game_type = 'cloze' THEN
              SUBSTRING(p.body, pgr.start_index + 1, pgr.end_index - pgr.start_index + 1)
            ELSE
              null
            END
          FROM (
            SELECT *
            FROM app_public.post_game_ranges
            WHERE game_id = post_game_row.id
          ) pgr
          INNER JOIN app_public.posts p
          ON post_game_row.post_id = p.id
          WHERE (
            app_public.current_user_id() IS NULL
            OR app_public.post_games_current_user_can_see_correct_answers(post_game_row)
          )
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.post_games_correct_answers;`)
    pgm.sql(
        `drop function app_public.post_games_current_user_can_see_correct_answers;`
    )
}
