/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            signed_up_with_token_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "invite_tokens",
                },
                notNull: false,
            },
        }
    )
    pgm.sql(
        `UPDATE app_public.users u
        SET signed_up_with_token_id = (
            select id
            from app_public.invite_tokens
            where user_id = u.id
        )
        `
    )
    pgm.sql(
        `GRANT INSERT(signed_up_with_token_id) ON app_public.users TO evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "invite_tokens" }, [
        "signed_up_with_token",
    ])
}

exports.down = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "invite_tokens" },
        {
            signed_up_with_token: {
                type: "string",
                notNull: false,
                default: "",
            },
        }
    )
    pgm.sql(
        `UPDATE app_public.invite_tokens t
        SET signed_up_with_token = (
            select invite_token
            from app_public.invite_tokens
            where id = (
                select signed_up_with_token_id
                from app_public.users
                where id = t.user_id
            )
        )
        `
    )
    pgm.sql(
        `REVOKE INSERT(signed_up_with_token_id) ON app_public.users FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "users" }, [
        "signed_up_with_token_id",
    ])
}
