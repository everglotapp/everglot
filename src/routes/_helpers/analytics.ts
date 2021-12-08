import { get } from "svelte/store"
import { SITE_ID, TRACKER_URL } from "../../constants"
import { matomoStore } from "../../stores/analytics"

function getTracker(): MatomoTracker | null {
    const matomo = get(matomoStore)
    if (!matomo) {
        return null
    }
    return matomo.getTracker(TRACKER_URL, SITE_ID)
}

export function trackPageView() {
    const tracker = getTracker()
    if (!tracker) {
        return
    }
    tracker.trackPageView()
}

export function trackEvent<T extends EventCategory>(
    category: T,
    action: EventAction<T>,
    name?: string,
    value?: string
) {
    const tracker = getTracker()
    if (!tracker) {
        return
    }
    tracker.trackEvent(category, action, name, value)
}
