<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte"

    onMount(() => {
        if (typeof document !== "undefined") {
            console.log("Registering document click listener")
            document.addEventListener("click", handleDocumentClick)
        }
    })

    onDestroy(() => {
        if (typeof document !== "undefined") {
            console.log("Unregistering document click listener")
            document.removeEventListener("click", handleDocumentClick)
        }
    })

    const dispatch = createEventDispatcher()
    function handleDocumentClick(event: MouseEvent) {
        console.log("Handling document click")
        const element = document.getElementById(elementId)
        if (!element || event.composedPath().includes(element)) {
            // Element doesn't exist or user clicked inside it
            return
        }
        console.log("Dispatching clickaway")
        dispatch("clickaway", { event })
    }

    export let elementId: string = ""
</script>
