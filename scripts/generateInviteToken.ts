import { generateInviteToken } from "../src/helpers/tokens"
import { createInviteToken } from "../src/server/inviteTokens"
import { connectToDatabase, disconnectFromDatabase } from "../src/server/db"
import gql from "../src/server/gql"
;(async () => {
    const db = await connectToDatabase()
    if (!db) {
        console.error(`Failed to connect to database. Exiting.`)
        process.exit(1)
    }

    await gql.start()

    const shutdown = async () => {
        await gql.stop()

        await disconnectFromDatabase()
    }

    const newInviteToken = await generateInviteToken()
    if (!newInviteToken) {
        console.error(`Invite token generation failed`)
        await shutdown()
        process.exit(1)
    }

    if (!(await createInviteToken({ userId: null, token: newInviteToken }))) {
        console.error(`Failed to insert invite token`)
        await shutdown()
        process.exit(1)
    }
    console.log()
    console.log(newInviteToken)
    console.log()
    shutdown()
})()
