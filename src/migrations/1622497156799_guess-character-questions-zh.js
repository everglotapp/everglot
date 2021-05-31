/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "guess_character_questions_zh" },
        {
            id: "id",
            uuid: { type: "uuid", notNull: true, unique: true },
            character: {
                type: "text",
                collation: '"zh-Hans-CN-x-icu"',
                notNull: true,
            },
            hint: {
                type: "text",
                notNull: true,
                collation: '"zh-Hans-CN-x-icu"',
            },
            recommended_skill_level_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "language_skill_levels",
                },
                notNull: false,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        },
        {
            comment: "@name chineseGuessCharacterQuestions",
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "guess_character_questions_zh" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(
        `GRANT SELECT ON app_public.guess_character_questions_zh TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE SELECT ON app_public.guess_character_questions_zh FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "guess_character_questions_zh" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({
        schema: "app_public",
        name: "guess_character_questions_zh",
    })
}
