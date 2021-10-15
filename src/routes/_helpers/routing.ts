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
}

const ROUTE_TO_PAGE: Record<string, Page> = {
    "/": Page.Feed,
    "/login": Page.Login,
    "/join": Page.Join,
    "/chat": Page.Chat,
    "/global": Page.Global,
    "/privacy": Page.Privacy,
    "/datenschutz": Page.Datenschutz,
    "/s": Page.Squeek,
    "/u": Page.OtherUserProfile,
    "/signup": Page.Signup,
    "/profile": Page.Profile,
    "/users/password/reset": Page.ResetPassword,
} as const

export function getPage(path: string): Page | null {
    const page = ROUTE_TO_PAGE[path]
    if (typeof page === "undefined") {
        if (path.startsWith("/users/password/reset/")) {
            return Page.ResetPasswordToken
        }
        return null
    }
    return page
}
