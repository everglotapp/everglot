import { getApp } from "../firebase"
import log from "../../logger"
import type { AdminEmailsFcmTokensQuery } from "../../types/generated/graphql"
import { performQuery } from "../gql"

const chlog = log.child({ namespace: "admin-notifications" })

const { ADMIN_EMAILS = "[]" } = process.env

export async function notifyAdminsOfNewUser() {
    const tokens = await getAdminFcmTokens()
    if (!tokens.length) {
        chlog.trace(
            "Admin new user registration notification could not be sent because there are no relevant FCM tokens to send to"
        )
        return
    }
    const multicastMessage = {
        tokens,
        notification: {
            title: `New user registered`,
        },
    }
    chlog
        .child({ multicastMessage })
        .debug("Dispatching admin new user registration message notification")
    getApp().messaging().sendMulticast(multicastMessage)
}

export async function notifyAdminsOfSignUp(username: string) {
    const tokens = await getAdminFcmTokens()
    if (!tokens.length) {
        chlog.trace(
            "Admin user sign up notification could not be sent because there are no relevant FCM tokens to send to"
        )
        return
    }
    const multicastMessage = {
        tokens,
        notification: {
            title: `New sign up: ${username}`,
        },
    }
    chlog
        .child({ multicastMessage })
        .debug("Dispatching admin user sign up message notification")
    getApp().messaging().sendMulticast(multicastMessage)
}

async function getAdminFcmTokens(): Promise<string[]> {
    if (!ADMIN_EMAILS || !ADMIN_EMAILS.length) {
        chlog
            .child({ ADMIN_EMAILS })
            .warn("ADMIN_EMAILS environment variable should be set.")
        return []
    }
    let emails: string[] | null
    try {
        emails = JSON.parse(ADMIN_EMAILS)
        if (
            !Array.isArray(emails) ||
            !emails.length ||
            !(emails as any[]).every((t) => typeof t === "string" && t.length)
        ) {
            throw new SyntaxError(
                "Bad format of environment variable ADMIN_EMAILS, expected a non-empty array of non-empty strings"
            )
        }
        emails = emails as string[]
    } catch (err: any) {
        chlog
            .child({ ADMIN_EMAILS, message: err.message })
            .warn(
                "ADMIN_EMAILS environment variable should be a JSON array of strings.."
            )
        return []
    }
    return (await getFcmTokensByEmails(emails)) || []
}

export async function getFcmTokensByEmails(
    emails: string[]
): Promise<string[] | null> {
    const res = await performQuery<AdminEmailsFcmTokensQuery>(
        `query AdminEmailsFcmTokens($in: [String!]!) {
            users(filter: { email: { in: $in } }) {
                nodes {
                    userDevices {
                        nodes {
                            fcmToken
                        }
                    }
                }
            }
        }
        `,
        { in: emails }
    )
    if (!res.data || !res.data.users) {
        return null
    }
    const users = res.data.users.nodes.filter(Boolean).map((node) => node!)
    const tokens = []
    for (const user of users) {
        if (!user.userDevices.nodes) {
            continue
        }
        for (const userDevice of user.userDevices.nodes) {
            if (userDevice?.fcmToken) {
                tokens.push(userDevice.fcmToken)
            }
        }
    }
    return tokens
}
