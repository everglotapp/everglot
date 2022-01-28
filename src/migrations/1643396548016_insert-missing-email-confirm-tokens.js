/* eslint-disable camelcase */

const { generateEmailConfirmToken } = require("../helpers/tokens").default

exports.shorthands = undefined

exports.up = async (pgm) => {
    const userRows = await pgm.db.select(
        `
    SELECT id
    FROM app_public.users
    WHERE email IS NULL
    AND email_confirm_token IS NULL`
    )
    for (const userRow of userRows) {
        const id = userRow["id"]
        if (!id) {
            throw new Error("Failed to retrieve user ID")
        }
        const emailConfirmToken = await generateEmailConfirmToken()
        if (!emailConfirmToken) {
            throw new Error("Failed to generate confirm token")
            return
        }
        pgm.sql(
            `UPDATE app_public.users
        SET email_confirm_token = '${emailConfirmToken}'::text,
        email_confirm_token_created_at = current_timestamp
        WHERE id = {id}::int`,
            { id }
        )
    }
}

exports.down = (pgm) => {}
