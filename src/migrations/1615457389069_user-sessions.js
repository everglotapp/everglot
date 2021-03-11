/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    // Transferred from https://github.com/voxpelli/node-connect-pg-simple/blob/main/table.sql
    pgm.createTable("user_sessions", {
        sid: {
            type: "varchar",
            primaryKey: true,
            notNull: true,
            collation: '"default"',
        },
        sess: { type: "json", notNull: true },
        expire: { type: "timestamp(6)", notNull: true },
    })
    pgm.createIndex("user_sessions", "expire")
}

exports.down = (pgm) => {
    pgm.dropIndex("user_sessions", "expire")
    pgm.dropTable("user_sessions")
}
