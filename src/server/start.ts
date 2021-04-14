import express from "express"
import http from "http"
import configureExpress from "./configureExpress"
import chat from "./chat"
import gql from "./gql"
import { createDatabasePool } from "./db"
import type { Pool } from "pg"

const { PORT } = process.env

async function connectToDatabase() {
    /** Configure database clients. */
    const db = createDatabasePool()

    /** Connect to database. */
    await db.connect()
    console.log("[Database Pool] Database connection established")

    return db
}

/** Watch the PG database and update the GraphQL schema automatically. */
async function initializeServersidePostgraphile() {
    await gql.start()
}

/** Stop watching the PG database and updating the GraphQL schema. */
async function stopServersidePostgraphile() {
    await gql.stop()
}

let httpServer: http.Server | undefined
async function startWebServer(db: Pool): Promise<http.Server | null> {
    if (!httpServer) {
        return null
    }

    let app = express()
    httpServer = http.createServer(app)

    /** Configure HTTP server. */
    app = configureExpress(app, httpServer, db)
    /** Disable header leaking information on the server. */
    app.disable("x-powered-by")

    /** Start HTTP server. */
    httpServer.listen(PORT)

    return httpServer
}

export async function start() {
    const db = await connectToDatabase()

    await initializeServersidePostgraphile()

    const httpServer = await startWebServer(db)

    if (!httpServer) {
        return
    }
    /** Start Socket.IO (WebSocket) chat server. */
    chat.start(httpServer, db)
}

export async function stop() {
    if (httpServer) {
        httpServer.close()
    }

    await stopServersidePostgraphile()

    const pool = createDatabasePool()
    await pool.end()
}

export default start
