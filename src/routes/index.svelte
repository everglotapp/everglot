<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"
    import { currentUser } from "../stores"

    let redirectTimeout: number | null = null

    $: currentUserObject = $currentUser.fetching
        ? null
        : $currentUser.data?.currentUser
    $: userHasCompletedProfile =
        currentUserObject &&
        currentUserObject.username !== null &&
        currentUserObject.userLanguages.totalCount

    function clearRedirectTimeout(): void {
        if (redirectTimeout) {
            clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    }

    onMount(() => {
        if ($currentUser.fetching) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    goto("/profile", { replaceState: true, noscroll: false })
                    clearRedirectTimeout()
                }, 800)
            }
        } else if (userHasCompletedProfile) {
            clearRedirectTimeout()
            goto("/global", { replaceState: true, noscroll: false })
        }
    })

    onDestroy(() => {
        clearRedirectTimeout()
    })
</script>

<div class="mx-auto">…</div>
