/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            question: {
                type: "text",
                collation: '"ko-KR-x-icu"',
                notNull: true,
            },
            answers: {
                type: "text[]",
                collation: '"ko-KR-x-icu"',
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
            comment: "@name koreanWouldYouRatherQuestions",
        }
    )
    pgm.alterTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(
        `GRANT SELECT ON app_public.would_you_rather_questions_ko TO evg_server`
    )
    pgm.createIndex(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        "recommended_skill_level_id"
    )
}

exports.down = (pgm) => {
    pgm.dropIndex(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        "recommended_skill_level_id"
    )
    pgm.sql(
        `REVOKE SELECT ON app_public.would_you_rather_questions_ko FROM evg_server`
    )
    pgm.dropPolicy(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_ko",
        },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({
        schema: "app_public",
        name: "would_you_rather_questions_ko",
    })
}