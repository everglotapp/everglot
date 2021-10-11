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
                notNull: false,
            },
            game_id: {
                type: "integer",
                references: { schema: "app_public", name: "post_games" },
                notNull: false,
            },
            user_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: true,
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
                notNull: false,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.sql(`
        COMMENT ON CONSTRAINT post_game_answers_range_id_fkey on app_public.post_game_answers is
        E'@rangeId answersByRangeId\n@foreignFieldName answers\nRange that was answered.';
    `)
    pgm.sql(`
        COMMENT ON CONSTRAINT post_game_answers_game_id_fkey on app_public.post_game_answers is
        E'@gameId answersByGameId\n@foreignFieldName answerReveals\nGame whose solution the user looked at.';
    `)
    pgm.addConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_exactly_one_value_iff_answered",
        {
            check: `
            (
              (case_option IS NOT NULL)::int +
              (gender_option IS NOT NULL)::int +
              (cloze_answer IS NOT NULL)::int
            ) = (range_id IS NOT NULL)::int
        `,
        }
    )
    pgm.addConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_either_game_or_range",
        {
            check: `
            (
              (game_id IS NOT NULL)::int +
              (range_id IS NOT NULL)::int
            ) = 1
        `,
        }
    )
    pgm.addConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "correct_is_null_iff_user_reveals",
        {
            check: `
            (
                (range_id IS NULL AND correct IS NULL) OR
                (range_id IS NOT NULL AND correct is NOT NULL)
            )
        `,
        }
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_game_answers" },
        ["range_id", "user_id"],
        { unique: true }
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_game_answers" },
        ["game_id", "user_id"],
        { unique: true }
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_game_answers" },
        "range_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_game_answers" },
        "game_id"
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
        `GRANT INSERT(range_id, game_id, user_id, case_option, gender_option, cloze_answer, correct)
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
        `REVOKE INSERT(range_id, game_id, user_id, case_option, gender_option, cloze_answer, correct)
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
    pgm.dropIndex(
        { schema: "app_public", name: "post_game_answers" },
        "game_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "post_game_answers" },
        "range_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "post_game_answers" },
        ["game_id", "user_id"],
        { unique: true }
    )
    pgm.dropIndex(
        { schema: "app_public", name: "post_game_answers" },
        ["range_id", "user_id"],
        { unique: true }
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "correct_is_null_iff_user_reveals"
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_either_game_or_range"
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "post_game_answers" },
        "has_exactly_one_value_iff_answered"
    )
    pgm.dropTable({ schema: "app_public", name: "post_game_answers" })
}
