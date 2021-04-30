import multer from "multer"
import mime from "mime-types"
import UIDGenerator from "uid-generator"

import type { Request, Response } from "express"

import {
    USER_UPLOADED_IMAGES_DIRECTORY,
    USER_UPLOADED_IMAGES_ACCEPTED_CONTENT_TYPES,
} from "../constants"

import log from "../../logger"

const chlog = log.child({
    namespace: "session",
})

const uidgen = new UIDGenerator(256, UIDGenerator.BASE62)

const avatarUploadsStorage = multer.diskStorage({
    destination: function (_req, file, cb) {
        if (
            !USER_UPLOADED_IMAGES_ACCEPTED_CONTENT_TYPES.some(
                (acceptedType) => acceptedType === file.mimetype
            )
        ) {
            chlog
                .child({ file })
                .error(
                    "User tried to upload avatar with non-accepted content type"
                )
            cb(new Error("Only JPG and PNG images are accepted"), "")
            return
        }
        cb(null, `${USER_UPLOADED_IMAGES_DIRECTORY}/avatars`)
    },
    filename: async function (_req, file, cb) {
        const extension = mime.extension(file.mimetype)
        if (!extension || !extension.length) {
            chlog
                .child({ file })
                .error("Failed to resolve extension for mime type")
            cb(new Error("Unknown image type"), "")
            return
        }
        const filename = await uidgen.generate().catch(() => null)
        if (!filename) {
            chlog
                .child({ file, extension })
                .error("Failed to generate filename")
            cb(new Error("Failed to generate filename"), "")
            return
        }
        const basename = `${filename}.${extension}`
        cb(null, basename)
    },
})
const avatarUploads = multer({ storage: avatarUploadsStorage })

export function uploadsMiddleware(
    req: Request,
    res: Response,
    next: () => void
) {
    if (req.path === "/profile/picture") {
        avatarUploads.single("avatar")(req, res, next)
    } else {
        next()
    }
}
export default uploadsMiddleware
