<script lang="ts">
    import { createEventDispatcher } from "svelte"

    export let elementId: string | null | (string | null)[] = ""
    $: elementIds = Array.isArray(elementId) ? elementId : [elementId]

    const dispatch = createEventDispatcher()
    function handleClick(event: MouseEvent) {
        for (const id of elementIds) {
            if (!id) {
                continue
            }
            const element = document.getElementById(id)
            if (!element || event.composedPath().includes(element)) {
                // Element doesn't exist or user clicked inside it
                return
            }
        }
        dispatch("clickaway", { event })
    }
</script>

<svelte:window on:click={handleClick} />
