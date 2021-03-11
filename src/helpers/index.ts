import type { Response } from "express"

export function serverError(res: Response) {
    res.end(
        JSON.stringify({
            success: false,
            message: "Something went wrong while processing your request.",
        })
    )
}
