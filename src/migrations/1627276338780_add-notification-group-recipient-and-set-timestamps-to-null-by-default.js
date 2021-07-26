/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = async (pgm) => {
    pgm.dropIndex({ schema: "app_public", name: "notifications" }, "user_id")
    pgm.renameColumn(
        { schema: "app_public", name: "notifications" },
        "user_id",
        "recipient_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "notifications" },
        "recipient_id"
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "recipient_id",
        {
            notNull: false,
        }
    )
    pgm.addColumns(
        { schema: "app_public", name: "notifications" },
        {
            recipient_group_id: {
                type: "integer",
                notNull: false,
                default: null,
                references: { schema: "app_public", name: "groups" },
            },
        }
    )
    pgm.createIndex(
        { schema: "app_public", name: "notifications" },
        "recipient_group_id"
    )
    pgm.addConstraint(
        { schema: "app_public", name: "notifications" },
        "recipient_is_either_a_user_or_a_group",
        {
            check: `
          (recipient_id is null and recipient_group_id is not null) or
          (recipient_id is not null and recipient_group_id is null)
      `,
        }
    )
    pgm.sql(
        `GRANT UPDATE(recipient_group_id) ON app_public.notifications TO evg_server`
    )
    pgm.sql(
        `GRANT INSERT(recipient_group_id) ON app_public.notifications TO evg_server`
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "sent_at",
        {
            default: null,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "withheld_until",
        {
            default: null,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "expires_at",
        {
            default: null,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "read_at",
        {
            default: null,
        }
    )
}

exports.down = (pgm) => {
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "read_at",
        {
            default: pgm.func("current_timestamp"),
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "expires_at",
        {
            default: pgm.func("current_timestamp"),
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "withheld_until",
        {
            default: pgm.func("current_timestamp"),
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "sent_at",
        {
            default: pgm.func("current_timestamp"),
        }
    )
    pgm.sql(
        `REVOKE INSERT(recipient_group_id) ON app_public.notifications FROM evg_server`
    )
    pgm.sql(
        `REVOKE UPDATE(recipient_group_id) ON app_public.notifications FROM evg_server`
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "notifications" },
        "recipient_is_either_a_user_or_a_group"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "notifications" },
        "recipient_group_id"
    )
    pgm.dropColumns({ schema: "app_public", name: "notifications" }, [
        "recipient_group_id",
    ])
    pgm.alterColumn(
        { schema: "app_public", name: "notifications" },
        "recipient_id",
        {
            notNull: true,
        }
    )
    pgm.dropIndex(
        { schema: "app_public", name: "notifications" },
        "recipient_id"
    )
    pgm.renameColumn(
        { schema: "app_public", name: "notifications" },
        "recipient_id",
        "user_id"
    )
    pgm.createIndex({ schema: "app_public", name: "notifications" }, "user_id")
}
