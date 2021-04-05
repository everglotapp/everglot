/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query("TRUNCATE TABLE app_public.group_users, app_public.groups")
    pgm.addColumns(
        { schema: "app_public", name: "groups" },
        {
            uuid: { type: "uuid", notNull: true, unique: true },
        }
    )
    pgm.sql(`GRANT INSERT(uuid) ON app_public.groups TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE INSERT(uuid) ON app_public.groups FROM evg_server`)
    pgm.dropColumns({ schema: "app_public", name: "groups" }, ["uuid"])
}
