/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterTable(
        { schema: "app_public", name: "groups" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "group_users" },
        {
            levelSecurity: "ENABLE",
        }
    )
}

exports.down = (pgm) => {
    pgm.alterTable(
        { schema: "app_public", name: "group_users" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "groups" },
        {
            levelSecurity: "DISABLE",
        }
    )
}
