import express from "express"
import configureExpress from "./server/configureExpress"
import chat from "./server/chat"
import gql from "./server/gql"
import { createDatabasePool } from "./server/db"

const { PORT } = process.env

/** Configure database clients. */
const pool = createDatabasePool()
/** Connect to database. */
;(async () => {
    await pool.connect()
    console.log("[Database Pool] Database connection established")
    const DATABASE_SCHEMA = "app_public"
    const DATABASE_ROLE = "evg_server"
    await pool.query(`SET SEARCH_PATH TO "${DATABASE_SCHEMA}"`)
    console.log(
        `[Database Pool] Set default schema (search path) to "${DATABASE_SCHEMA}"`
    )
    await pool.query(`SET ROLE "${DATABASE_ROLE}"`)
    console.log(`[Database Pool] Set user role to "${DATABASE_ROLE}"`)
})()

/** Watch the PG database and update the GraphQL schema automatically. */
gql.start()

/** Configure HTTP server. */
const app = configureExpress(express(), pool)
/** Disable header leaking information on the server. */
app.disable("x-powered-by")
/** Start HTTP server. */
const server = app.listen(PORT)

/** Start Socket.IO (WebSocket) chat server. */
chat.start(server, pool)
