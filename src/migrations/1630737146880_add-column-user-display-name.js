/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "users" },
        {
            display_name: {
                type: "varchar(50)",
                notNull: false,
                unique: false,
            },
        }
    )
    pgm.sql(`GRANT INSERT(display_name) ON app_public.users TO evg_server`)
    pgm.sql(`GRANT UPDATE(display_name) ON app_public.users TO evg_server`)
    pgm.sql(`UPDATE app_public.users SET display_name = username`)
    pgm.sql(`UPDATE app_public.users SET username = NULL
      WHERE username IN (
        SELECT username
        FROM app_public.users
        GROUP BY username
        HAVING count(id) > 1
      )`)
    pgm.addConstraint(
        { schema: "app_public", name: "users" },
        "users_username_key",
        {
            unique: ["username"],
        }
    )
    pgm.createIndex({ schema: "app_public", name: "users" }, "username", {
        unique: true,
    })
}

exports.down = (pgm) => {
    pgm.dropIndex({ schema: "app_public", name: "users" }, "username", {
        unique: true,
    })
    pgm.dropConstraint(
        { schema: "app_public", name: "users" },
        "users_username_key"
    )
    pgm.alterColumn({ schema: "app_public", name: "users" }, "username", {
        type: "varchar(50)",
        notNull: false,
        unique: false,
    })
    pgm.sql(`REVOKE UPDATE(display_name) ON app_public.users FROM evg_server`)
    pgm.sql(`REVOKE INSERT(display_name) ON app_public.users FROM evg_server`)
    pgm.dropColumns({ schema: "app_public", name: "users" }, ["display_name"])
}
