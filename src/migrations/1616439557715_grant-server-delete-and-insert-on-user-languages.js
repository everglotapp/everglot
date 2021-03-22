/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "user_languages" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: "true",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_languages" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(
        `GRANT INSERT(user_id, language_id, language_skill_level_id, native)
        ON app_public.user_languages TO evg_server`
    )
    pgm.sql(`GRANT DELETE ON app_public.user_languages TO evg_server`)
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.user_languages_id_seq TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.user_languages_id_seq FROM evg_server`
    )
    pgm.sql(`REVOKE DELETE ON app_public.user_languages FROM evg_server`)
    pgm.sql(
        `REVOKE INSERT(user_id, language_id, language_skill_level_id, native)
        ON app_public.user_languages FROM evg_server`
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_languages" },
        "delete_server",
        {
            ifExists: false,
        }
    )
    pgm.dropPolicy(
        { schema: "app_public", name: "user_languages" },
        "insert_server",
        {
            ifExists: false,
        }
    )
}
