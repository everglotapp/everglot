/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.prompts_content(prompt app_public.prompts)
        returns text as $$
          SELECT coalesce(
            prompt.content_en,
            prompt.content_de,
            prompt.content_zh
          )
        $$ language sql stable;`
    )
}

exports.down = (pgm) => {
    pgm.sql(`drop function app_public.prompts_content;`)
}
