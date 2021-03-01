<script lang="ts">
    import { goto } from "@sapper/app"
    import { onMount } from "svelte"
    import { username, room } from "../stores"
    onMount(() => {
        if ($username && $room && $username.length && $room.length) {
            goto("/chat")
        } else {
            goto("/profile")
        }
    })
</script>
