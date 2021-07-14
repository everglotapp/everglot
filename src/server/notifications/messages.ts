import { performQuery } from "../gql"
import { getApp } from "../firebase"
import log from "../../logger"

import type { GroupMessageNotificationQuery } from "../../types/generated/graphql"
import type { ChatMessage } from "../../types/chat"

const chlog = log.child({ namespace: "notifications" })

export async function notifyMessageRecipients(
    chatMessage: ChatMessage,
    groupUuid: string
) {
    if (!chatMessage.userUuid) {
        // do not notify for bot messages
        return
    }
    const notification = new GroupMessageNotification(chatMessage, groupUuid)
    if (!(await notification.canBeSent())) {
        chlog
            .child({ notification })
            .error(
                "Group message notification could not be sent for an unknown reason"
            )
        return
    }
    const tokens = notification.fcmTokens
    if (!tokens.length) {
        chlog
            .child({ notification })
            .trace(
                "Group message notification could not be sent because there are no relevant FCM tokens to send to"
            )
        return
    }
    const multicastMessage = {
        tokens,
        notification: {
            title: notification.title,
            body: notification.body,
        },
        data: notification.data,
    }
    chlog
        .child({ multicastMessage })
        .debug("Dispatching group message notification")
    getApp().messaging().sendMulticast(multicastMessage)
}

class GroupMessageNotification {
    message: ChatMessage
    groupUuid: string
    queryResult: GroupMessageNotificationQuery | null | undefined

    constructor(message: ChatMessage, groupUuid: string) {
        this.message = message
        this.groupUuid = groupUuid
    }

    async canBeSent(): Promise<Boolean> {
        await this.init()
        return Boolean(this.queryResult)
    }

    get title(): string {
        if (!this.queryResult) {
            return ""
        }
        const { groupByUuid, userByUuid } = this.queryResult
        const groupName = groupByUuid?.groupName
        let groupAlpha2 = groupByUuid?.language?.alpha2 || null
        groupAlpha2 = groupAlpha2 ? groupAlpha2.toUpperCase() : null
        const groupSkill = groupByUuid?.languageSkillLevel?.name || null
        const username = userByUuid?.username
        if (!groupName || !groupName.length) {
            return "New message in group chat"
        }
        const senderName = username && username.length ? username : "Someone"
        const groupDetails = `${groupAlpha2}${
            groupSkill ? ` ${groupSkill}` : ""
        }`
        return `${senderName} – ${groupName} (${groupDetails})`
    }

    get body(): string {
        return this.message.text
    }

    get data(): { type: string; recipientGroupUuid: string } {
        return {
            type: "GROUP_MESSAGE",
            recipientGroupUuid: this.groupUuid,
            //recipientUuid: "",
        }
    }

    get fcmTokens(): string[] {
        if (!this.queryResult) {
            return []
        }
        const groupUserNodes =
            this.queryResult.groupByUuid?.groupUsers.nodes || []
        return groupUserNodes.reduce((tokenArr, groupUserNode) => {
            if (
                !groupUserNode ||
                !groupUserNode.user ||
                // do not notify the message's sender
                groupUserNode.user.uuid === this.message.userUuid
            ) {
                return tokenArr
            }
            const userDeviceNodes = groupUserNode.user.userDevices.nodes
            return [
                ...tokenArr,
                ...(userDeviceNodes
                    .filter((device) => device && device.fcmToken !== null)
                    .map((device) => device!.fcmToken!) || []),
            ]
        }, [])
    }

    async init() {
        if (!this.message.userUuid) {
            // do not notify for bot messages
            return
        }
        if (typeof this.queryResult !== "undefined") {
            return
        }
        const res = await performQuery<GroupMessageNotificationQuery>(
            `query GroupMessageNotification($groupUuid: UUID!, $senderUuid: UUID!) {
                groupByUuid(uuid: $groupUuid) {
                    groupUsers {
                        nodes {
                            user {
                                uuid
                                userDevices {
                                    nodes {
                                        fcmToken
                                    }
                                }
                            }
                        }
                    }
                    groupName
                    uuid
                    language {
                        alpha2
                    }
                    languageSkillLevel {
                        name
                    }
                }
                userByUuid(uuid: $senderUuid) {
                    username
                }
            }
            `,
            { groupUuid: this.groupUuid, senderUuid: this.message.userUuid }
        )
        if (!res.data?.groupByUuid) {
            this.queryResult = null
        }
        this.queryResult = res.data || null
    }
}
