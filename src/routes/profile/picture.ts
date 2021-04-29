import log from "../../logger"

import type { Request, Response } from "express"

export async function post(req: Request, res: Response, _next: () => void) {
    // save to user record
    log.child({ file: req.file }).debug("Parsed avatar file")
}
