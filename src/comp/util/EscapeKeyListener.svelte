<script lang="ts">
    import { createEventDispatcher, onMount, onDestroy } from "svelte"

    onMount(() => {
        if (typeof document !== "undefined") {
            document.addEventListener("keydown", handleDocumentKeydown)
        }
    })

    onDestroy(() => {
        if (typeof document !== "undefined") {
            document.removeEventListener("keydown", handleDocumentKeydown)
        }
    })

    const dispatch = createEventDispatcher()
    function handleDocumentKeydown(event: KeyboardEvent) {
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
