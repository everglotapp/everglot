import { derived, writable } from "svelte/store"

export const matomoInitialized = writable<boolean>(false)

export const matomoStore = derived(matomoInitialized, ($matomoInitialized) =>
    $matomoInitialized &&
    typeof window !== "undefined" &&
    "Matomo" in window &&
    window.Matomo
        ? window.Matomo
        : null
)
