import { performQuery } from "../gql"
import log from "../../logger"

import type {
    CreateUserDeviceMutation,
    CreateUserDeviceMutationVariables,
} from "../../types/generated/graphql"

const chlog = log.child({ namespace: "notifications" })

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
    chlog.child({ userDevice }).debug("Successfully created user device")
    return res.data?.createUserDevice
}
