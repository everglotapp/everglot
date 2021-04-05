<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"

    export let to: string = ""
    export let gotoArgs:
        | { replaceState: boolean; noscroll: boolean }
        | undefined = { replaceState: true, noscroll: false }

    let redirectTimeout: number | null = null
    let redirectIntervalMs: number = 800
    let done = false

    async function redirect() {
        if (done) {
            return
        }
        await goto(to, { replaceState: true, noscroll: false })
        done = true
    }

    onMount(() => {
        if (redirectTimeout === null) {
            redirectTimeout = window.setTimeout(() => {
                redirect()
                redirectTimeout = null
            }, redirectIntervalMs)
        }
    })

    onDestroy(() => {
        if (redirectTimeout !== null) {
            window.clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    })
</script>
