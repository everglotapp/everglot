/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "last_active_at", {
        type: "timestamp with time zone",
    })
    pgm.alterColumn({ schema: "app_public", name: "users" }, "created_at", {
        type: "timestamp with time zone",
    })
    pgm.alterColumn({ schema: "app_public", name: "languages" }, "created_at", {
        type: "timestamp with time zone",
    })
    pgm.alterColumn(
        { schema: "app_public", name: "user_languages" },
        "created_at",
        {
            type: "timestamp with time zone",
        }
    )
    pgm.alterColumn({ schema: "app_public", name: "user_sessions" }, "expire", {
        type: "timestamp (6) with time zone",
    })
    pgm.alterColumn({ schema: "app_public", name: "groups" }, "created_at", {
        type: "timestamp with time zone",
    })
    pgm.alterColumn(
        { schema: "app_public", name: "group_users" },
        "joined_on",
        {
            type: "timestamp with time zone",
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "group_users" },
        "last_active",
        {
            type: "timestamp with time zone",
        }
    )
}

exports.down = (pgm) => {
    pgm.alterColumn(
        { schema: "app_public", name: "group_users" },
        "last_active",
        {
            type: "timestamp",
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "group_users" },
        "joined_on",
        {
            type: "timestamp",
        }
    )
    pgm.alterColumn({ schema: "app_public", name: "groups" }, "created_at", {
        type: "timestamp",
    })
    pgm.alterColumn({ schema: "app_public", name: "user_sessions" }, "expire", {
        type: "timestamp (6)",
    })
    pgm.alterColumn(
        { schema: "app_public", name: "user_languages" },
        "created_at",
        {
            type: "timestamp",
        }
    )
    pgm.alterColumn({ schema: "app_public", name: "languages" }, "created_at", {
        type: "timestamp",
    })
    pgm.alterColumn({ schema: "app_public", name: "users" }, "created_at", {
        type: "timestamp",
    })
    pgm.alterColumn({ schema: "app_public", name: "users" }, "last_active_at", {
        type: "timestamp",
    })
}
