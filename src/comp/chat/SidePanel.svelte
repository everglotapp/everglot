<script lang="ts">
    import { getContext } from "svelte"
    import { scale } from "svelte/transition"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import ButtonLarge from "../util/ButtonLarge.svelte"
    import { CHAT_CONTEXT } from "../util/ChatProvider.svelte"
    import type { ChatContext } from "../util/ChatProvider.svelte"

    import Hangman from "./activities/Hangman.svelte"
    import GuessCharacter from "./activities/GuessCharacter.svelte"
    import WouldYouRather from "./activities/WouldYouRather.svelte"
    import RandomQuestion from "./activities/RandomQuestion.svelte"

    import { currentUserIsGroupMember } from "../../stores/chat"

    import { GroupActivityKind } from "../../types/activities"
    import type {
        GroupActivity,
        HangmanGroupActivity,
        WouldYouRatherGroupActivity,
        RandomQuestionGroupActivity,
        GuessCharacterGroupActivity,
    } from "../../types/activities"

    import { groupUuid } from "../../stores"
    import {
        currentGroupLocale,
        currentGroupLanguage,
    } from "../../stores/locales"
    import {
        HANGMAN_LOCALES,
        WOULD_YOU_RATHER_LOCALES,
        RANDOM_QUESTION_LOCALES,
        GUESS_CHARACTER_LOCALES,
    } from "../../constants"

    const chat = getContext<ChatContext>(CHAT_CONTEXT)
    const { connected: connectedToChat } = chat

    export let activity: GroupActivity | null = null
    let startingActivity = false
    let forceDisableInputs = false
    // @ts-ignore
    $: activity, (startingActivity = false)

    $: if ($connectedToChat) {
        chat.on("startGroupActivity.failure", () => {
            startingActivity = false
        })
    }

    function handleStartActivity(kind: GroupActivityKind) {
        if (startingActivity) {
            return
        }
        chat.emit("startGroupActivity", {
            kind,
        })
        forceDisableInputs = true
        startingActivity = true
        setTimeout(() => {
            forceDisableInputs = false
        }, 1000)
    }

    $: groupCanPlayHangman =
        $currentGroupLocale !== null &&
        (HANGMAN_LOCALES as readonly string[]).includes($currentGroupLocale)
    $: groupCanPlayGuessCharacter =
        $currentGroupLocale !== null &&
        (GUESS_CHARACTER_LOCALES as readonly string[]).includes(
            $currentGroupLocale
        )
    $: groupCanPlayWouldYouRather =
        $currentGroupLocale !== null &&
        (WOULD_YOU_RATHER_LOCALES as readonly string[]).includes(
            $currentGroupLocale
        )
    $: groupCanBeAskedRandomQuestion =
        $currentGroupLocale !== null &&
        (RANDOM_QUESTION_LOCALES as readonly string[]).includes(
            $currentGroupLocale
        )
    $: groupCanPlayAnyGame =
        groupCanPlayHangman ||
        groupCanPlayGuessCharacter ||
        groupCanPlayWouldYouRather ||
        groupCanBeAskedRandomQuestion
    $: hangmanActivity =
        activity && activity.kind === GroupActivityKind.Hangman
            ? (activity as HangmanGroupActivity)
            : null
    $: guessCharacterActivity =
        activity && activity.kind === GroupActivityKind.GuessCharacter
            ? (activity as GuessCharacterGroupActivity)
            : null
    $: wouldYouRatherActivity =
        activity && activity.kind === GroupActivityKind.WouldYouRather
            ? (activity as WouldYouRatherGroupActivity)
            : null
    $: randomQuestionActivity =
        activity && activity.kind === GroupActivityKind.RandomQuestion
            ? (activity as RandomQuestionGroupActivity)
            : null
</script>

<div class="pb-4 overflow-y-auto">
    {#key $groupUuid}
        {#if activity === null && groupCanPlayAnyGame}
            <div
                class="px-16 py-8 md:py-24"
                in:scale={{ duration: 200, delay: 250 }}
            >
                <div
                    class="relative flex justify-end"
                    style="padding-right: 190px;"
                >
                    <div
                        class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
                    >
                        <Localized id="chat-side-panel-bubble" />
                    </div>
                    <img
                        src="/squirrel.png"
                        alt="Squirrel"
                        class="squirrel absolute right-4 top-4"
                    />
                </div>
                <div class="flex flex-col items-center pt-32">
                    {#if groupCanPlayHangman}
                        <div class="menu-item">
                            <ButtonLarge
                                tag="button"
                                className="w-full justify-center"
                                color="SECONDARY"
                                variant="OUTLINED"
                                disabled={startingActivity ||
                                    !$currentUserIsGroupMember ||
                                    forceDisableInputs}
                                on:click={() => {
                                    chat.emit("startGroupActivity", {
                                        kind: GroupActivityKind.Hangman,
                                    })
                                    startingActivity = true
                                }}
                                ><Localized
                                    id="chat-side-panel-menu-hangman"
                                /></ButtonLarge
                            >
                        </div>
                    {/if}
                    {#if groupCanPlayGuessCharacter}
                        <div class="menu-item">
                            <ButtonLarge
                                tag="button"
                                className="w-full justify-center"
                                color="SECONDARY"
                                variant="OUTLINED"
                                disabled={startingActivity ||
                                    !$currentUserIsGroupMember ||
                                    forceDisableInputs}
                                on:click={() => {
                                    chat.emit("startGroupActivity", {
                                        kind: GroupActivityKind.GuessCharacter,
                                    })
                                    startingActivity = true
                                }}
                                ><Localized
                                    id="chat-side-panel-menu-guess-character"
                                /></ButtonLarge
                            >
                        </div>
                    {/if}
                    {#if groupCanPlayWouldYouRather}
                        <div class="menu-item">
                            <ButtonLarge
                                tag="button"
                                className="w-full justify-center"
                                color="SECONDARY"
                                variant="OUTLINED"
                                disabled={startingActivity ||
                                    !$currentUserIsGroupMember ||
                                    forceDisableInputs}
                                on:click={() => {
                                    chat.emit("startGroupActivity", {
                                        kind: GroupActivityKind.WouldYouRather,
                                    })
                                    startingActivity = true
                                }}
                                ><Localized
                                    id="chat-side-panel-menu-would-you-rather"
                                /></ButtonLarge
                            >
                        </div>
                    {/if}
                    {#if groupCanBeAskedRandomQuestion}
                        <div class="menu-item">
                            <ButtonLarge
                                tag="button"
                                className="w-full justify-center"
                                color="SECONDARY"
                                variant="OUTLINED"
                                disabled={startingActivity ||
                                    !$currentUserIsGroupMember ||
                                    forceDisableInputs}
                                on:click={() =>
                                    handleStartActivity(
                                        GroupActivityKind.RandomQuestion
                                    )}
                                ><Localized
                                    id="chat-side-panel-menu-random-question"
                                /></ButtonLarge
                            >
                        </div>
                    {/if}
                </div>
            </div>
        {:else if !groupCanPlayAnyGame}
            <div
                class="px-16 py-8 md:py-24"
                in:scale={{ duration: 200, delay: 250 }}
            >
                <div
                    class="relative flex justify-end"
                    style="padding-right: 190px;"
                >
                    <div
                        class="squirrel-bubble bg-primary-lightest p-4 max-w-sm font-bold text-lg text-gray-bitdark"
                    >
                        <Localized
                            id="chat-side-panel-bubble-no-activity-available"
                            args={{
                                language:
                                    $currentGroupLanguage === null
                                        ? "this language"
                                        : $currentGroupLanguage,
                            }}
                        />
                    </div>
                    <img
                        src="/squirrel.png"
                        alt="Squirrel"
                        class="squirrel absolute right-4 top-4"
                    />
                </div>
            </div>
        {:else if activity}
            {#key activity.kind}
                <div
                    in:scale={{ duration: 200, delay: 350 }}
                    out:scale={{ duration: 200, delay: 0 }}
                >
                    {#if hangmanActivity}
                        <Hangman
                            on:quit={() => chat.emit("endGroupActivity")}
                            over={hangmanActivity.state.over}
                            pickedLetters={hangmanActivity.state.pickedLetters}
                            pickedWords={hangmanActivity.state.pickedWords}
                            word={hangmanActivity.state.currentWord}
                            solution={hangmanActivity.state.solution}
                            locale={$currentGroupLocale}
                        />
                    {:else if guessCharacterActivity}
                        <GuessCharacter
                            on:quit={() => chat.emit("endGroupActivity")}
                            over={guessCharacterActivity.state.over}
                            pickedCharacters={guessCharacterActivity.state
                                .pickedCharacters}
                            hint={guessCharacterActivity.state.hint}
                            solution={guessCharacterActivity.state.solution}
                            locale={$currentGroupLocale}
                        />
                    {:else if wouldYouRatherActivity}
                        <WouldYouRather
                            on:quit={() => chat.emit("endGroupActivity")}
                            question={wouldYouRatherActivity.state.question}
                            answers={wouldYouRatherActivity.state.answers}
                            endTime={wouldYouRatherActivity.state.endTime}
                        />
                    {:else if randomQuestionActivity}
                        <RandomQuestion
                            on:quit={() => chat.emit("endGroupActivity")}
                            question={randomQuestionActivity.state.question}
                        />
                    {/if}
                </div>
            {/key}
        {/if}
    {/key}
</div>

<style>
    .squirrel {
        transform: rotateY(180deg);
        max-width: 154px;
        right: 9px;
        top: max(35px, calc(400px - 24vw));
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
