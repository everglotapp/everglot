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

export function unauthorized(
    res: Response,
    message = "You need to be signed in to perform this action."
) {
    console.log("Unauthorized access")
    res.status(401).json({
        success: false,
        message,
    })
}
