import { writable } from "svelte/store"

export const signedIn = writable<boolean>(false)
export const username = writable<string | null>(null)
export const room = writable<string>("")
