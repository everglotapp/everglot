import start from "./server/start"

const dev = process.env.NODE_ENV === "development"
if (dev) {
    const dotenv = require("dotenv")
    const dotenvExpand = require("dotenv-expand")

    const myEnv = dotenv.config()
    dotenvExpand(myEnv)
}

void start()
