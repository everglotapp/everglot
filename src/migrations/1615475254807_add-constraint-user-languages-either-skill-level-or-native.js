/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.addConstraint("user_languages", "has_either_skill_level_or_native", {
        check: `(language_skill_level_id IS NULL AND native IS TRUE) OR
            (language_skill_level_id IS NOT NULL AND native IS FALSE)
        `,
    })
}

exports.down = (pgm) => {
    pgm.dropConstraint("user_languages", "has_either_skill_level_or_native")
}
