/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.dropFunction("current_user_id", [], {
        ifExists: false,
        casade: false,
    })
    pgm.createSchema("app_public", {
        ifNotExists: false,
        authorization: "evg_server",
    })
    pgm.createFunction(
        { schema: "app_public", name: "current_user_id" },
        [],
        {
            returns: "int",
            language: "sql",
            replace: false,
            behavior: "stable",
        },
        `select
          nullif(current_setting('user.id', true), '')::int
    `
    )
    pgm.sql(`ALTER TABLE public.languages SET SCHEMA app_public`)
    pgm.alterTable(
        { schema: "app_public", name: "languages" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.sql(`ALTER TABLE public.language_skill_levels SET SCHEMA app_public`)
    pgm.alterTable(
        { schema: "app_public", name: "language_skill_levels" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.sql(`ALTER TABLE public.user_languages SET SCHEMA app_public`)
    pgm.alterTable(
        { schema: "app_public", name: "user_languages" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.sql(`ALTER TABLE public.user_sessions SET SCHEMA app_public`)
    pgm.alterTable(
        { schema: "app_public", name: "user_sessions" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.sql(`ALTER TABLE public.users SET SCHEMA app_public`)
    pgm.alterTable(
        { schema: "app_public", name: "users" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.sql(`GRANT SELECT ON ALL TABLES IN SCHEMA app_public TO evg_server`)
    pgm.sql(`GRANT USAGE ON SCHEMA app_public TO evg_client`)
    pgm.sql(`GRANT SELECT ON ALL TABLES IN SCHEMA app_public TO evg_client`)
    pgm.createPolicy(
        { schema: "app_public", name: "languages" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: true,
        }
    )
    pgm.createPolicy({ schema: "app_public", name: "users" }, "select_client", {
        command: "SELECT",
        role: "evg_client",
        using: "id > 0 AND id = app_public.current_user_id()",
    })
}

exports.down = (pgm) => {
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "select_client", {
        ifExists: false,
    })
    pgm.dropPolicy(
        { schema: "app_public", name: "languages" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON ALL TABLES IN SCHEMA app_public FROM evg_client`)
    pgm.sql(`REVOKE USAGE ON SCHEMA app_public FROM evg_client`)
    pgm.sql(`REVOKE SELECT ON ALL TABLES IN SCHEMA app_public FROM evg_server`)
    pgm.alterTable(
        { schema: "app_public", name: "users" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.sql(`ALTER TABLE app_public.users SET SCHEMA public`)
    pgm.alterTable(
        { schema: "app_public", name: "user_sessions" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.sql(`ALTER TABLE app_public.user_sessions SET SCHEMA public`)
    pgm.alterTable(
        { schema: "app_public", name: "user_languages" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.sql(`ALTER TABLE app_public.user_languages SET SCHEMA public`)
    pgm.alterTable(
        { schema: "app_public", name: "language_skill_levels" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.sql(`ALTER TABLE app_public.language_skill_levels SET SCHEMA public`)
    pgm.alterTable(
        { schema: "app_public", name: "languages" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.sql(`ALTER TABLE app_public.languages SET SCHEMA public`)
    pgm.dropFunction({ schema: "app_public", name: "current_user_id" }, [], {
        ifExists: false,
        casade: false,
    })
    pgm.dropSchema("app_public", {
        ifExists: false,
    })
    pgm.createFunction(
        "current_user_id",
        [],
        {
            returns: "int",
            language: "sql",
            replace: false,
            behavior: "stable",
        },
        `select
          nullif(current_setting('user.id', true), '')::int
    `
    )
}
