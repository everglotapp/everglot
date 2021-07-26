import { performQuery } from "../gql"
import log from "../../logger"

import {
    GroupMessageNotification,
    GroupMessageNotificationQuery,
} from "../../types/generated/graphql"
import type { ChatMessage } from "../../types/chat"
import type { FcmParamsV1 } from "./params/v1"
import { enqueueFcmNotification } from "./fcm"
import { getGroupIdByUuid } from "../groups"
import { NotificationParamsVersion } from "./params"

const chlog = log.child({ namespace: "notifications" })

const GROUP_MESSAGE_PUSH_NOTIFICATION_EXPIRY_MS = 1000 * 60 * 15 // 15 minutes

export async function notifyMessageRecipients(
    chatMessage: ChatMessage,
    groupUuid: string
) {
    if (!chatMessage.userUuid) {
        // do not notify for bot messages
        return
    }
    const groupId = await getGroupIdByUuid(groupUuid)
    if (!groupId) {
        chlog
            .child({ groupUuid })
            .error(
                "Failed to get group ID by UUID for group message FCM notification"
            )
        return
    }
    const notification = new GroupMessageNotificationBuilder(
        chatMessage,
        groupUuid
    )
    if (!(await notification.canBeSent())) {
        chlog
            .child({ notification })
            .error(
                "Group message notification could not be sent for an unknown reason"
            )
        return
    }
    const messageParams = {
        notification: {
            title: notification.title,
            body: notification.body,
        },
        data: notification.data,
    }
    const params: FcmParamsV1 = {
        message: messageParams,
        excludeUserUuids: [chatMessage.userUuid],
    }
    chlog.child({ params }).trace("Enqueuing group message notification")
    const expiresAt = new Date(
        Date.now() + GROUP_MESSAGE_PUSH_NOTIFICATION_EXPIRY_MS
    )
    const result = await enqueueFcmNotification(
        { userId: null, groupId },
        expiresAt,
        null,
        {
            version: NotificationParamsVersion.V1,
            ...params,
        }
    )
    if (result) {
        chlog
            .child({ params })
            .debug("Successfully enqueued group message notification")
    } else {
        chlog
            .child({ params })
            .error("Failed to enqueue group message notification")
    }
}

class GroupMessageNotificationBuilder {
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

    async init() {
        if (!this.message.userUuid) {
            // do not notify for bot messages
            return
        }
        if (typeof this.queryResult !== "undefined") {
            return
        }
        const res = await performQuery<GroupMessageNotificationQuery>(
            GroupMessageNotification.loc!.source,
            { groupUuid: this.groupUuid, senderUuid: this.message.userUuid }
        )
        if (!res.data?.groupByUuid) {
            this.queryResult = null
        }
        this.queryResult = res.data || null
    }
}
