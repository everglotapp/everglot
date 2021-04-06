/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createTable(
        { schema: "app_public", name: "messages" },
        {
            id: "id",
            uuid: { type: "uuid", notNull: true, unique: true },
            sender_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: false,
            },
            recipient_id: {
                type: "integer",
                references: { schema: "app_public", name: "users" },
                notNull: false,
            },
            recipient_group_id: {
                type: "integer",
                references: { schema: "app_public", name: "groups" },
                notNull: false,
            },
            body: {
                type: "text",
                notNull: true,
            },
            parent_message_id: {
                type: "integer",
                references: {
                    schema: "app_public",
                    name: "messages",
                },
                notNull: false,
            },
            created_at: {
                type: "timestamp with time zone",
                notNull: true,
                default: pgm.func("current_timestamp"),
            },
        }
    )
    pgm.addConstraint(
        { schema: "app_public", name: "messages" },
        "recipient_is_either_a_user_or_a_group",
        {
            check: `
            (recipient_id is null and recipient_group_id is not null) or
            (recipient_id is not null and recipient_group_id is null)
        `,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "messages" },
        {
            levelSecurity: "ENABLE",
        }
    )
    pgm.createPolicy(
        { schema: "app_public", name: "messages" },
        "select_server",
        {
            command: "SELECT",
            role: "evg_server",
            using: `true`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.messages TO evg_server`)
    pgm.createPolicy(
        { schema: "app_public", name: "messages" },
        "select_client",
        {
            command: "SELECT",
            role: "evg_client",
            using: `
            (
                recipient_group_id is not null
                and exists (
                    select id
                    from app_public.groups
                    where id = recipient_group_id
                    and (
                        (global is true) or
                        id in (
                            select group_id
                            from app_public.group_users
                        )
                    )
                )
            )`,
        }
    )
    pgm.sql(`GRANT SELECT ON app_public.messages TO evg_client`)
    pgm.createIndex({ schema: "app_public", name: "messages" }, "sender_id")
    pgm.createIndex({ schema: "app_public", name: "messages" }, "recipient_id")
    pgm.createIndex(
        { schema: "app_public", name: "messages" },
        "recipient_group_id"
    )
    pgm.sql(
        `GRANT INSERT(uuid, sender_id, recipient_id, recipient_group_id, body, parent_message_id)
        ON app_public.messages
        TO evg_server`
    )
    pgm.sql(
        `GRANT USAGE, SELECT ON SEQUENCE app_public.messages_id_seq TO evg_server`
    )
    pgm.createPolicy(
        { schema: "app_public", name: "messages" },
        "insert_server",
        {
            command: "INSERT",
            role: "evg_server",
            check: `true`,
        }
    )
}

exports.down = (pgm) => {
    pgm.dropPolicy(
        { schema: "app_public", name: "messages" },
        "insert_server",
        {
            ifExists: false,
        }
    )
    pgm.sql(
        `REVOKE USAGE, SELECT ON SEQUENCE app_public.messages_id_seq FROM evg_server`
    )
    pgm.sql(
        `REVOKE INSERT(uuid, sender_id, recipient_id, recipient_group_id, body, parent_message_id)
        ON app_public.messages
        FROM evg_server`
    )
    pgm.dropIndex(
        { schema: "app_public", name: "messages" },
        "recipient_group_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "messages" }, "recipient_id")
    pgm.dropIndex({ schema: "app_public", name: "messages" }, "sender_id")
    pgm.sql(`REVOKE SELECT ON app_public.messages FROM evg_client`)
    pgm.dropPolicy(
        { schema: "app_public", name: "messages" },
        "select_client",
        {
            ifExists: false,
        }
    )
    pgm.sql(`REVOKE SELECT ON app_public.messages FROM evg_server`)
    pgm.dropPolicy(
        { schema: "app_public", name: "messages" },
        "select_server",
        {
            ifExists: false,
        }
    )
    pgm.alterTable(
        { schema: "app_public", name: "messages" },
        {
            levelSecurity: "DISABLE",
        }
    )
    pgm.dropConstraint(
        { schema: "app_public", name: "messages" },
        "recipient_is_either_a_user_or_a_group"
    )
    pgm.dropTable({ schema: "app_public", name: "messages" })
}
