<script lang="ts">
    import { onMount, onDestroy } from "svelte"
    import { goto } from "@sapper/app"
    import { currentUser } from "../stores"

    let redirectTimeout: number | null = null

    onMount(() => {
        if ($currentUser.fetching) {
            if (redirectTimeout === null) {
                redirectTimeout = window.setTimeout(() => {
                    goto("/profile", { replaceState: true, noscroll: false })
                    redirectTimeout = null
                }, 800)
            }
        } else if ($currentUser.data?.users.nodes[0]) {
            const { username, userLanguages } = $currentUser.data.users.nodes[0]
            if (username !== null && userLanguages.totalCount) {
                goto("/groups", { replaceState: true, noscroll: false })
            }
        }
    })

    onDestroy(() => {
        if (redirectTimeout !== null) {
            window.clearTimeout(redirectTimeout)
            redirectTimeout = null
        }
    })
</script>

<div class="mx-auto">…</div>
