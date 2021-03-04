<script lang="ts">
    import { goto } from "@sapper/app"
    import { onMount } from "svelte"
    import { username, room, signedIn } from "../stores"
    onMount(() => {
        if (!$signedIn) {
            /**
             * TODO: check if user has been signed in before, e.g. if session ID cookie is set
             * If they have, goto login instead
             */
            goto("/join", { replaceState: true, noscroll: true })
        }
        if ($username && $room && $username.length && $room.length) {
            goto("/chat", { replaceState: true, noscroll: true })
        } else {
            goto("/profile", { replaceState: true, noscroll: true })
        }
    })
</script>
