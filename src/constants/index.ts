import { v4 as uuidv4 } from "uuid"

export const EVERGLOT_WEBSITE_BASE_URL = "https://everglot.com" as const

export const ANDROID_WEBVIEW_USER_AGENT = "ANDROID_WEBVIEW" as const
export const IOS_WEBVIEW_USER_AGENT = "IOS_WEBVIEW" as const
export const MOBILE_APP_USER_AGENTS = [
    IOS_WEBVIEW_USER_AGENT,
    ANDROID_WEBVIEW_USER_AGENT,
] as const

export const GOOGLE_WEB_SIGNIN_CLIENT_ID =
    "457984069949-bgc3aj14fi47olkp0arn7is4cr07cfla.apps.googleusercontent.com"
export const GOOGLE_IOS_SIGNIN_CLIENT_ID =
    "457984069949-79sdutia34vvkn2fcetcq1sblmhe38gk.apps.googleusercontent.com"
export const GOOGLE_SIGNIN_AUDIENCE = [
    GOOGLE_WEB_SIGNIN_CLIENT_ID,
    GOOGLE_IOS_SIGNIN_CLIENT_ID,
]
export const AGORA_APP_ID = "38aefcc1e5254b578fb65665fe227ed5"

export * from "./posts"
export * from "./locales"

export const MESSAGE_PREVIEW_BASE_PATH = "/images/preview" as const
export const USER_UPLOADED_IMAGES_BASE_PATH = "/images/uploads" as const
export const USER_UPLOADED_RECORDINGS_BASE_PATH = "/recordings" as const
export const USER_AVATARS_BASE_PATH =
    `${USER_UPLOADED_IMAGES_BASE_PATH}/avatars` as const
export const USER_POST_RECORDINGS_BASE_PATH =
    `${USER_UPLOADED_RECORDINGS_BASE_PATH}/` as const

export const USER_UPLOAD_AVATAR_FILE_FORM_FIELD = "avatar" as const
export const USER_CREATE_POST_RECORDING_FILE_FORM_FIELD = "recording" as const

export const WEBRTC_CONTEXT_KEY = "WEBRTC"

export const SIDEBAR_MENU_ICON_BUTTON_ID = uuidv4()
export const ENLARGEN_PROFILE_PICTURE_BUTTON_ID = uuidv4()

export const ENABLE_FLUENT_BIDIRECTIONAL_SUPPORT = false
