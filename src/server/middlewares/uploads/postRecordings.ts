import multer from "multer"
import mime from "mime-types"
import UIDGenerator from "uid-generator"

import {
    USER_UPLOADED_RECORDINGS_DIRECTORY,
    USER_UPLOADED_RECORDINGS_ACCEPTED_CONTENT_TYPES,
} from "../../constants"

import log from "../../../logger"

const chlog = log.child({
    namespace: "uploads-post-recordings",
})

const uidgen = new UIDGenerator(256, UIDGenerator.BASE62)

const postRecordingsStorage = multer.diskStorage({
    destination: function (_req, file, cb) {
        if (
            !USER_UPLOADED_RECORDINGS_ACCEPTED_CONTENT_TYPES.some(
                (acceptedType) => acceptedType === file.mimetype
            )
        ) {
            chlog
                .child({ file })
                .error(
                    "User tried to upload a post recording with non-accepted content type"
                )
            cb(new Error("Only Ogg bitstream recordings are accepted"), "")
            return
        }
        cb(null, USER_UPLOADED_RECORDINGS_DIRECTORY)
    },
    filename: async function (_req, file, cb) {
        const extension = mime.extension(file.mimetype)
        if (!extension || !extension.length) {
            chlog
                .child({ file })
                .error("Failed to resolve extension for mime type")
            cb(new Error("Unknown recording type"), "")
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

export const postRecordings = multer({ storage: postRecordingsStorage })
export default postRecordings
