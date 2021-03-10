/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable("languages", {
        id: "id",
        alpha2: {
            type: "varchar(2)",
            unique: true,
            notNull: true,
            comment: "ISO 3166-1 alpha-2 standardized code",
        },
        english_name: {
            type: "varchar(255)",
            unique: true,
            notNull: true,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    })
}

exports.down = (pgm) => {
    pgm.dropTable("languages")
}
