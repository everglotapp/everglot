import { ensureJson, serverError } from "../helpers"

import log from "../logger"

import type { Request, Response } from "express"

export async function post(req: Request, res: Response, _next: () => void) {
    if (!ensureJson(req, res)) {
        return
    }
    req.session.destroy((err: any) => {
        if (err) {
            log.child({ err }).error("Failed to destroy session")
            serverError(res)
        } else {
            log.debug("Successfully destroyed session")
            res.status(200).json({
                success: true,
                message: null,
            })
        }
    })
}
