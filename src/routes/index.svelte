<script lang="ts">
    import { onMount } from "svelte"
    import { username, room } from "../stores"
    onMount(() => {
        if ($username && $room && ($username || "").length && $room.length) {
            window.location.href = "/chat"
        } else {
            window.location.href = "/profile"
        }
    })
</script>
