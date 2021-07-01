/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addColumns(
        { schema: "app_public", name: "invite_tokens" },
        {
            description: { type: "text", notNull: false },
        }
    )
}

exports.down = (pgm) => {
    pgm.dropColumns({ schema: "app_public", name: "invite_tokens" }, [
        "description",
    ])
}
