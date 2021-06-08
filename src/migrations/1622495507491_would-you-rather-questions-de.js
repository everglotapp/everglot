/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        {
            id: "id",
            uuid: { type: "uuid", notNull: true, unique: true },
            question: {
                type: "text",
                collation: '"de-DE-x-icu"',
                notNull: true,
            },
            answers: {
                type: "text[]",
                collation: '"de-DE-x-icu"',
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
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        },
        {
            comment: "@name germanWouldYouRatherQuestions",
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(
        `GRANT SELECT ON app_public.would_you_rather_questions_de TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE SELECT ON app_public.would_you_rather_questions_de FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({
        schema: "app_public",
        name: "would_you_rather_questions_de",
    })
}