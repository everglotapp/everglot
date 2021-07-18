/* eslint-disable camelcase */

const { generateEmailUnsubscribeToken } = require("../helpers/tokens").default

exports.shorthands = undefined

exports.up = async (pgm) => {
    const userRows = await pgm.db.select(
        "SELECT id FROM app_public.users WHERE email_unsubscribe_token IS NULL"
    )
    for (const userRow of userRows) {
        const id = userRow["id"]
        if (!id) {
            throw new Error("Failed to retrieve user ID")
        }
        const emailUnsubscribeToken = await generateEmailUnsubscribeToken()
        if (!emailUnsubscribeToken) {
            throw new Error("Failed to generate unsubscribe token")
            return
        }
        pgm.sql(
            `UPDATE app_public.users
            SET email_unsubscribe_token = '${emailUnsubscribeToken}'::text
            WHERE id = {id}::int`,
            { id }
        )
    }
}

exports.down = (pgm) => {}
