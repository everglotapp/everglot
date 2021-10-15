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

export const USER_UPLOADED_RECORDINGS_DIRECTORY = path.resolve(
    __dirname,
    "../../../dynamic/recordings/"
)

export const USER_UPLOADED_RECORDINGS_ACCEPTED_CONTENT_TYPES = [
    "audio/ogg",
    "audio/webm",
    "audio/mp4",
] as const

export const RTC_TOKEN_VALID_SECONDS = 24 * 60 * 60 // 24 hours

export const RESET_PASSWORD_TOKEN_VALID_SECONDS = 3 * 24 * 60 * 60 // 3 days
