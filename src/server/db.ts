import { Pool } from "pg"
export let db: Pool | undefined

export function createDatabasePool(): Pool {
    if (!db) {
        db = new Pool()
    }
    return db
}
