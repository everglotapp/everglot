/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`
  delete
  from app_public.notifications n
  where channel_id = app_public.in_app_notification_channel_id()
  and params is not null
  and params->'type' is not null
  and params->'type'::text = '"POST_USER_MENTION"'
  `)
    pgm.sql(`
  insert into app_public.notifications(channel_id, recipient_id, created_at, params)
    select
      app_public.in_app_notification_channel_id(),
      mentioned_users.id,
      pum.created_at,
      '{"version":1,"type":"POST_USER_MENTION"}'::jsonb
      || json_build_object(
          'data',
          json_build_object(
            'userUuid', mentioned_users.uuid,
            'postUuid', p.uuid
          )
        )::jsonb
    from app_public.post_user_mentions pum
    inner join app_public.posts p
    on pum.post_id = p.id and
    p.author_id <> pum.user_id
    inner join app_public.users mentioned_users
    on pum.user_id = mentioned_users.id
  `)
}

exports.down = (pgm) => {}
