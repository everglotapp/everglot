<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonSmall from "../../util/ButtonSmall.svelte"

    const dispatch = createEventDispatcher()

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }
</script>

<div class="flex flex-row m-4 max-h-12 px-2 justify-between items-center">
    <div class="text-lg py-1 px-3 bg-gray-lightest border-primary border-b-2">
        <Localized id="chat-side-panel-activity-hangman" />
    </div>
    <ButtonSmall
        tag="button"
        className="justify-center"
        color="PRIMARY"
        variant="TEXT"
        on:click={handleQuit}
        ><Localized id="chat-side-panel-activity-quit" /></ButtonSmall
    >
</div>
