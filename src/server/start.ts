import express from "express"
import http from "http"
import log from "../logger"
import configureExpress from "./configureExpress"
import chat from "./socket"
import gql from "./gql"
import { connectToDatabase, disconnectFromDatabase } from "./db"
import type { Pool } from "pg"
import notifications from "./notifications"

const { HOST = "127.0.0.1", PORT = 3000, RETRY = 5 } = process.env

/** Watch the PG database and update the GraphQL schema automatically. */
export async function initializeServersidePostgraphile() {
    await gql.start()
}

/** Stop watching the PG database and updating the GraphQL schema. */
export async function stopServersidePostgraphile() {
    await gql.stop()
}

let httpServer: http.Server | undefined
async function startWebServer(db: Pool): Promise<http.Server> {
    return await new Promise(async (resolve, reject) => {
        let app = express()
        httpServer = http.createServer(app)

        /** Configure HTTP server. */
        app = await configureExpress(app, db)
        /** Disable header leaking information on the server. */
        app.disable("x-powered-by")

        let attemptsLeft = Number(RETRY)
        let port = Number(PORT)
        let success = true
        /** Try to start HTTP server. */
        const tryStart = async () => {
            const chlog = log.child({
                namespace: "express",
            })
            chlog.debug(
                `Trying to start server. ${attemptsLeft} attempt(s) left.`
            )
            attemptsLeft -= 1
            if (!attemptsLeft) {
                chlog.error(`Aborting server start: No attempts left.`)
                reject()
                return
            }
            if (!httpServer) {
                reject()
                return
            }

            return httpServer
                .listen(port, HOST)
                .on("listening", () => {
                    success = true
                    chlog.info(`Server successfully started on port ${port}.`)
                    resolve(httpServer!)
                })
                .on("request", (req: http.IncomingMessage) => {
                    chlog
                        .child({
                            referer: req.headers.referer,
                            origin: req.headers.origin,
                            xForwardedFor: req.headers["x-forwarded-for"],
                            remoteAddress: req.socket.remoteAddress,
                            userAgent: req.headers["user-agent"],
                        })
                        .trace(`${req.method || "req"} ${req.url}`)
                })
                .on("error", (e: NodeJS.ErrnoException) => {
                    chlog.warn(`${e.code}: ${e.message}`)
                    setTimeout(async () => {
                        if (!httpServer) {
                            reject()
                            return
                        }
                        httpServer.close()
                        await tryStart()
                    }, 1000)
                })
                .on("close", () => {
                    chlog.info(`Server closed.`)
                    reject()
                })
        }
        await tryStart()

        setTimeout(() => {
            if (success && httpServer) {
                resolve(httpServer)
            } else {
                reject(null)
            }
        }, Number(RETRY) * 1000 + 50)
    })
}

export async function start() {
    const version = process.env.npm_package_version
    if (version) {
        log.info(`Starting Everglot version ${version}`)
    } else {
        log.info(`Starting Everglot (version unknown).`)
    }

    const db = await connectToDatabase()
    if (!db) {
        log.error(`Failed to connect to database. Exiting.`)
        console.log(`Failed to connect to database. Exiting.`)
        process.exit(1)
    }

    await initializeServersidePostgraphile()

    const onFail = () => {
        log.error(`Failed to start web server. Exiting.`)
        console.log(`Failed to start web server. Exiting.`)
        process.exit(1)
    }
    const httpServer = await startWebServer(db).catch(onFail)

    /** Start Socket.IO (WebSocket) chat server. */
    chat.start(httpServer, db)

    notifications.listen()
}

export async function stop() {
    notifications.stop()

    if (httpServer) {
        httpServer.close()
    }

    await stopServersidePostgraphile()

    await disconnectFromDatabase()
}

export default start
