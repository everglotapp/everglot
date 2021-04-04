<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()
    function handleClick(event: MouseEvent) {
        const element = document.getElementById(elementId)
        if (!element || event.composedPath().includes(element)) {
            // Element doesn't exist or user clicked inside it
            return
        }
        dispatch("clickaway", { event })
    }

    export let elementId: string = ""
</script>

<svelte:window on:click={handleClick} />
