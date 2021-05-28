<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonSmall from "../../util/ButtonSmall.svelte"

    const dispatch = createEventDispatcher()

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }
</script>

<div class="flex flex-row bg-gray-light max-h-12 px-2 items-center">
    <div class="text-lg py-1 px-3 border-primary border-b-2">
        <Localized id="chat-game-would-you-rather" />
    </div>
    <ButtonSmall
        tag="button"
        className="w-full justify-between"
        color="SECONDARY"
        on:click={handleQuit}>Quit</ButtonSmall
    >
</div>
