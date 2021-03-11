import type { Session } from "express-session"

declare module "express-session" {
    interface SessionData {
        user_id: number
    }
}
