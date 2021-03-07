/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable("user_languages", {
        id: "id",
        user_id: {
            type: "serial",
            references: "users",
            notNull: true,
        },
        language_id: {
            type: "serial",
            references: "languages",
            notNull: true,
        },
        language_skill_level_id: {
            type: "serial",
            references: "language_skill_levels",
            notNull: false,
        },
        native: {
            type: "boolean",
            notNull: true,
            default: false,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    })
}

exports.down = (pgm) => {
    pgm.dropTable("user_languages")
}
