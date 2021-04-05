import { Pool } from "pg"

export const DATABASE_SCHEMA = "app_public"
export const DATABASE_ROLE_SERVER = "evg_server"
// export const DATABASE_ROLE_CLIENT = "evg_client"
// export const DATABASE_ROLE_SERVER = "everglot_app_user"
export const DATABASE_ROLE_CLIENT = "everglot_app_user"

export let db: Pool | undefined

export const createDatabasePool = () => (db ||= makeDatabasePool())

const makeDatabasePool = () =>
    new Pool().on("connect", async (client) => {
        await client.query(`SET SEARCH_PATH TO ${DATABASE_SCHEMA}`)
        await client.query(`SET ROLE ${DATABASE_ROLE_SERVER}`)
    })
