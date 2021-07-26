import log from "../../logger"

import email from "./email"
import fcm from "./fcm"

const chlog = log.child({ namespace: "notifications" })

export function listen() {
    chlog.debug("Listening for notifications")
    fcm.listen()
    email.listen()
}

export function stop() {
    chlog.debug("Removing notification listeners")
    email.stop()
    fcm.stop()
}

export default { listen, stop }
