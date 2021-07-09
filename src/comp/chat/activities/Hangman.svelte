<script lang="ts">
    import { createEventDispatcher, getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { stores as fluentStores } from "@nubolab-ffwd/svelte-fluent/src/internal/FluentProvider.svelte"
    import { XIcon } from "svelte-feather-icons"
    import SquirrelOnRope from "./_SquirrelOnRope.svelte"
    import ButtonSmall from "../../util/ButtonSmall.svelte"
    import Modal from "../../util/Modal.svelte"
    import { CHAT_CONTEXT } from "../../util/ChatProvider.svelte"
    import type { ChatContext } from "../../util/ChatProvider.svelte"
    import Headline4 from "../../typography/Headline4.svelte"

    import { currentUserUuid } from "../../../stores/currentUser"
    import { currentUserIsGroupMember, chatUsers } from "../../../stores/chat"
    import { ALPHABET } from "../../../constants"
    import type { HangmanLocale } from "../../../constants"

    let inputValue: string | undefined

    export let over: boolean
    export let pickedLetters: string[]
    export let pickedWords: string[]
    export let word: (string | null)[]
    export let solution: string | null = null
    export let locale: HangmanLocale | null
    let forceDisableInputs = false
    let wantsToEndActivity = false

    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat } = chat

    const dispatch = createEventDispatcher()

    let feedback: string | undefined
    let feedbackSuccess = false
    const { translate } = fluentStores()!
    $: if ($connectedToChat) {
        chat.on(
            "groupActivity.hangmanGuess",
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
                if ($currentUserUuid && guessingUser) {
                    if (guessingUser.uuid === $currentUserUuid) {
                        feedback = success
                            ? $translate(
                                  "chat-side-panel-activity-hangman-feedback-own-guess-correct",
                                  {
                                      guess,
                                  }
                              )
                            : $translate(
                                  "chat-side-panel-activity-hangman-feedback-own-guess-wrong",
                                  {
                                      guess,
                                  }
                              )
                    } else {
                        feedback = success
                            ? $translate(
                                  "chat-side-panel-activity-hangman-feedback-guess-correct",
                                  {
                                      username: guessingUser.username,
                                      guess,
                                  }
                              )
                            : $translate(
                                  "chat-side-panel-activity-hangman-feedback-guess-wrong",
                                  {
                                      username: guessingUser.username,
                                      guess,
                                  }
                              )
                    }
                } else {
                    feedback = success
                        ? $translate(
                              "chat-side-panel-activity-hangman-feedback-own-guess-correct",
                              {
                                  guess,
                              }
                          )
                        : $translate(
                              "chat-side-panel-activity-hangman-feedback-own-guess-wrong",
                              {
                                  guess,
                              }
                          )
                }
            }
        )
    }

    function submitGuess(guess: string) {
        if (!$connectedToChat) {
            return
        }
        chat.emit("groupActivity.hangmanGuess", { guess })
    }

    const handleQuit = () => {
        dispatch("quit")
    }

    export function handleSendText(text: string): boolean {
        if (!validateInput(text)) {
            return false
        }
        submitGuess(text)
        return true
    }

    const handleEnter = () => {
        if (!inputValue) {
            return
        }
        handleSendText(inputValue)
        inputValue = ""
    }

    const handleSubmit = () => {
        if (!inputValue) {
            return
        }
        handleSendText(inputValue)
        inputValue = ""
    }

    $: alphabet = locale === null ? null : ALPHABET[locale as HangmanLocale]
    const validateInput = (input: string) => {
        if (input.length !== 1) {
            return true
        }
        if (
            pickedLetters.some(
                (letter) =>
                    letter !== null &&
                    letter.toLowerCase() === input.toLowerCase()
            )
        ) {
            feedback = $translate(
                "chat-side-panel-activity-hangman-feedback-letter-already-picked",
                { input }
            )
            feedbackSuccess = false
            return false
        }
        if (alphabet !== null) {
            const badLetter = input
                .split("")
                .find((letter) => !alphabet!.includes(letter))
            if (badLetter) {
                feedback = $translate(
                    "chat-side-panel-activity-hangman-feedback-letter-not-available",
                    { badLetter }
                )
                feedbackSuccess = false
                return false
            }
        }
        return true
    }

    $: wordGuessedCorrectly =
        word.every((character) => character !== null) ||
        (solution !== null && pickedWords.includes(solution.toLowerCase()))
    $: wrongLetterGuesses = pickedLetters.filter(characterWasIncorrect).length
    $: wrongWordGuesses =
        solution === null
            ? pickedWords.length
            : pickedWords.filter(
                  (pickedWord) =>
                      pickedWord.toLowerCase() !== solution!.toLowerCase()
              ).length
    const characterWasIncorrect = (character: string) => {
        const lower = character.toLowerCase()
        return word.every(
            (wordCharacter) =>
                wordCharacter === null || wordCharacter.toLowerCase() !== lower
        )
    }

    $: if (over) {
        forceDisableInputs = true
        setTimeout(() => {
            forceDisableInputs = false
            inputValue = ""
        }, 3000)
        setTimeout(() => {
            feedback = undefined
        }, 1000)
    }

    $: if (!$connectedToChat) {
        forceDisableInputs = true
    }

    const WRONG_LETTER_MOVE_Y_PX = 15
    const WRONG_WORD_MOVE_Y_PX = 60
</script>

<div
    class="flex flex-row mt-1 mb-2 sm:mx-4 md:my-4 max-h-12 justify-between items-center"
>
    <Headline4><Localized id="chat-side-panel-activity-hangman" /></Headline4>
    <ButtonSmall
        tag="button"
        className="items-center justify-center"
        color="PRIMARY"
        variant="TEXT"
        disabled={!$currentUserIsGroupMember}
        on:click={() => (wantsToEndActivity = true)}
    >
        <XIcon size="20" />
        <span class="ml-1"
            ><Localized id="chat-side-panel-activity-quit" /></span
        ></ButtonSmall
    >
</div>
<div
    class="flex flex-col justify-start items-center overflow-hidden"
    style="min-height: 100%;"
>
    <div class="inline-block relative mb-2 md:mb-4">
        <SquirrelOnRope
            confused={over && !wordGuessedCorrectly}
            verticalOffset={wrongLetterGuesses * WRONG_LETTER_MOVE_Y_PX +
                wrongWordGuesses * WRONG_WORD_MOVE_Y_PX}
        >
            <svelte:fragment slot="bottom-box">
                {#if over}
                    {#if wordGuessedCorrectly}
                        <Localized
                            id="chat-side-panel-activity-hangman-solution-correct"
                        /> <span class="font-bold">{solution}</span>
                    {:else}
                        <Localized
                            id="chat-side-panel-activity-hangman-solution-wrong"
                        /> <span class="font-bold">{solution}</span>
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
            </svelte:fragment>
        </SquirrelOnRope>
    </div>
    <form on:submit|preventDefault={handleSubmit} class="hidden sm:block">
        <label for="hangman-input"
            ><Localized id="chat-side-panel-activity-hangman-guess" /></label
        >
        <input
            id="hangman-input"
            class="border border-gray shadow-md inline-flex"
            bind:value={inputValue}
            required
            disabled={over || forceDisableInputs || !$currentUserIsGroupMember}
            autocomplete="off"
        />
        <ButtonSmall
            tag="button"
            className="justify-center"
            color="PRIMARY"
            disabled={over || forceDisableInputs || !$currentUserIsGroupMember}
            on:click={handleEnter}
            ><Localized
                id="chat-side-panel-activity-hangman-enter"
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

{#if wantsToEndActivity}
    <Modal>
        <div class="py-4 px-4 md:py-8 md:px-10 bg-white shadow-lg rounded-lg">
            <p class="mb-6 text-center">
                <Localized id="chat-side-panel-activity-quit-text" />
            </p>
            <div class="flex justify-end">
                <ButtonSmall
                    tag="button"
                    on:click={() => (wantsToEndActivity = false)}
                    variant="TEXT"
                    color="PRIMARY"
                    ><Localized
                        id="chat-side-panel-activity-quit-cancel"
                    /></ButtonSmall
                >
                <ButtonSmall
                    tag="button"
                    on:click={() => {
                        wantsToEndActivity = false
                        handleQuit()
                    }}
                    ><Localized
                        id="chat-side-panel-activity-quit-confirm"
                    /></ButtonSmall
                >
            </div>
        </div></Modal
    >
{/if}

<style>
    .character {
        @apply text-lg;
        @apply font-bold;
        @apply mr-2;

        border-bottom: 1px solid black;
        width: 20px;
        display: inline-block;
        text-align: center;
    }
</style>
