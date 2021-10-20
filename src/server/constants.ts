import path from "path"

export const APP_BASE_URL = "https://app.everglot.com" as const

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

export const BCRYPT_WORK_FACTOR = 14
export const RESET_PASSWORD_TOKEN_VALID_SECONDS = 60 * 60 // 1 hour

export const MAX_POST_BODY_LENGTH = 2048
