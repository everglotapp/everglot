/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createType("user_type", ["learner", "native", "global"])
    pgm.createTable(
        { schema: "app_public", name: "group_users" },
        {
            id: "id",
            user_id: {
                type: "serial",
                references: { schema: "app_public", name: "users" },
                notNull: true,
            },
            group_id: {
                type: "serial",
                references: { schema: "app_public", name: "groups" },
                notNull: true,
            },
            user_type: {
                type: "user_type",
                notNull: true,
            },
            joined_on: {
                type: "timestamp",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
            last_active: {
                type: "timestamp",
                notNull: false,
            },
        }
    )
}

exports.down = (pgm) => {
    pgm.dropTable({ schema: "app_public", name: "group_users" })
    pgm.dropType("user_type")
}
