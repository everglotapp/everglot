<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()
    function handleKeydown(event: KeyboardEvent) {
        event = event || window.event
        if (!event) {
            return
        }
        let isEscape = false
        if ("key" in event) {
            isEscape = event.key === "Escape" || event.key === "Esc"
        } else {
            isEscape = (event as KeyboardEvent).keyCode === 27
        }
        if (!isEscape) {
            return
        }
        dispatch("keydown", { event })
    }
</script>

<svelte:window on:keydown={handleKeydown} />
