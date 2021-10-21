/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.feed_posts(locale text)
    returns setof app_public.posts as $$
      SELECT p.*
      FROM app_public.posts p
      INNER JOIN (
        SELECT id
        FROM app_public.languages l
        WHERE l.alpha2 = LOWER(locale)
        LIMIT 1
      ) l
      ON p.language_id = l.id
      WHERE p.parent_post_id IS NULL
      ORDER BY p.created_at DESC
      LIMIT 16
    $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.feed_posts;`)
}
