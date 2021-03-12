import { ensureJson, serverError } from "../helpers"

import type { Request, Response } from "express"

export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
    req.session.destroy((err: any) => {
        if (err) {
            console.log("Failed to destroy session", err)
            serverError(res)
        } else {
            console.log("Successfully destroyed session")
            res.status(200).json({
                success: true,
                message: null,
            })
        }
    })
}
