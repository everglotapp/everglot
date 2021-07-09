<script lang="ts">
    import { createEventDispatcher } from "svelte"

    const dispatch = createEventDispatcher()
    function handleClick(event: MouseEvent) {
        const elementIds = Array.isArray(elementId) ? elementId : [elementId]
        for (const id of elementIds) {
            const element = document.getElementById(id)
            if (!element || event.composedPath().includes(element)) {
                // Element doesn't exist or user clicked inside it
                return
            }
        }
        dispatch("clickaway", { event })
    }

    export let elementId: string | string[] = ""
</script>

<svelte:window on:click={handleClick} />
