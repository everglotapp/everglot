<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte"

    onMount(() => {
        if (typeof document !== "undefined") {
            document.addEventListener("click", handleDocumentClick)
        }
    })

    onDestroy(() => {
        if (typeof document !== "undefined") {
            document.removeEventListener("click", handleDocumentClick)
        }
    })

    const dispatch = createEventDispatcher()
    function handleDocumentClick(event: MouseEvent) {
        const element = document.getElementById(elementId)
        if (!element || event.composedPath().includes(element)) {
            // Element doesn't exist or user clicked inside it
            return
        }
        dispatch("clickaway", { event })
    }

    export let elementId: string = ""
</script>
