/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = async (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            email_notifications_enabled: {
                type: "boolean",
                notNull: true,
                default: true,
            },
            email_unsubscribe_token: {
                type: "text",
                notNull: false,
                unique: true,
            },
        }
    )
    pgm.sql(
        `GRANT UPDATE(email_notifications_enabled, email_unsubscribe_token) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(email_notifications_enabled, email_unsubscribe_token) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE INSERT(email_notifications_enabled, email_unsubscribe_token) ON app_public.users FROM evg_server`
    )
    pgm.sql(
        `REVOKE UPDATE(email_notifications_enabled, email_unsubscribe_token) ON app_public.users FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, [
        "email_notifications_enabled",
        "email_unsubscribe_token",
    ])
}
