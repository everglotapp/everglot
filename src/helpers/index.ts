import type { Response } from "express"

export function serverError(
    res: Response,
    message = "Something went wrong while processing your request."
) {
    res.status(500).json({
        success: false,
        message,
    })
}
