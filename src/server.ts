import sirv from "sirv"
import express from "express"
import compression from "compression"
import * as sapper from "@sapper/server"
import chat from "./server/chat"
import { createDatabasePool } from "./server/db"
import { json } from "body-parser"

import type { Express } from "express"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

/** Configure database clients. */
const pool = createDatabasePool()
/** Connect to database. */
pool.connect().then(() => {
    console.log("[Database Pool] Database connection established")
})

/** Configure Express HTTP server. */
const app: Express = express() // You can also use Express
    .use(
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        json(),
        sapper.middleware()
    )

/** Start HTTP server. */
const server = app.listen(PORT)

/** Start Socket.IO (WebSocket) chat server. */
chat.start(server)
