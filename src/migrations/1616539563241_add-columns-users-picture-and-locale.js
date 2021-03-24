/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            avatar_url: {
                type: "text",
                notNull: false,
            },
            locale: {
                type: "serial",
                references: { schema: "app_public", name: "languages" },
                notNull: false,
            },
        }
    )
    pgm.sql(
        `GRANT UPDATE(username, gender, last_active_at, avatar_url, locale) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(username, email, password_hash, uuid, created_at, avatar_url, locale) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `GRANT INSERT(email, password_hash, uuid, created_at) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT UPDATE(username, gender, last_active_at) ON app_public.users TO evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, [
        "avatar_url",
        "locale",
    ])
}
