import { validate as uuidValidate } from "uuid"
import ffmpeg from "fluent-ffmpeg"

import { serverError } from "../../../../helpers"

import log from "../../../../logger"

import type { Request, Response } from "express"
import { getPostIdByUuid, createPostRecording } from "../../../../server/posts"
import path from "path"
import { unlink } from "fs"

const chlog = log.child({
    namespace: "posts-recordings-create",
})

async function convertToM4a(
    parsedPath: path.ParsedPath
): Promise<string | null> {
    const { name, dir, base } = parsedPath
    const inputPath = `${dir}/${base}`
    const outputPath = `${dir}/${name}.m4a`
    return new Promise((resolve, _reject) => {
        ffmpeg()
            .input(inputPath)
            .output(outputPath)
            .on("end", () => resolve(outputPath))
            .on("error", () => resolve(null))
            .run()
    })
}

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        chlog.child({ userId }).error("userId unexpectedly falsy")
        throw new Error(
            "No user ID set for protected route. Are we really protected?"
        )
    }
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ userId, uuid }).debug("Invalid UUID")
        next()
        return
    }
    const postId = await getPostIdByUuid(uuid)
    if (!postId) {
        chlog.child({ userId, uuid }).debug("Did not find post by UUID")
        next()
        return
    }
    const { file } = req
    if (!file) {
        res.status(422).json({
            success: false,
            message: "Please provide a file",
        })
        return
    }
    log.child({ file, postId, userId }).debug("Parsed post recording file")

    let parsedPath = path.parse(file.path)

    const oldExtension = parsedPath.ext.startsWith(".")
        ? parsedPath.ext.substring(1)
        : parsedPath.ext
    if (oldExtension !== "m4a") {
        const newPath = await convertToM4a(parsedPath)
        unlink(file.path, (err) => {
            if (err) {
                chlog
                    .child({ inputFile: file.path })
                    .error(`Error deleting input file: ${err.message}`)
            }
            chlog
                .child({ inputFile: file.path })
                .debug(`Successfully deleted input file`)
        })
        if (!newPath) {
            serverError(res)
            return
        }
        parsedPath = path.parse(newPath)
    }

    const { name, ext } = parsedPath
    const filename = name
    const extension = ext.startsWith(".") ? ext.substring(1) : ext

    const postRecording = await createPostRecording({
        filename,
        extension,
        postId,
        userId,
    })
    if (!postRecording) {
        log.child({ parsedPath, postId, userId }).error(
            "Failed to save stored recording to database"
        )
        const fileToDeletePath = `${parsedPath.dir}/${parsedPath.base}`
        unlink(fileToDeletePath, (err) => {
            if (err) {
                chlog
                    .child({ fileToDeletePath, parsedPath, postId, userId })
                    .error(
                        `Error deleting file for a post recording that we failed to record in the database: ${err.message}`
                    )
            }
            chlog
                .child({ fileToDeletePath, parsedPath, postId, userId })
                .debug(
                    `Successfully deleted input file for a post recording that we failed to record in the database`
                )
        })
        serverError(res)
        return
    }

    log.child({ parsedPath, postId, userId }).debug(
        "Successfully saved new post recording"
    )
    res.status(200).json({
        success: true,
        meta: {
            postRecording: {
                uuid: postRecording.uuid,
                nodeId: postRecording.nodeId,
            },
        },
    })
}
