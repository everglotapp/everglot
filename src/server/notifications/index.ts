import { performQuery } from "../gql"
import log from "../../logger"

import {
    CreateUserDevice,
    CreateUserDeviceMutation,
    CreateUserDeviceMutationVariables,
} from "../../types/generated/graphql"

const chlog = log.child({ namespace: "notifications" })

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
