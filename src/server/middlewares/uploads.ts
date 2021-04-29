import multer from "multer"
import mime from "mime-types"
import UIDGenerator from "uid-generator"

import type { Request, Response } from "express"

import {
    USER_UPLOADED_IMAGES_DIRECTORY,
    USER_UPLOADED_IMAGES_ACCEPTED_CONTENT_TYPES,
} from "../constants"

const uidgen = new UIDGenerator(256, UIDGenerator.BASE62)

const avatarUploadsStorage = multer.diskStorage({
    destination: function (_req, file, cb) {
        if (
            !USER_UPLOADED_IMAGES_ACCEPTED_CONTENT_TYPES.some(
                (acceptedType) => acceptedType === file.mimetype
            )
        ) {
            cb(new Error("Only JPG and PNG images are accepted"), "")
            return
        }
        cb(null, `${USER_UPLOADED_IMAGES_DIRECTORY}/avatars`)
    },
    filename: async function (_req, file, cb) {
        const extension = mime.extension(file.mimetype)
        if (!extension || !extension.length) {
            cb(new Error("Unknown image type"), "")
            return
        }
        const filename = await uidgen.generate().catch(() => null)
        if (!extension) {
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
