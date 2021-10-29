/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`
    insert into app_public.notifications(channel_id, recipient_id, created_at, params)
    select
      app_public.in_app_notification_channel_id(),
      uf.user_id,
      uf.created_at,
      '{"version":1,"type":"USER_FOLLOWERSHIP"}'::jsonb
      || json_build_object(
          'data',
          json_build_object(
            'userUuid', followers.uuid
          )
        )::jsonb
    from app_public.user_followers uf
    inner join app_public.users followers
    on uf.follower_id  = followers.id
  `)
    pgm.sql(`
  insert into app_public.notifications(channel_id, recipient_id, created_at, params)
  select
    app_public.in_app_notification_channel_id(),
    p.author_id,
    pl.created_at,
    '{"version":1,"type":"POST_LIKE"}'::jsonb
    || json_build_object(
        'data',
        json_build_object(
          'userUuid', (
            select uuid
            from app_public.users
            where id = pl.user_id
          ),
          'postUuid', p.uuid
        )
      )::jsonb
  from app_public.post_likes pl
  inner join app_public.posts p
  on pl.post_id = p.id and
  p.author_id <> pl.user_id
`)
    pgm.sql(`
insert into app_public.notifications(channel_id, recipient_id, created_at, params)
  select
    app_public.in_app_notification_channel_id(),
    p.author_id,
    pc.created_at,
    '{"version":1,"type":"POST_CORRECTION"}'::jsonb
    || json_build_object(
        'data',
        json_build_object(
          'userUuid', (
            select uuid
            from app_public.users
            where id = pc.user_id
          ),
          'postUuid', p.uuid
        )
      )::jsonb
  from app_public.post_corrections pc
  inner join app_public.posts p
  on pc.post_id = p.id and
  p.author_id <> pc.user_id
`)
    pgm.sql(`
insert into app_public.notifications(channel_id, recipient_id, created_at, params)
  select
    app_public.in_app_notification_channel_id(),
    p.author_id,
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
    pgm.sql(`
insert into app_public.notifications(channel_id, recipient_id, created_at, params)
  select
    app_public.in_app_notification_channel_id(),
    parent_posts.author_id,
    replies.created_at,
    '{"version":1,"type":"POST_REPLY"}'::jsonb
    || json_build_object(
        'data',
        json_build_object(
          'userUuid', reply_authors.uuid,
          'postUuid', replies.uuid
        )
      )::jsonb
  from app_public.posts replies
  inner join app_public.posts parent_posts
  on replies.parent_post_id = parent_posts.id and
  parent_posts.author_id <> replies.author_id
  inner join app_public.users reply_authors
  on replies.author_id = reply_authors.id
`)
}

exports.down = (pgm) => {}
