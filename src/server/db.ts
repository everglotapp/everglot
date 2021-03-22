import { Pool } from "pg"
export let db: Pool | undefined

export function createDatabasePool(): Pool {
    if (!db) {
        db = new Pool()
        db.on("connect", async (client) => {
            const DATABASE_SCHEMA = "app_public"
            const DATABASE_ROLE = "evg_server"
            await client.query(`SET SEARCH_PATH TO ${DATABASE_SCHEMA}`)
            await client.query(`SET ROLE ${DATABASE_ROLE}`)
        })
    }
    return db
}
