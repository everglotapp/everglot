/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "words_fr" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            word: {
                type: "text",
                collation: '"fr-FR-x-icu"',
                notNull: true,
            },
            frequency: {
                type: "float",
                notNull: true,
                comment: "Ranges from 0 to 1 (higher is more frequent)",
            },
            length: {
                type: "integer",
                expressionGenerated: "char_length(word)",
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
            comment: "@name frenchWords",
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "words_fr" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "words_fr" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.words_fr TO evg_server`)
    pgm.createIndex(
        {
            schema: "app_public",
            name: "words_fr",
        },
        "recommended_skill_level_id"
    )
}

exports.down = (pgm) => {
    pgm.dropIndex(
        {
            schema: "app_public",
            name: "words_fr",
        },
        "recommended_skill_level_id"
    )
    pgm.sql(`REVOKE SELECT ON app_public.words_fr FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "words_fr" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "words_fr" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropTable({ schema: "app_public", name: "words_fr" })
}