import sirv from "sirv"
import polka from "polka"
import compression from "compression"
import * as sapper from "@sapper/server"

import chat from "./server/chat"

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === "development"

const polkaInstance: polka.Polka = polka() // You can also use Express
    .use(
        compression({ threshold: 0 }),
        sirv("static", { dev }),
        sapper.middleware()
    )
polkaInstance.listen(PORT, (err: any) => {
    if (err) {
        console.log("error", err)
    }
})

const { server } = polkaInstance
if (typeof server === "undefined") {
    console.error("Failed to initialize polka server")
    process.exit(1)
}
chat.start(server)
