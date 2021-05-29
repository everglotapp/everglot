<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import ButtonLarge from "../../util/ButtonLarge.svelte"

    const dispatch = createEventDispatcher()

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }
</script>

<div
    class="flex flex-row m-4 max-h-12 px-2 justify-between items-center"
    in:scale={{ duration: 200, delay: 350 }}
    out:scale={{ duration: 200, delay: 0 }}
>
    <div class="text-lg py-1 px-3 bg-gray-lightest border-primary border-b-2">
        <Localized id="chat-side-panel-activity-would-you-rather" />
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

<div class="px-16 py-8 md:py-24">
    <div class="relative flex justify-end" style="padding-right: 190px;">
        <div
            class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
        >
            Would you rather eat a walnut or a hazelnut?
        </div>
        <img
            src="/squirrel.png"
            alt="Squirrel"
            class="squirrel absolute right-4 top-4"
        />
    </div>
    <div class="flex flex-col items-center pt-32">
        <div class="answer">
            <ButtonLarge
                tag="button"
                className="w-full justify-center"
                color="PRIMARY"
                variant="OUTLINED"
                on:click={() => {}}>Walnut</ButtonLarge
            >
        </div>
        <div class="answer">
            <ButtonLarge
                tag="button"
                className="w-full justify-center"
                color="PRIMARY"
                variant="OUTLINED"
                on:click={() => {}}>Hazelnut</ButtonLarge
            >
        </div>
    </div>
</div>

<style>
    .squirrel {
        transform: rotateY(180deg);
        max-width: 154px;
        right: 0;
        top: 35px;
    }

    .squirrel-bubble {
        position: relative;
        border-radius: 0.4rem;
    }

    .squirrel-bubble::after {
        content: "";
        position: absolute;
        right: 0;
        bottom: 10%;
        width: 0;
        height: 0;
        border: 1.5rem solid transparent;
        border-left-color: theme("colors.primary.lightest");
        border-right: 0;
        border-bottom: 0;
        margin-top: -0.75rem;
        margin-right: -1.5rem;
    }

    .answer {
        max-width: 280px;
        width: 100%;

        @apply mb-2;
    }
</style>
