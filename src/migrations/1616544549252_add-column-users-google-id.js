/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            google_id: {
                type: "varchar(21)",
                notNull: false,
            },
        }
    )
    pgm.sql(
        `GRANT UPDATE(username, gender, last_active_at, avatar_url, locale) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(username, email, password_hash, uuid, created_at, google_id, avatar_url, locale) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `GRANT INSERT(username, email, password_hash, uuid, created_at, avatar_url, locale) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT UPDATE(username, gender, last_active_at, avatar_url, locale) ON app_public.users TO evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, ["google_id"])
}
