/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "user_devices" },
        "delete_server",
        {
            command: "DELETE",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT DELETE ON app_public.user_devices TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE DELETE ON app_public.user_devices FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "user_devices" },
        "delete_server",
        {
            ifExists: false,
        }
    )
}
