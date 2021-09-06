/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.createIndex({ schema: "app_public", name: "posts" }, "prompt_id")
    pgm.createIndex({ schema: "app_public", name: "posts" }, "language_id")
    pgm.createIndex(
        { schema: "app_public", name: "messages" },
        "parent_message_id"
    )
    pgm.createIndex({ schema: "app_public", name: "users" }, "locale")
    pgm.createIndex(
        { schema: "app_public", name: "users" },
        "signed_up_with_token_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "words_en" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "words_de" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "random_questions_en" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "random_questions_de" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "random_questions_zh" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "would_you_rather_questions_en" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "would_you_rather_questions_zh" },
        "recommended_skill_level_id"
    )
    pgm.createIndex(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "recommended_skill_level_id"
    )
}

exports.down = (pgm) => {
    pgm.dropIndex(
        { schema: "app_public", name: "guess_character_questions_zh" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "would_you_rather_questions_zh" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "would_you_rather_questions_de" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "would_you_rather_questions_en" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "random_questions_zh" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "random_questions_de" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "random_questions_en" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "words_de" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "words_en" },
        "recommended_skill_level_id"
    )
    pgm.dropIndex(
        { schema: "app_public", name: "users" },
        "signed_up_with_token_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "users" }, "locale")
    pgm.dropIndex(
        { schema: "app_public", name: "messages" },
        "parent_message_id"
    )
    pgm.dropIndex({ schema: "app_public", name: "posts" }, "language_id")
    pgm.dropIndex({ schema: "app_public", name: "posts" }, "prompt_id")
}
