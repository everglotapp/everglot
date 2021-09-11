/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    const EVERGLOT_EPOCH = 1625641627000
    pgm.sql(
        `create function app_public.generate_snowflake_id(OUT result bigint) AS $$
    DECLARE
        our_epoch bigint := ${EVERGLOT_EPOCH};
        seq_id bigint;
        now_millis bigint;
        shard_id int := 1;
    BEGIN
        SELECT nextval('app_public.posts_id_seq') % 1024
          INTO seq_id;
        SELECT FLOOR(
          EXTRACT(
            EPOCH FROM clock_timestamp()
          ) * 1000
        )
          INTO now_millis;
        result := (now_millis - our_epoch) << 23;
        result := result | (shard_id << 10);
        result := result | (seq_id);
    END;
        $$ LANGUAGE PLPGSQL VOLATILE;`
    )
    pgm.addColumns(
        { schema: "app_public", name: "posts" },
        {
            snowflake_id: {
                type: "bigint",
                notNull: true,
                unique: true,
                default: pgm.func("app_public.generate_snowflake_id()"),
            },
        }
    )
    pgm.createIndex({ schema: "app_public", name: "posts" }, "snowflake_id", {
        unique: true,
    })
}

exports.down = (pgm) => {
    pgm.dropIndex({ schema: "app_public", name: "posts" }, "snowflake_id", {
        unique: true,
    })
    pgm.dropConstraint(
        { schema: "app_public", name: "posts" },
        "posts_snowflake_id_key"
    )
    pgm.sql(`REVOKE UPDATE(snowflake_id) ON app_public.posts FROM evg_server`)
    pgm.sql(`REVOKE INSERT(snowflake_id) ON app_public.posts FROM evg_server`)
    pgm.dropColumns({ schema: "app_public", name: "posts" }, ["snowflake_id"])
    pgm.sql(`drop function app_public.generate_snowflake_id();`)
}
