/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createPolicy(
        { schema: "app_public", name: "groups" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `
            (global is true) or (
            id in (
                select group_id
                from app_public.group_users
            ))`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.groups TO evg_client`)
}

exports.down = (pgm) => {
    pgm.dropPolicy({ schema: "app_public", name: "groups" }, "select_client", {
        ifExists: false,
    })
}
