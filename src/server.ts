import express from "express"
import http from "http"
import configureExpress from "./server/configureExpress"
import chat from "./server/chat"
import gql from "./server/gql"
import { createDatabasePool } from "./server/db"

const { PORT } = process.env
;(async () => {
    /** Configure database clients. */
    const db = createDatabasePool()

    /** Connect to database. */
    await db.connect()
    console.log("[Database Pool] Database connection established")

    /** Watch the PG database and update the GraphQL schema automatically. */
    await gql.start()

    let app = express()
    const server = http.createServer(app)

    /** Configure HTTP server. */
    app = configureExpress(app, server, db)
    /** Disable header leaking information on the server. */
    app.disable("x-powered-by")

    /** Start HTTP server. */
    server.listen(PORT)

    /** Start Socket.IO (WebSocket) chat server. */
    chat.start(server, db)
})()
