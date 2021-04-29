import path from "path"

export const MESSAGE_PREVIEW_IMAGES_DIRECTORY = path.resolve(
    __dirname,
    "../../../dynamic/images/preview"
)

export const MESSAGE_PREVIEW_IMAGES_ACCEPTED_CONTENT_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
] as const

export const USER_UPLOADED_IMAGES_DIRECTORY = path.resolve(
    __dirname,
    "../../../dynamic/images/uploads"
)

export const USER_UPLOADED_IMAGES_ACCEPTED_CONTENT_TYPES = [
    "image/jpg",
    "image/jpeg",
    "image/png",
] as const
