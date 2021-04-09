/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.sql(`drop function app_public.register_user_activity(user_id int);`)
    pgm.sql(
        `create function app_public.register_user_activity(user_id int)
        returns timestamp with time zone as $$
            update app_public.users
            set last_active_at = current_timestamp
            where id = user_id
            returning last_active_at
        $$ language sql strict volatile;`
    )
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "update_server", {
        ifExists: false,
    })
    pgm.createPolicy({ schema: "app_public", name: "users" }, "update_server", {
        command: "UPDATE",
        role: "evg_server",
        check: "true",
        using: "true",
    })
}

exports.down = (pgm) => {
    pgm.dropPolicy({ schema: "app_public", name: "users" }, "update_server", {
        ifExists: false,
    })
    pgm.createPolicy({ schema: "app_public", name: "users" }, "update_server", {
        command: "UPDATE",
        role: "evg_server",
        check: "true",
    })
    pgm.sql(`drop function app_public.register_user_activity(user_id int);`)
    pgm.sql(
        `create function app_public.register_user_activity(user_id int)
        returns timestamp as $$
            update app_public.users
            set last_active_at = current_timestamp
            where id = user_id
            returning last_active_at
        $$ language sql volatile;`
    )
}
