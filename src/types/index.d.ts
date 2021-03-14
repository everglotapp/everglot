import type { Session } from "express-session"
import type { Socket } from "socket.io"

declare module "express-session" {
    interface SessionData {
        user_id: number
    }
}

declare global {
    interface EverglotChatSocket extends Socket {
        request: SocketIO.IncomingMessage & {
            session: SessionData
        }
    }
}
