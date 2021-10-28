export const enum Page {
    Feed,
    Login,
    Join,
    Signup,
    Chat,
    Global,
    Privacy,
    Datenschutz,
    Profile,
    OtherUserProfile,
    SignupSuccess,
    Squeek,
    ResetPassword,
    ResetPasswordToken,
    Notifications,
}

const ROUTE_TO_PAGE: Record<string, Page> = {
    "/": Page.Feed,
    "/login": Page.Login,
    "/join": Page.Join,
    "/chat": Page.Chat,
    "/global": Page.Global,
    "/privacy": Page.Privacy,
    "/datenschutz": Page.Datenschutz,
    "/signup": Page.Signup,
    "/signup/success": Page.SignupSuccess,
    "/profile": Page.Profile,
    "/users/password/reset": Page.ResetPassword,
    "/notifications": Page.Notifications,
} as const

export function getPage(path: string): Page | null {
    const page = ROUTE_TO_PAGE[path]
    if (typeof page === "undefined") {
        if (path.startsWith("/users/password/reset/")) {
            return Page.ResetPasswordToken
        }
        if (path.startsWith("/u/")) {
            return Page.OtherUserProfile
        }
        if (path.startsWith("/s/")) {
            return Page.Squeek
        }
        return null
    }
    return page
}
