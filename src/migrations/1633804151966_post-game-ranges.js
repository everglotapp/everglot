/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createType("grammatical_case", [
        "nominative",
        "genitive",
        "dative",
        "accusative",
        "lative",
        "ablative",
        "vocative",
        "essive",
        "comitative",
    ])
    pgm.createType("grammatical_gender", [
        "masculine",
        "feminine",
        "neutral",
        "masculine_plural",
        "feminine_plural",
        "neutral_plural",
        "masculine_singular",
        "feminine_singular",
        "neutral_singular",
    ])
    pgm.createTable(
        { schema: "app_public", name: "post_game_ranges" },
        {
            id: "id",
            uuid: {
                type: "uuid",
                default: pgm.func("gen_random_uuid()"),
                notNull: true,
                unique: true,
            },
            game_id: {
                type: "integer",
                references: { schema: "app_public", name: "post_games" },
                notNull: true,
            },
            start_index: {
                type: "integer",
                notNull: true,
            },
            end_index: {
                type: "integer",
                notNull: true,
            },
            case_option: {
                type: "grammatical_case",
                notNull: false,
                comment: "Case as chosen by the post creator",
            },
            gender_option: {
                type: "grammatical_gender",
                notNull: false,
                comment: "Gender as chosen by the post creator",
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.sql(`
        COMMENT ON CONSTRAINT post_game_ranges_game_id_fkey on app_public.post_game_ranges is
        E'@gameId rangesByGameId\n@foreignFieldName ranges\nGame that this range was made for.';
    `)
    pgm.addConstraint(
        { schema: "app_public", name: "post_game_ranges" },
        "has_max_one_selected_option",
        {
            check: `
            (
              (case_option IS NOT NULL)::int +
              (gender_option IS NOT NULL)::int
            ) <= 1
        `,
        }
    )
    pgm.createIndex(
        { schema: "app_public", name: "post_game_ranges" },
        "game_id"
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_game_ranges" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_game_ranges TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.post_game_ranges TO evg_client`)
    pgm.sql(
        `GRANT INSERT(uuid, game_id, start_index, end_index, case_option, gender_option)
        ON app_public.post_game_ranges
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.post_game_ranges_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.post_game_ranges TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.post_game_ranges FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.post_game_ranges_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, game_id, start_index, end_index, case_option, gender_option)
        ON app_public.post_game_ranges
        FROM evg_server`
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_game_ranges FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.post_game_ranges FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "post_game_ranges" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "post_game_ranges" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropIndex({ schema: "app_public", name: "post_game_ranges" }, "game_id")
    pgm.dropConstraint(
        { schema: "app_public", name: "post_game_ranges" },
        "has_max_one_selected_option"
    )
    pgm.dropTable({ schema: "app_public", name: "post_game_ranges" })
    pgm.dropType("grammatical_gender")
    pgm.dropType("grammatical_case")
}
