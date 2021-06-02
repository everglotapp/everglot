<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized, Overlay } from "@nubolab-ffwd/svelte-fluent"
    import { XIcon } from "svelte-feather-icons"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import Headline4 from "../../typography/Headline4.svelte"

    import { currentUser } from "../../../stores"
    import { currentUserIsGroupMember, chatUsers } from "../../../stores/chat"
    import type { GuessCharacterLocale } from "../../../constants"
    import { isChineseCharacter } from "../../../utils"

    let inputValue: string | undefined

    export let over: boolean
    export let pickedCharacters: string[]
    export let hint: string | null = null
    export let solution: string | null = null
    export let locale: GuessCharacterLocale | null
    let forceDisableInputs = false

    const chat = getContext("CHAT")
    const { connected: connectedToChat } = chat

    const dispatch = createEventDispatcher()

    let feedback: string | undefined
    let feedbackSuccess = false
    $: if ($connectedToChat) {
        chat.on(
            "groupActivity.guessCharacterGuess",
            ({
                userUuid,
                success,
                guess,
            }: {
                userUuid: string
                success: boolean
                guess: string
            }) => {
                feedbackSuccess = success
                const guessingUser = $chatUsers.find(
                    (user) => user.uuid === userUuid
                )
                if ($currentUser && guessingUser) {
                    if (guessingUser === $currentUser.uuid) {
                        feedback = success
                            ? `${guess} is correct, nice!`
                            : `${guess} is incorrect, careful!`
                    } else {
                        feedback = success
                            ? `${guessingUser.username} guessed ${guess} which is correct!`
                            : `${guessingUser.username} guessed ${guess} which is incorrect!`
                    }
                } else {
                    feedback = success
                        ? `${guess} is correct!`
                        : `${guess} is incorrect!`
                }
            }
        )
    }

    function submitGuess(guess: string) {
        if (!$connectedToChat) {
            return
        }
        chat.emit("groupActivity.guessCharacterGuess", { guess })
    }

    const handleQuit = () => dispatch("quit")

    const handleEnter = () => {
        if (!inputValue) {
            return
        }
        if (!validateInput(inputValue)) {
            inputValue = ""
            return
        }
        submitGuess(inputValue)
        inputValue = ""
    }

    const handleSubmit = () => {
        if (!inputValue) {
            return
        }
        if (!validateInput(inputValue)) {
            inputValue = ""
            return
        }
        submitGuess(inputValue)
        inputValue = ""
    }

    const validateInput = (input: string) => {
        if (input.length !== 1) {
            feedback = `Only single characters are accepted, you wrote ${input}`
            feedbackSuccess = false
            return false
        }
        if (
            pickedCharacters.some(
                (character) =>
                    character !== null &&
                    character.toLowerCase() === input.toLowerCase()
            )
        ) {
            feedback = `The character ${input} has already been picked`
            feedbackSuccess = false
            return false
        }
        if (locale === "zh") {
            const badCharacter = input
                .split("")
                .find((character) => !isChineseCharacter(character))
            if (badCharacter) {
                feedback = `The character ${badCharacter} is not a Chinese character`
                feedbackSuccess = false
                return false
            }
        }
        return true
    }

    $: characterGuessedCorrectly =
        solution !== null && pickedCharacters.includes(solution)
    $: wrongCharacterGuesses = pickedCharacters.filter(characterWasIncorrect)
        .length
    const characterWasIncorrect = (character: string) => {
        return solution === null || character !== solution
    }

    $: if (over) {
        forceDisableInputs = true
        setTimeout(() => {
            forceDisableInputs = false
        }, 3000)
        setTimeout(() => {
            feedback = undefined
        }, 1000)
    }

    const WRONG_CHARACTER_MOVE_Y_PX = 15
    const MAX_MOVE_Y_PX = 90
</script>

<div
    class="flex flex-row m-4 max-h-12 px-2 justify-between items-center"
    in:scale={{ duration: 200, delay: 350 }}
    out:scale={{ duration: 200, delay: 0 }}
>
    <Headline4
        ><Localized id="chat-side-panel-activity-guess-character" /></Headline4
    >
    <ButtonSmall
        tag="button"
        className="items-center justify-center"
        color="PRIMARY"
        variant="TEXT"
        disabled={!$currentUserIsGroupMember}
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
                175 -
                    Math.min(
                        wrongCharacterGuesses * WRONG_CHARACTER_MOVE_Y_PX,
                        MAX_MOVE_Y_PX
                    )
            )}px`}
        />
        <div class="box-top" />
        <div class="box-left" />
        <div class="box-bottom px-8 py-5">
            {#if over}
                {#if characterGuessedCorrectly}
                    <Overlay
                        id="chat-side-panel-activity-guess-character-solution-correct"
                        args={{
                            solution,
                            hint,
                        }}
                    >
                        You guessed correctly: <span class="font-bold"
                            >{solution}</span
                        >
                    </Overlay>
                {:else}
                    <Overlay
                        id="chat-side-panel-activity-guess-character-solution-wrong"
                        args={{
                            solution,
                            hint,
                        }}
                    >
                        The solution would have been: <span
                            class="font-bold"
                            data-l10n-name="solution">{solution}</span
                        >
                    </Overlay>
                {/if}
            {:else}
                <Localized
                    id="chat-side-panel-activity-guess-character-hint"
                    args={{ hint: hint || "" }}
                />
            {/if}
        </div>
        <div class="squirrel-container">
            <div
                class="relative"
                style={`transition: transform 400ms ease-in-out; transform: translateY(-${Math.min(
                    wrongCharacterGuesses * WRONG_CHARACTER_MOVE_Y_PX,
                    MAX_MOVE_Y_PX
                )}px)`}
            >
                <img src="/squirrel.png" alt="Squirrel" />
                {#if over && !characterGuessedCorrectly}
                    <div
                        class="absolute font-bold"
                        style="right: 64px; top: 36px;"
                    >
                        x
                    </div>
                    <div
                        class="absolute font-bold"
                        style="right: 55px; top: 60px; width: 11px; border-bottom: 2px solid black;"
                    />
                    <div
                        class="absolute font-bold"
                        style="right: 49px; top: 36px;"
                    >
                        x
                    </div>
                {/if}
            </div>
        </div>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <label for="guess-character-input"
            ><Localized
                id="chat-side-panel-activity-guess-character-guess"
            /></label
        >
        <input
            id="guess-character-input"
            class="border border-gray shadow-md inline-flex"
            bind:value={inputValue}
            required
            disabled={over || forceDisableInputs || !$currentUserIsGroupMember}
        />
        <ButtonSmall
            tag="button"
            className="justify-center"
            color="PRIMARY"
            disabled={over || forceDisableInputs || !$currentUserIsGroupMember}
            on:click={handleEnter}
            ><Localized
                id="chat-side-panel-activity-guess-character-enter"
            /></ButtonSmall
        >
    </form>
    {#if feedback}
        {#key feedback}
            <div
                class={`px-8 py-4 font-bold ${
                    feedbackSuccess ? "text-green-600" : "text-red-700"
                }`}
                in:scale={{ duration: 200, delay: 150 }}
                out:scale={{ duration: 100, delay: 0 }}
            >
                {feedback}
            </div>
        {/key}
    {/if}
</div>

<style>
    .squirrel-container {
        position: absolute;
        max-width: 170px;
        bottom: 48px;
        left: 107px;
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
        height: 300px;
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
