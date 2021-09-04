/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
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
                collation: '"pt-PT-x-icu"',
                notNull: true,
            },
            answers: {
                type: "text[]",
                collation: '"pt-PT-x-icu"',
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
            comment: "@name portugueseWouldYouRatherQuestions",
        }
    )
    pgm.alterTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(
        `GRANT SELECT ON app_public.would_you_rather_questions_pt TO evg_server`
    )
    pgm.createIndex(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        "recommended_skill_level_id"
    )
}

exports.down = (pgm) => {
    pgm.dropIndex(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        "recommended_skill_level_id"
    )
    pgm.sql(
        `REVOKE SELECT ON app_public.would_you_rather_questions_pt FROM evg_server`
    )
    pgm.dropPolicy(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        {
            schema: "app_public",
            name: "would_you_rather_questions_pt",
        },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({
        schema: "app_public",
        name: "would_you_rather_questions_pt",
    })
}