import log from "../logger"
import type { Request, Response } from "express"

export function unprocessableEntity(
    res: Response,
    message = "Request data invalid."
) {
    res.status(422).json({
        success: false,
        message,
    })
}

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
/**
 * Ends the response if request wasn't of type `application/json`.
 * Sets response `content-type` to `application/json`.
 *
 * Among others, this function ensures CSRF protection because
 * the Same-Origin Policy should prevent AJAX request forgery.
 *
 * @returns Whether request has content type `application/json`.
 */
export function ensureJson(req: Request, res: Response): boolean {
    if (!ensureJsonRequest(req, res)) {
        return false
    }
    res.setHeader("Content-Type", CONTENT_TYPE_JSON)
    return true
}

export function ensureJsonRequest(req: Request, res: Response): boolean {
    if (
        !req.headers.hasOwnProperty("content-type") ||
        req.headers["content-type"] !== CONTENT_TYPE_JSON
    ) {
        log.debug("Received non-JSON request to JSON only endpoint")
        res.status(415).json({
            success: false,
            message: "This endpoint only accepts JSON data",
        })
        res.end()
        return false
    }
    return true
}

/**
 * Sets response `content-type` to `application/json`.
 */
export function jsonResponse(res: Response): void {
    res.setHeader("Content-Type", CONTENT_TYPE_JSON)
}
