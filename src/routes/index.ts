import { userHasCompletedProfile, userGroupMemberships } from "../server/users"

import type { Request, Response } from "express"

export async function get(req: Request, res: Response, next: () => void) {
    const { user_id: userId } = req.session
    if (!userId) {
        return
    }
    if (await userHasCompletedProfile(userId)) {
        const memberships = await userGroupMemberships(userId)
        if (memberships) {
            const firstPrivateGroupMembership = memberships.find(
                (membership) =>
                    membership.node?.group &&
                    membership.node.group.global === false
            )
            if (firstPrivateGroupMembership) {
                const firstPrivateGroup =
                    firstPrivateGroupMembership.node!.group!
                res.redirect(`/chat?group=${firstPrivateGroup.uuid}`)
                return
            }
        }
        next()
        return
    }
    res.redirect("/signup")
}
