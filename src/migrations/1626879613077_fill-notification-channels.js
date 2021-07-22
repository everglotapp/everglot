/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query(`INSERT INTO app_public.notification_channels (name)
        VALUES
            ('Email'),
            ('Firebase Cloud Messaging')`)
}

exports.down = (pgm) => {
    pgm.db.query("TRUNCATE TABLE app_public.notification_channels")
}
