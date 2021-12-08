interface Window {
    _paq?: any[][]
    Matomo?: Matomo
}

type EventCategory = "MainNav" | "Feed"

type CATEGORY_ACTIONS = {
    MainNav:
        | "ClickFeed"
        | "ClickGroups"
        | "ClickOpenGroupsDropdown"
        | "ClickCloseGroupsDropdown"
        | "ClickAwayCloseGroupsDropdown"
        | "EscapeCloseGroupsDropdown"
        | "ClickGroup"
        | "ClickNotifications"
        | "ClickOpenSettingsDropdown"
        | "ClickCloseSettingsDropdown"
        | "ClickAwayCloseSettingsDropdown"
        | "EscapeCloseSettingsDropdown"
        | "ClickProfile"
        | "ClickOpenInviteFriendsModal"
        | "ClickIOS"
        | "ClickAndroid"
        | "ClickFeedback"
        | "ClickPrivacy"
        | "ClickSignOut"
        | "ClickSignUp"
        | "ClickLogo"
        | "ClickOpenSidebar"
        | "ClickCloseSidebar"
        | "ClickJoinGroupCall"
    Feed:
        | "ClickShufflePromptsInitial"
        | "ClickShufflePrompts"
        | "ClickClosePrompt"
        | "ClickOpenLocaleDropdown"
        | "ClickCloseLocaleDropdown"
        | "ClickAwayCloseLocaleDropdown"
        | "EscapeCloseLocaleDropdown"
        | "PickLocale"
        | "ClickPost"
}

type EventAction<T extends EventCategory> = T extends keyof CATEGORY_ACTIONS
    ? CATEGORY_ACTIONS[T]
    : never

interface MatomoTracker {
    // Log a page view
    trackPageView(customTitle?: string): void
    // Log an event with an event category (Videos, Music, Games...), an event action (Play, Pause, Duration, Add Playlist, Downloaded, Clicked...), and an optional event name and optional numeric value.
    trackEvent(
        category: string,
        action: string,
        name?: string,
        value?: string
    ): void
}

interface Matomo {
    getTracker(trackerUrl: string, siteId: string): MatomoTracker
}
