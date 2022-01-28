/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = async (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            email_confirm_token: {
                type: "text",
                notNull: false,
                unique: true,
            },
            email_confirm_token_created_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: null,
            },
            email_confirmed_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: null,
            },
        }
    )
    pgm.sql(
        `GRANT UPDATE(email, unconfirmed_email, email_confirmed_at, email_confirm_token, email_confirm_token_created_at) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(email_confirmed_at, email_confirm_token, email_confirm_token_created_at) ON app_public.users TO evg_server`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE INSERT(email_confirmed_at, email_confirm_token, email_confirm_token_created_at) ON app_public.users FROM evg_server`
    )
    pgm.sql(
        `REVOKE UPDATE(email, unconfirmed_email, email_confirmed_at, email_confirm_token, email_confirm_token_created_at) ON app_public.users FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, [
        "email_confirmed_at",
        "email_confirm_token_created_at",
        "email_confirm_token",
    ])
}
