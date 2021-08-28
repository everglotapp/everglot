import { Pool } from "pg"

import log from "../logger"

export const DATABASE_SCHEMA = "app_public"
export const DATABASE_ROLE_SERVER = "evg_server"
// export const DATABASE_ROLE_CLIENT = "evg_client"
// Change these for testing only (e.g. the client one if graphiql queries fail):
// export const DATABASE_ROLE_SERVER = "everglot_app_user"
export const DATABASE_ROLE_CLIENT = "everglot_app_user"

export let db: Pool | undefined

const chlog = log.child({ namespace: "db" })

export async function connectToDatabase() {
    chlog.trace("Creating database pool")
    /** Configure database clients. */
    const db = createDatabasePool()

    /** Connect to database. */
    chlog.trace("Testing database connection")
    const TEST_NUM = 1337 // random number to see if the database returns it correctly
    const res = await db
        .query<{ number: number }>("SELECT $1::int AS number", [TEST_NUM])
        .catch(() => {
            chlog.warn("Failed to perform test query")
        })
    if (!res || res.rowCount !== 1 || res.rows[0].number !== TEST_NUM) {
        chlog.error("Failed to connect to database")
        return
    }

    return db
}

export async function disconnectFromDatabase() {
    await destroyDatabasePool()
    chlog.info("Disconnected from database")
}

export const createDatabasePool = () => (db ||= makeDatabasePool())

export const destroyDatabasePool = async (): Promise<void> => {
    if (!db) {
        return
    }
    await db.end()
    db = undefined
}

const makeDatabasePool = () =>
    new Pool()
        .on("connect", async (client) => {
            chlog.debug("Database connection established")
            chlog.trace(`Setting default search path to ${DATABASE_SCHEMA}`)
            await client.query(`set search_path to ${DATABASE_SCHEMA}`)
            chlog.trace(`Setting role to ${DATABASE_ROLE_SERVER}`)
            await client.query(`set role ${DATABASE_ROLE_SERVER}`)
        })
        .on("error", (err) => {
            chlog.error(`Database error: ${err.message}`)
        })
