<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { XIcon } from "svelte-feather-icons"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import Headline4 from "../../typography/Headline4.svelte"

    let inputValue: string | undefined

    export let over: boolean
    export let pickedLetters: string[]
    export let word: (string | null)[]
    export let solution: string | null = null

    $: wordGuessedCorrectly = word.every((character) => character !== null)
    $: wrongGuesses = pickedLetters.filter(characterWasIncorrect).length
    const characterWasIncorrect = (character: string) => {
        const lower = character.toLowerCase()
        return word.every(
            (wordCharacter) =>
                wordCharacter === null || wordCharacter.toLowerCase() !== lower
        )
    }

    const chat = getContext("CHAT")
    const { connected: connectedToChat } = chat

    const dispatch = createEventDispatcher()

    let feedback: string | undefined
    let feedbackSuccess = false
    $: if ($connectedToChat) {
        chat.on(
            "groupActivity.hangmanGuess",
            ({
                userUuid: _userUuid,
                success,
                guess,
            }: {
                userUuid: string
                success: boolean
                guess: string
            }) => {
                feedbackSuccess = success
                feedback = success
                    ? `${guess} is correct!`
                    : `${guess} is incorrect!`
            }
        )
    }

    function submitGuess(guess: string) {
        if (!$connectedToChat) {
            return
        }
        chat.emit("groupActivity.hangmanGuess", { guess })
    }

    const handleQuit = () => dispatch("quit")

    const handleEnter = () => {
        if (inputValue) {
            submitGuess(inputValue)
            inputValue = ""
        }
    }

    const handleSubmit = () => {
        if (inputValue) {
            submitGuess(inputValue)
            inputValue = ""
        }
    }
</script>

<div
    class="flex flex-row m-4 max-h-12 px-2 justify-between items-center"
    in:scale={{ duration: 200, delay: 350 }}
    out:scale={{ duration: 200, delay: 0 }}
>
    <Headline4><Localized id="chat-side-panel-activity-hangman" /></Headline4>
    <ButtonSmall
        tag="button"
        className="items-center justify-center"
        color="PRIMARY"
        variant="TEXT"
        on:click={handleQuit}
    >
        <XIcon size="20" />
        <span class="ml-1"
            ><Localized id="chat-side-panel-activity-quit" /></span
        ></ButtonSmall
    >
</div>
<div class="flex flex-col items-center">
    <div class="inline-block relative mb-4">
        <div
            class="rope"
            style={`transition: height 400ms ease-in-out; height: ${Math.max(
                0,
                190 - wrongGuesses * 15
            )}px`}
        />
        <div class="box-top" />
        <div class="box-left" />
        <div class="box-bottom px-8 py-5">
            {#if over}
                {#if wordGuessedCorrectly}
                    You correctly guessed: <span class="font-bold"
                        >{solution}</span
                    >
                {:else}
                    The word would have been: <span class="font-bold"
                        >{solution}</span
                    >
                {/if}
            {:else}
                {#each word as character}
                    <span class="character">
                        {#if character === null}
                            &nbsp;
                        {:else}
                            {character}
                        {/if}
                    </span>
                {/each}
            {/if}
        </div>
        <img
            src="/squirrel.png"
            alt="Squirrel"
            class="squirrel"
            style={`transition: transform 400ms ease-in-out; transform: translateY(-${
                wrongGuesses * 15
            }px)`}
        />
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="hangman-input"
            ><Localized id="chat-side-panel-activity-hangman-guess" /></label
        >
        <input
            id="hangman-input"
            class="border border-gray shadow-md inline-flex"
            bind:value={inputValue}
            disabled={over}
        />
        <ButtonSmall
            tag="button"
            className="justify-center"
            color="PRIMARY"
            disabled={over}
            on:click={handleEnter}
            ><Localized
                id="chat-side-panel-activity-hangman-enter"
            /></ButtonSmall
        >
    </form>
    {#if feedback}
        <div
            class={`px-8 py-4 font-bold ${
                feedbackSuccess ? "text-green-600" : "text-red-700"
            }`}
        >
            {feedback}
        </div>
    {/if}
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
        @apply font-bold;
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
