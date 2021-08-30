/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createType("prompt_type", ["question", "word"])
    pgm.createTable(
        { schema: "app_public", name: "prompts" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                notNull: true,
                unique: true,
                default: pgm.func("gen_random_uuid()"),
            },
            language_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "languages",
                },
                notNull: true,
            },
            recommended_skill_level_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "language_skill_levels",
                },
                notNull: false,
            },
            type: {
                type: "prompt_type",
                notNull: true,
            },
            content_en: {
                type: "text",
                collation: '"en-US-x-icu"',
                notNull: false,
            },
            content_de: {
                type: "text",
                collation: '"de-DE-x-icu"',
                notNull: false,
            },
            content_zh: {
                type: "text",
                collation: '"zh-Hans-CN-x-icu"',
                notNull: false,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "prompts" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "prompts" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.prompts TO evg_server`)
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.prompts_id_seq TO evg_server`
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
    // pgm.createTrigger(
    //     { schema: "app_public", name: "prompts" },
    //     "has_content_for_given_language",
    //     {
    //         operation: ["INSERT", "UPDATE"],
    //         when: "BEFORE",
    //         function: "prompt_content_in_given_language",
    //         functionParams: ["in p_row app_public.prompts"],
    //         language: "plpgsql",
    //         returns: "text",
    //     },
    //     `DECLARE
    //         v_got text;
    //         v_alpha2 text;
    //       BEGIN
    //         SELECT alpha2
    //           FROM app_public.languages
    //           WHERE id = NEW.language_id
    //           LIMIT 1
    //           INTO v_alpha2;
    //         EXECUTE format('SELECT $1.content_%I'::text, v_alpha2)
    //           USING NEW
    //           INTO v_got;
    //         RETURN v_got;
    //       END`
    // )
}

exports.down = (pgm) => {
    // pgm.dropTrigger(
    //     { schema: "app_public", name: "prompts" },
    //     "has_content_for_given_language"
    // )
    // pgm.dropFunction("prompt_content_in_given_language", [])
    pgm.dropConstraint(
        { schema: "app_public", name: "prompts" },
        "has_content_for_exactly_one_language"
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.prompts_id_seq FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.prompts FROM evg_server`)
    pgm.dropPolicy({ schema: "app_public", name: "prompts" }, "select_server", {
        ifExists: false,
    })
    pgm.alterTable(
        { schema: "app_public", name: "prompts" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({
        schema: "app_public",
        name: "prompts",
    })
    pgm.dropType("prompt_type")
}
