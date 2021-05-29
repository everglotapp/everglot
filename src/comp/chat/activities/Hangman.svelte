<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonSmall from "../../util/ButtonSmall.svelte"

    const dispatch = createEventDispatcher()

    const handleQuit = (_event: MouseEvent) => {
        dispatch("quit")
    }

    const handleEnter = (_event: MouseEvent) => {
        dispatch("enter", { value: inputValue })
    }

    const handleSubmit = () => {
        dispatch("enter", { value: inputValue })
    }
    let inputValue: string | undefined
    let currentCharacters: (string | null)[] = [
        "h",
        null,
        "l",
        "l",
        null,
        "w",
        null,
        "r",
        "l",
        "d",
    ]
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
<div class="flex flex-col items-center">
    <div class="inline-block relative mb-4">
        <div class="rope" />
        <div class="box-top" />
        <div class="box-left" />
        <div class="box-bottom px-8 py-5">
            {#each currentCharacters as char}
                <span class="character">
                    {#if char === null}
                        &nbsp;
                    {:else}
                        {char}
                    {/if}
                </span>
            {/each}
        </div>
        <img src="/squirrel.png" alt="Squirrel" class="squirrel" />
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="hangman-input"
            ><Localized id="chat-side-panel-activity-hangman-guess" /></label
        >
        <input
            id="hangman-input"
            class="border border-gray shadow-md inline-flex"
            bind:value={inputValue}
        />
        <ButtonSmall
            tag="button"
            className="justify-center"
            color="PRIMARY"
            on:click={handleEnter}
            ><Localized
                id="chat-side-panel-activity-hangman-enter"
            /></ButtonSmall
        >
    </form>
</div>

<style>
    .squirrel {
        position: absolute;
        max-width: 207px;
        bottom: 48px;
        left: 82px;
    }

    .character {
        @apply text-lg;
        @apply mr-2;

        border-bottom: 1px solid black;
        width: 20px;
        display: inline-block;
        text-align: center;
    }

    .rope {
        height: 190px;
        width: 3px;
        background: #664e27;
        margin-left: 8px;
        position: absolute;
        top: 23px;
        left: 193px;
    }

    .box-top {
        height: 23px;
        width: 236px;
        background: #b57a57;
        margin-left: 20px;
    }

    .box-left {
        height: 350px;
        width: 20px;
        background: #b57a57;
        margin-left: 20px;
    }

    .box-bottom {
        height: 66px;
        width: 381px;
        background: #b57a57;
        margin-left: 8px;
    }
</style>
