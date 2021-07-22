import log from "../../logger"

import email from "./email"

const chlog = log.child({ namespace: "notifications" })

export function listen() {
    chlog.debug("Listening for notifications")
    email.listen()
}

export function stop() {
    chlog.debug("Removing notification listeners")
    email.stop()
}

export default { listen, stop }
