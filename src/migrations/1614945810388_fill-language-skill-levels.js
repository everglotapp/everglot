/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query(`INSERT INTO language_skill_levels (name)
        VALUES
            ('A1'),
            ('A2'),
            ('B1'),
            ('B2'),
            ('C1'),
            ('C2')`)
}

exports.down = (pgm) => {
    pgm.db.query("TRUNCATE TABLE language_skill_levels")
}
