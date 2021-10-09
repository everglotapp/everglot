/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "post_game_answers" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            range_id: {
                type: "integer",
                references: { schema: "app_public", name: "post_game_ranges" },
                notNull: true,
            },
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
                unique: true,
            },
            case_option: {
                type: "grammatical_case",
                notNull: false,
            },
            gender_option: {
                type: "grammatical_gender",
                notNull: false,
            },
            cloze_answer: {
                type: "text",
                notNull: false,
            },
            correct: {
                type: "boolean",
                notNull: true,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.addConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_exactly_one_value",
        {
            check: `
            (
              (case_option IS NOT NULL)::int +
              (gender_option IS NOT NULL)::int +
              (cloze_answer IS NOT NULL)::int
            ) = 1
        `,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_game_answers" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_game_answers TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_game_answers TO evg_client`)
    pgm.sql(
        `GRANT INSERT(range_id, user_id, case_option, gender_option, cloze_answer, correct)
        ON app_public.post_game_answers
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_game_answers_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_game_answers TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_game_answers FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_game_answers_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(range_id, user_id, case_option, gender_option, cloze_answer, correct)
        ON app_public.post_game_answers
        FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_game_answers FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_game_answers FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_answers" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_game_answers" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_exactly_one_value"
    )
    pgm.dropTable({ schema: "app_public", name: "post_game_answers" })
}
