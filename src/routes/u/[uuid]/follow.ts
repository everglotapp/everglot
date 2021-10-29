import { validate as uuidValidate } from "uuid"
import { forbidden, unprocessableEntity } from "../../../helpers"

import log from "../../../logger"

const chlog = log.child({
    namespace: "u-uuid-follow",
})

import type { Request, Response } from "express"
import { createUserFollowership, getUserIdByUuid } from "../../../server/users"
import { getUserFollowershipNotification } from "../../../server/notifications/followerships"
import { enqueueFcmNotification } from "../../../server/notifications/fcm"
import { NotificationParamsVersion } from "../../../server/notifications/params"
import { userHasCompletedProfile } from "../../../server/users"
import {
    FcmMessageParamsDataTypeV1,
    InAppParamsTypeV1,
} from "../../../server/notifications/params/v1"
import { enqueueInAppNotification } from "../../../server/notifications/inApp"

const NOTIFICATION_EXPIRY_SECONDS = 60 * 60
/**
 * Allows user to cancel the notification
 * by unfollowing within this timeframe.
 */
const NOTIFICATION_WITHHELD_SECONDS = 10

async function notifyFollowedUser(userFollower: { id: number }) {
    const notificationData = await getUserFollowershipNotification(
        userFollower.id
    )
    if (!notificationData) {
        chlog
            .child({ userFollower })
            .error("No notification data for user followership")
        return
    }
    const { follower, user } = notificationData
    if (!follower || !user) {
        chlog
            .child({ userFollower, notificationData })
            .error("Missing notification data for user followership")
        return
    }
    const expiresAt = new Date(Date.now() + NOTIFICATION_EXPIRY_SECONDS * 1000)
    const withheldUntil = new Date(
        Date.now() + NOTIFICATION_WITHHELD_SECONDS * 1000
    )
    const username =
        follower.displayName && follower.displayName.length
            ? follower.displayName
            : follower.username
    enqueueFcmNotification(
        { userId: user.id, groupId: null },
        expiresAt,
        withheldUntil,
        {
            message: {
                notification: {
                    title: `${
                        username && username.length ? username : "Someone"
                    } now follows you`,
                },
                data: {
                    type: FcmMessageParamsDataTypeV1.UserFollowership,
                },
            },
            version: NotificationParamsVersion.V1,
        }
    )
    enqueueInAppNotification({ userId: user.id, groupId: null }, null, null, {
        version: NotificationParamsVersion.V1,
        type: InAppParamsTypeV1.UserFollowership,
        data: {
            userUuid: follower.uuid,
        },
    })
}

export async function post(req: Request, res: Response, next: () => void) {
    const { user_id: currentUserId } = req.session
    if (!currentUserId) {
        res.redirect("/")
        return
    }
    if (!(await userHasCompletedProfile(currentUserId))) {
        forbidden(res, "Please complete your profile")
        return
    }
    const uuid = req.params["uuid"]
    if (!uuidValidate(uuid)) {
        chlog.child({ currentUserId, uuid }).debug("Invalid UUID")
        next()
        return
    }
    const userId = await getUserIdByUuid(uuid)
    if (!userId) {
        chlog.child({ uuid }).debug("Did not find user ID by UUID")
        next()
        return
    }
    if (userId === currentUserId) {
        chlog
            .child({ userId, currentUserId })
            .debug("User tried to follow themselves")
        unprocessableEntity(res, "You cannot follow yourself")
        return
    }
    const userFollowership = await createUserFollowership({
        userId,
        followerId: currentUserId,
    })
    if (userFollowership) {
        chlog
            .child({ userFollowership })
            .debug("User successfully followed another")
        res.json({
            success: true,
        })
        notifyFollowedUser(userFollowership)
    } else {
        chlog
            .child({ userFollowership, followerId: currentUserId, userId })
            .debug("Failed to follow user")
        unprocessableEntity(res, "You already follow this user")
    }
}
