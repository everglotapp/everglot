/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "group_user" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: "true",
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.group_user TO evg_server`)

    // pgm.createPolicy({ schema: "app_public", name: "group_user" }, "select_client", {
    //     command: "SELECT",
    //     role: "evg_client",
    //     using: "user_id > 0 AND user_id = app_public.current_user_id()",
    // })
    // pgm.sql(`GRANT SELECT ON app_public.group_user TO evg_client`)
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "group_user" },
        "select_server",
        {
            ifExists: false,
        }
    )
}
