/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "invite_tokens" },
        {
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.addColumns(
        { schema: "app_public", name: "user_sessions" },
        {
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
}

exports.down = (pgm) => {
    pgm.dropColumns({ schema: "app_public", name: "user_sessions" }, [
        "created_at",
    ])
    pgm.dropColumns({ schema: "app_public", name: "invite_tokens" }, [
        "created_at",
    ])
}
