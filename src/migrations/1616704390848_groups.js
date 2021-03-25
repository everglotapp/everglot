/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable({ schema: "app_public", name: "groups" }, {
        id: "id",
        group_name: { 
            type: "varchar(50)", 
            notNull: false,
            default: "",
        },
        language_id: {
            type: "serial",
            references: { schema: "app_public", name: "languages" },
            notNull: true,
        },
        language_skill_level_id: {
            type: "serial",
            references: { schema: "app_public", name: "language_skill_levels" },
            notNull: false,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    })
};

exports.down = pgm => {
    pgm.dropTable({ schema: "app_public", name: "groups" })
};
