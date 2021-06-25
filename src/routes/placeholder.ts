import type { Request, Response } from "express"

export function get(_req: Request, res: Response, _next: () => void) {
    res.status(200).send(
        "<!DOCTYPE html><html><head></head><body></body></html>"
    )
}
