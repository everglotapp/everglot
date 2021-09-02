/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "prompts" },
        {
            content_es: {
                type: "text",
                collation: '"es-ES-x-icu"',
                notNull: false,
            },
            content_fr: {
                type: "text",
                collation: '"fr-FR-x-icu"',
                notNull: false,
            },
            content_pt: {
                type: "text",
                collation: '"pt-PT-x-icu"',
                notNull: false,
            },
            content_ru: {
                type: "text",
                collation: '"ru-RU-x-icu"',
                notNull: false,
            },
            content_ja: {
                type: "text",
                collation: '"ja-JP-x-icu"',
                notNull: false,
            },
            content_ko: {
                type: "text",
                collation: '"ko-KR-x-icu"',
                notNull: false,
            },
            content_it: {
                type: "text",
                collation: '"it-IT-x-icu"',
                notNull: false,
            },
        }
    )
    pgm.sql(
        `GRANT INSERT(content_es, content_fr, content_pt, content_ru, content_ja, content_ko, content_it) ON app_public.prompts TO evg_server`
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "prompts" },
        "has_content_for_exactly_one_language"
    )

    pgm.addConstraint(
        { schema: "app_public", name: "prompts" },
        "has_content_for_exactly_one_language",
        {
            check: `(
          (content_en IS NOT NULL)::int +
          (content_de IS NOT NULL)::int +
          (content_zh IS NOT NULL)::int +
          (content_it IS NOT NULL)::int +
          (content_fr IS NOT NULL)::int +
          (content_pt IS NOT NULL)::int +
          (content_ko IS NOT NULL)::int +
          (content_ja IS NOT NULL)::int +
          (content_ru IS NOT NULL)::int +
          (content_es IS NOT NULL)::int
        ) = 1`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropConstraint(
        { schema: "app_public", name: "prompts" },
        "has_content_for_exactly_one_language"
    )

    pgm.addConstraint(
        { schema: "app_public", name: "prompts" },
        "has_content_for_exactly_one_language",
        {
            check: `(
        (content_en IS NOT NULL)::int +
        (content_de IS NOT NULL)::int +
        (content_zh IS NOT NULL)::int
      ) = 1`,
        }
    )
    pgm.sql(
        `REVOKE INSERT(content_es, content_fr, content_pt, content_ru, content_ja, content_ko, content_it) ON app_public.prompts FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "prompts" }, [
        "content_es",
        "content_fr",
        "content_pt",
        "content_ru",
        "content_ja",
        "content_ko",
        "content_it",
    ])
}
