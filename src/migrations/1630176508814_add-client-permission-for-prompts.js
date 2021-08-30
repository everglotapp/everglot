/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`GRANT SELECT ON app_public.prompts TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "prompts" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.prompts TO evg_client`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE SELECT ON app_public.prompts FROM evg_client`)
    pgm.dropPolicy({ schema: "app_public", name: "prompts" }, "select_client", {
        ifExists: false,
    })
}
