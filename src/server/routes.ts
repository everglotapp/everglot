import { APP_BASE_URL } from "./constants"

export const confirmEmail = (token: string) =>
    `${APP_BASE_URL}/email/confirm?token=${token}`

export const unsubscribeEmail = (token: string) =>
    `${APP_BASE_URL}/email/unsubscribe?token=${token}`

export const resetPassword = (token: string) =>
    `${APP_BASE_URL}/users/password/reset/${token}`

export const email = {
    confirm: confirmEmail,
    unsubscribe: unsubscribeEmail,
}

export const users = {
    password: {
        reset: resetPassword,
    },
}

export default {
    email,
    users,
}
