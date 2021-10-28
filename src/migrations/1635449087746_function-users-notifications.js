/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(
        `create function app_public.in_app_notification_channel_id()
  returns bigint as $$
    SELECT id
    FROM app_public.notification_channels
    WHERE name = 'In-app'
  $$ language sql stable security definer;`
    )
    pgm.sql(
        `create function app_public.users_in_app_notifications(user_row app_public.users, after_uuid uuid)
    returns setof app_public.notifications as $$
      SELECT n.*
      FROM app_public.notifications n
      WHERE recipient_id = user_row.id
      AND channel_id = app_public.in_app_notification_channel_id()
      AND (
        after_uuid IS NULL OR (
          created_at < (
            SELECT n2.created_at
            FROM app_public.notifications n2
            WHERE n2.uuid = after_uuid
            LIMIT 1
          )
        )
      )
      AND (
        read_at IS NOT NULL OR (
          (
            withheld_until IS NULL OR
            current_timestamp > withheld_until
          ) AND (
            expires_at IS NULL OR
            current_timestamp < expires_at
          )
        )
      )
    $$ language sql stable;`
    )
    pgm.sql(`GRANT SELECT ON app_public.notifications TO evg_client`)
    pgm.createPolicy(
        { schema: "app_public", name: "notifications" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `
          (
            recipient_id is not null AND
            recipient_id = app_public.current_user_id()
          )`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "notifications" },
        "select_client"
    )
    pgm.sql(`REVOKE SELECT ON app_public.notifications FROM evg_client`)
    pgm.sql(`drop function app_public.users_in_app_notifications;`)
    pgm.sql(`drop function app_public.in_app_notification_channel_id;`)
}
