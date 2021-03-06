import { writable } from "svelte/store"

export const signedIn = writable(false)
export const username = writable(null)
export const room = writable("English")
