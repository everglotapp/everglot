import express from "express"
import configureExpress from "./server/configureExpress"
import chat from "./server/chat"
import { createDatabasePool } from "./server/db"

const { PORT } = process.env

/** Configure database clients. */
const pool = createDatabasePool()
/** Connect to database. */
;(async () => await pool.connect())()
console.log("[Database Pool] Database connection established")

/** Configure HTTP server. */
const app = configureExpress(express(), pool)
/** Disable header leaking information on the server. */
app.disable("x-powered-by")
/** Start HTTP server. */
const server = app.listen(PORT)

/** Start Socket.IO (WebSocket) chat server. */
chat.start(server)
