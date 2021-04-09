import express from "express"
import configureExpress from "./server/configureExpress"
import chat from "./server/chat"
import gql from "./server/gql"
import { createDatabasePool } from "./server/db"

const { NODE_ENV, PORT } = process.env

const dev = NODE_ENV === "development"

;(async () => {
    /** Configure database clients. */
    const db = createDatabasePool()

    /** Connect to database. */
    await db.connect()
    console.log("[Database Pool] Database connection established")

    /** Watch the PG database and update the GraphQL schema automatically. */
    await gql.start()

    /** Configure HTTP server. */
    const app = configureExpress(express(), db)
    /** Disable header leaking information on the server. */
    app.disable("x-powered-by")

    /** Start HTTP server. */
    const server = app.listen(PORT)

    /** Start Socket.IO (WebSocket) chat server. */
    chat.start(server, db)
})()
