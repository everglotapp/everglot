/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "posts" },
        {
            prompt_id: {
                type: "int",
                references: { schema: "app_public", name: "prompts" },
                notNull: false,
            },
        }
    )
    pgm.sql(`GRANT INSERT(prompt_id) ON app_public.posts TO evg_server`)
}

exports.down = (pgm) => {
    pgm.sql(`REVOKE INSERT(prompt_id) ON app_public.posts FROM evg_server`)
    pgm.dropColumns({ schema: "app_public", name: "posts" }, ["prompt_id"])
}
