/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query(
        "TRUNCATE TABLE app_public.posts, app_public.post_recordings, app_public.post_likes"
    )
    pgm.addColumns(
        { schema: "app_public", name: "posts" },
        {
            language_id: {
                type: "int",
                references: { schema: "app_public", name: "languages" },
                notNull: true,
            },
        }
    )
    pgm.sql(`GRANT INSERT(language_id) ON app_public.posts TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE INSERT(language_id) ON app_public.posts FROM evg_server`)
    pgm.dropColumns({ schema: "app_public", name: "posts" }, ["language_id"])
}
