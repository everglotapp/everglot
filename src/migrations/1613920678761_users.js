/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable("users", {
        id: "id",
        username: { type: "varchar(50)", notNull: true },
        email: { type: "varchar(254)", notNull: true, unique: true },
        unconfirmed_email: { type: "varchar(254)", notNull: false },
        gender: { type: "char" },
        bio: { type: "text", notNull: true, default: "" },
        last_active_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    })
}

exports.down = (pgm) => {
    pgm.dropTable("users")
}
