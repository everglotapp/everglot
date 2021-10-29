/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query(`INSERT INTO app_public.notification_channels (name)
        VALUES
            ('In-app')`)
}

exports.down = (pgm) => {
    pgm.db.query(`
    DELETE FROM app_public.notifications
    WHERE channel_id = (
      SELECT id
      FROM app_public.notification_channels
      WHERE name = 'In-app'
    )
    `)
    pgm.db.query(`
    DELETE FROM app_public.notification_channels
    WHERE name = 'In-app'
    `)
}
