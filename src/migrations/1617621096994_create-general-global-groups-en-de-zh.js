/* eslint-disable camelcase */
const uuidv4 = require("uuid").v4

exports.shorthands = undefined

exports.up = (pgm) => {
    pgm.db.query(
        `INSERT INTO app_public.groups(
            global,
            group_name,
            language_id,
            uuid,
            language_skill_level_id
        ) VALUES
        (true, 'General', (
            select id
            from app_public.languages
            where alpha2 = 'en'
            limit 1
        ), $1, null),
        (true, 'General', (
            select id
            from app_public.languages
            where alpha2 = 'zh'
            limit 1
        ), $2, null),
        (true, 'General', (
            select id
            from app_public.languages
            where alpha2 = 'de'
            limit 1
        ), $3, null)`,
        [uuidv4(), uuidv4(), uuidv4()]
    )
}

exports.down = (pgm) => {
    pgm.db.query(`
        delete from app_public.messages
        where recipient_group_id is not null
        and recipient_group_id in (
            select id
            from app_public.groups
            where global is true
            and group_name = 'General'
        )
    `)
    pgm.db.query(`
        delete from app_public.groups
        where global is true
        and group_name = 'General'
    `)
}
