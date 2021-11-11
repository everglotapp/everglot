/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "user_devices" },
        {
            updated_at: {
                type: "timestamp with time zone",
                notNull: false,
            },
        }
    )
    pgm.sql(`UPDATE app_public.user_devices SET updated_at = created_at`)
    pgm.alterColumn(
        { schema: "app_public", name: "user_devices" },
        "updated_at",
        {
            type: "timestamp with time zone",
            notNull: true,
            default: pgm.func("current_timestamp"),
        }
    )
    pgm.sql(`GRANT INSERT(updated_at) ON app_public.user_devices TO evg_server`)
    pgm.sql(
        `GRANT UPDATE(updated_at, fcm_token, user_id) ON app_public.user_devices TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "user_devices" },
        "update_server",
        {
            command: "UPDATE",
            role: "evg_server",
            check: "true",
            using: "true",
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "user_devices" },
        "update_server",
        {
            ifExists: true,
        }
    )
    pgm.sql(
        `REVOKE UPDATE(updated_at, fcm_token, user_id) ON app_public.user_devices FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(updated_at) ON app_public.user_devices FROM evg_server`
    )
    pgm.dropColumns({ schema: "app_public", name: "user_devices" }, [
        "updated_at",
    ])
}
