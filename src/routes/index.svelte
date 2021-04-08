<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"
    import { currentUserStore, userHasCompletedProfile } from "../stores"

    import { query } from "@urql/svelte"

    query(currentUserStore)

    let redirectTimeout: number | null = null

    function clearRedirectTimeout(): void {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    }

    onMount(() => {
        if ($currentUserStore.fetching) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    goto("/profile", { replaceState: true, noscroll: false })
                    clearRedirectTimeout()
                }, 800)
            }
        } else if ($userHasCompletedProfile) {
            clearRedirectTimeout()
            goto("/global", { replaceState: true, noscroll: false })
        }
    })

    onDestroy(() => {
        clearRedirectTimeout()
    })
</script>

<div class="mx-auto">…</div>
