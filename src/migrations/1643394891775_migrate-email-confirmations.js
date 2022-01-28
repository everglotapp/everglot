/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "email", {
        type: "varchar(254)",
        notNull: false,
        unique: true,
    })
    pgm.sql(
        `
    UPDATE app_public.users u
    SET
      unconfirmed_email = email,
      email = NULL`
    )
    pgm.sql(
        `
    UPDATE app_public.users u
    SET
      email = unconfirmed_email,
      email_confirmed_at = current_timestamp,
      unconfirmed_email = NULL
    WHERE google_id IS NOT NULL`
    )
}

exports.down = (pgm) => {
    // Shouldn't be undone.
}
