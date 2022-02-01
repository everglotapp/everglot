import type { Socket } from "socket.io"

declare module "express-session" {
    import type { SessionData } from "express-session"
    interface SessionData {
        user_id?: number
    }
}

declare global {
    namespace Express {
        import type { Session, SessionData } from "express-session"
        interface Request {
            session: Session & Partial<SessionData> & { user_id: string }
        }
    }
}
