<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"
    import { userHasCompletedProfile } from "../stores"
    import { currentUserStore } from "../stores/currentUser"

    import { query } from "@urql/svelte"

    query(currentUserStore)

    let redirectTimeout: number | null = null

    function clearRedirectTimeout(): void {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    }

    $: if ($userHasCompletedProfile) {
        clearRedirectTimeout()
        goto("/global", { replaceState: true, noscroll: false })
    }

    onMount(() => {
        if ($currentUserStore.stale) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    goto("/signup", { replaceState: true, noscroll: false })
                    clearRedirectTimeout()
                }, 800)
            }
        }
    })

    onDestroy(() => {
        clearRedirectTimeout()
    })
</script>

<div />
