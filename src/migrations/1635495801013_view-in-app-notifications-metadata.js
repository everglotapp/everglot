/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "notifications" }, "params", {
        type: "jsonb",
        notNull: false,
    })
    pgm.sql(
        `create function app_public.notifications_type(notification_row app_public.notifications)
returns text as $$
  SELECT CASE WHEN (notification_row.params->'type') IS NULL THEN
    NULL
  ELSE
    TRIM('"' FROM (notification_row.params->'type')::text)
  END
$$ language sql stable;`
    )
    pgm.sql(
        `CREATE VIEW app_public.in_app_notification_metadata AS
  SELECT
    n.id notification_id,
    n.recipient_id recipient_id,
    (
      CASE
      WHEN TRIM('"' FROM (n.params->'type')::text) IN (
        'POST_REPLY',
        'POST_LIKE',
        'POST_USER_MENTION',
        'POST_CORRECTION'
      ) THEN
        CASE WHEN (n.params->'data'->'postUuid')::text <> '""' THEN (
          SELECT id
          FROM app_public.posts p
          WHERE p.uuid = TRIM('"' FROM (n.params->'data'->'postUuid')::text)::uuid
          LIMIT 1
        )
        ELSE
          NULL
        END
      ELSE
        NULL
      END
    ) post_id,
    (
      CASE
      WHEN TRIM('"' FROM (n.params->'type')::text) IN (
          'POST_REPLY',
          'POST_LIKE',
          'POST_USER_MENTION',
          'POST_CORRECTION',
          'USER_FOLLOWERSHIP'
      ) THEN
        CASE WHEN (n.params->'data'->'userUuid')::text <> '""' THEN (
          SELECT id
          FROM app_public.users u
          WHERE u.uuid = TRIM('"' FROM (n.params->'data'->'userUuid')::text)::uuid
          LIMIT 1
        )
        ELSE
          NULL
        END
      ELSE
        NULL
      END
    ) user_id
  FROM app_public.notifications n
  WHERE n.channel_id = app_public.in_app_notification_channel_id()
  AND (n.params->'version') IS NOT NULL
  AND (n.params->'version')::text::int = 1;
    `
    )
    pgm.sql(`
    COMMENT ON VIEW app_public.in_app_notification_metadata IS
        E'@foreignKey (post_id) references app_public.posts (id)|@fieldName post|@foreignFieldName relatedInAppNotifications
@foreignKey (user_id) references app_public.users (id)|@fieldName user|@foreignFieldName relatedInAppNotifications
@foreignKey (notification_id) references app_public.notifications (id)|@fieldName notification|@foreignFieldName metadata
@recipientId inAppNotificationMetadataByRecipientId
@notificationId inAppNotificationMetadataByNotificationId
@foreignFieldName metadata
@unique notification_id
Metadata for in-app notifications.';
    `)
    pgm.sql(
        `GRANT SELECT ON app_public.in_app_notification_metadata TO evg_client`
    )
}

exports.down = (pgm) => {
    pgm.sql(
        `REVOKE SELECT ON app_public.in_app_notification_metadata FROM evg_client`
    )
    pgm.sql(`DROP VIEW app_public.in_app_notification_metadata;`)
    pgm.sql(`drop function app_public.notifications_type;`)
    pgm.alterColumn({ schema: "app_public", name: "notifications" }, "params", {
        type: "json",
        notNull: false,
    })
}
