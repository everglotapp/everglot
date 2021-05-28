<script lang="ts">
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonLarge from "../util/ButtonLarge.svelte"

    import Hangman from "./activities/Hangman.svelte"
    import WouldYouRather from "./activities/WouldYouRather.svelte"

    import { groupUuid } from "../../stores"

    enum Activity {
        Hangman,
        WouldYouRather,
    }
    let activity: Activity | null = null
</script>

<div>
    {#key $groupUuid}
        {#if activity === null}
            <div class="px-16 py-8 md:py-16">
                <div
                    class="relative flex justify-end"
                    style="padding-right: 190px;"
                >
                    <div
                        class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
                    >
                        Welcome to the game center. Select a game to play with
                        your study group.
                    </div>
                    <img
                        src="/squirrel.png"
                        alt="Squirrel"
                        class="squirrel absolute right-4 top-4"
                    />
                </div>
                <div class="flex flex-col items-center pt-32">
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="PRIMARY"
                            variant="OUTLINED"
                            on:click={() => (activity = Activity.Hangman)}
                            ><Localized id="Play Hangman" /></ButtonLarge
                        >
                    </div>
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="PRIMARY"
                            variant="OUTLINED"
                            on:click={() =>
                                (activity = Activity.WouldYouRather)}
                            ><Localized id="Would You Rather" /></ButtonLarge
                        >
                    </div>
                    <div class="menu-item">
                        <ButtonLarge
                            tag="button"
                            className="w-full justify-center"
                            color="PRIMARY"
                            variant="OUTLINED"
                            on:click={() => console.log("Random q")}
                            ><Localized
                                id="Ask a Random Question"
                            /></ButtonLarge
                        >
                    </div>
                </div>
            </div>
        {:else if activity === Activity.Hangman}
            <Hangman on:quit={() => (activity = null)} />
        {:else if activity === Activity.WouldYouRather}
            <WouldYouRather on:quit={() => (activity = null)} />
        {/if}
    {/key}
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

    .menu-item {
        max-width: 280px;
        width: 100%;

        @apply mb-2;
    }
</style>
