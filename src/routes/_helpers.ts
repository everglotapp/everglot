import type { SapperResponse } from "@sapper/server"

export function serverError(res: SapperResponse) {
    res.end(
        JSON.stringify({
            success: false,
            message: "Something went wrong while processing your request.",
        })
    )
}
