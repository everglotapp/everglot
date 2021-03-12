import type { Request, Response } from "express"

export function serverError(
    res: Response,
    message = "Something went wrong while processing your request."
) {
    res.status(500).json({
        success: false,
        message,
    })
}

const CONTENT_TYPE_JSON = "application/json"
export function ensureJson(req: Request, res: Response) {
    res.setHeader("Content-Type", CONTENT_TYPE_JSON)
    if (
        !req.headers.hasOwnProperty("content-type") ||
        req.headers["content-type"] !== CONTENT_TYPE_JSON
    ) {
        res.status(415).json({
            success: false,
            message: "This endpoint only accepts JSON data",
        })
        res.end()
    }
}
