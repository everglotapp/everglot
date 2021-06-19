import { performQuery } from "./gql"
import { getApp } from "./firebase"

import type {
    CreateUserDeviceMutation,
    CreateUserDeviceMutationVariables,
    GroupMessageNotificationQuery,
} from "../types/generated/graphql"
import type { ChatMessage } from "../types/chat"

export async function notifyMessageRecipients(
    chatMessage: ChatMessage,
    groupUuid: string
) {
    const notification = await getGroupMessageNotification(groupUuid)
    if (!notification) {
        return
    }
    if (!chatMessage.userUuid) {
        // do not notify for bot messages
        return
    }
    const tokens =
        notification.groupByUuid?.groupUsers.nodes.reduce(
            (tokenArr, groupUser) => {
                if (
                    !groupUser ||
                    !groupUser.user ||
                    groupUser.user.uuid === chatMessage.userUuid
                ) {
                    return tokenArr
                }
                return [
                    ...tokenArr,
                    ...(groupUser.user.userDevices.nodes
                        .filter((device) => device && device.fcmToken !== null)
                        .map((device) => device!.fcmToken!) || []),
                ]
            },
            []
        ) || []
    if (!tokens.length) {
        return
    }
    const groupName = notification.groupByUuid?.groupName
    getApp()
        .messaging()
        .sendMulticast({
            tokens,
            notification: {
                title:
                    groupName && groupName.length
                        ? `New message in ${groupName}`
                        : `New message in group chat`,
                body: chatMessage.text,
            },
            // data: {},
        })
}

async function getGroupMessageNotification(
    uuid: string
): Promise<GroupMessageNotificationQuery | null> {
    const res = await performQuery<GroupMessageNotificationQuery>(
        `query GroupMessageNotification($uuid: UUID!) {
            groupByUuid(uuid: $uuid) {
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
            }
        }`,
        { uuid }
    )
    if (!res.data?.groupByUuid) {
        return null
    }
    return res.data || null
}

export async function createUserDevice(
    userDevice: CreateUserDeviceMutationVariables
): Promise<CreateUserDeviceMutation["createUserDevice"] | null> {
    const res = await performQuery<CreateUserDeviceMutation>(
        `mutation CreateUserDevice($userId: Int!, $fcmToken: String) {
            createUserDevice(
                input: { userDevice: { userId: $userId, fcmToken: $fcmToken } }
            ) {
                userDevice {
                    uuid
                    fcmToken
                    id
                }
            }
        }`,
        { ...userDevice }
    )
    if (!res.data) {
        return null
    }
    return res.data?.createUserDevice
}
