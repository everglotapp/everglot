import log from "../../logger"

import {
    CreateUserDevice,
    CreateUserDeviceMutation,
    CreateUserDeviceMutationVariables,
} from "../../types/generated/graphql"
import { performQuery } from "../gql"

const chlog = log.child({ namespace: "notifications-fcm" })

export async function createUserDevice(
    userDevice: CreateUserDeviceMutationVariables
): Promise<CreateUserDeviceMutation["createUserDevice"] | null> {
    const res = await performQuery<CreateUserDeviceMutation>(
        CreateUserDevice.loc!.source,
        { ...userDevice }
    )
    chlog.child({ userDevice }).debug("Successfully created user device")
    return res.data?.createUserDevice || null
}
