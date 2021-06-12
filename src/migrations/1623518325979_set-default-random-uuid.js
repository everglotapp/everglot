/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "uuid", {
        type: "uuid",
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "groups" }, "uuid", {
        type: "uuid",
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "messages" }, "uuid", {
        type: "uuid",
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        unique: true,
    })
    pgm.alterColumn(
        { schema: "app_public", name: "message_previews" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn({ schema: "app_public", name: "words_en" }, "uuid", {
        type: "uuid",
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "words_de" }, "uuid", {
        type: "uuid",
        default: pgm.func("gen_random_uuid()"),
        notNull: true,
        unique: true,
    })
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_en" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_de" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_zh" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_en" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_zh" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "uuid",
        {
            type: "uuid",
            default: pgm.func("gen_random_uuid()"),
            notNull: true,
            unique: true,
        }
    )
}

exports.down = (pgm) => {
    pgm.alterColumn({ schema: "app_public", name: "users" }, "uuid", {
        type: "uuid",
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "groups" }, "uuid", {
        type: "uuid",
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "messages" }, "uuid", {
        type: "uuid",
        notNull: true,
        unique: true,
    })
    pgm.alterColumn(
        { schema: "app_public", name: "message_previews" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn({ schema: "app_public", name: "words_en" }, "uuid", {
        type: "uuid",
        notNull: true,
        unique: true,
    })
    pgm.alterColumn({ schema: "app_public", name: "words_de" }, "uuid", {
        type: "uuid",
        notNull: true,
        unique: true,
    })
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_en" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_de" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "random_questions_zh" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_en" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "would_you_rather_questions_zh" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
    pgm.alterColumn(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "uuid",
        {
            type: "uuid",
            notNull: true,
            unique: true,
        }
    )
}
