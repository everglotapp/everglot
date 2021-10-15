/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            reset_password_token: {
                type: "text",
                notNull: false,
                unique: true,
            },
            reset_password_token_created_at: {
                type: "timestamp with time zone",
                notNull: false,
                default: null,
            },
        }
    )
    pgm.sql(
        `GRANT INSERT(reset_password_token, reset_password_token_created_at) ON app_public.users TO evg_server`
    )
    pgm.sql(
        `GRANT UPDATE(reset_password_token, reset_password_token_created_at, password_hash) ON app_public.users TO evg_server`
    )
    pgm.createIndex(
        { schema: "app_public", name: "users" },
        "reset_password_token",
        {
            unique: true,
        }
    )
    pgm.addConstraint(
        { schema: "app_public", name: "users" },
        "reset_password_token_is_null_iff_reset_password_token_created_at_is_null",
        {
            check: `
            (
                (reset_password_token IS NULL AND reset_password_token_created_at IS NULL) OR
                (reset_password_token IS NOT NULL AND reset_password_token_created_at is NOT NULL)
            )
        `,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropConstraint(
        { schema: "app_public", name: "users" },
        "reset_password_token_is_null_iff_reset_password_token_created_at_is_null"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "users" },
        "reset_password_token",
        {
            unique: true,
        }
    )
    pgm.sql(
        `REVOKE UPDATE(reset_password_token, reset_password_token_created_at, password_hash) ON app_public.users FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(reset_password_token, reset_password_token_created_at) ON app_public.users FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, [
        "reset_password_token",
        "reset_password_token_created_at",
    ])
}
