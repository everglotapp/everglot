<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte"
    import { XIcon, TrashIcon } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import { PostGameType } from "../../types/generated/graphql"
    import {
        GUESS_CASE_LOCALES,
        GUESS_CASE_OPTIONS,
        GUESS_GENDER_LOCALES,
        GUESS_GENDER_OPTIONS,
        PostGameRange,
    } from "../../constants"
    import type { GuessGenderLocale, GuessCaseLocale } from "../../constants"
    import { entries } from "../../utils"

    export let gameType: PostGameType
    export let id: string
    export let locale: string
    export let showRemove: boolean = false
    interface ElementWithRect {
        getBoundingClientRect: Element["getBoundingClientRect"]
    }
    export let anchor: ElementWithRect | null
    export let container: ElementWithRect | null
    export let forceRecalculatePosition: boolean = false
    export let editedRange: PostGameRange | null

    const dispatch = createEventDispatcher()

    onMount(() => {
        recalculateBoundingRects()
    })

    $: anchorBoundingRect = anchor?.getBoundingClientRect() || null
    $: containerBoundingRect = container?.getBoundingClientRect() || null
    function recalculateBoundingRects() {
        anchorBoundingRect = anchor?.getBoundingClientRect() || null
        containerBoundingRect = container?.getBoundingClientRect() || null
    }
    let dirtyPosition = false
    $: if (forceRecalculatePosition) {
        dirtyPosition = true
    }
    $: if (dirtyPosition) {
        recalculateBoundingRects()
        dirtyPosition = false
    }
    function handleWindowResize() {
        recalculateBoundingRects()
    }

    $: availableGuessCaseOptions =
        locale && (GUESS_CASE_LOCALES as readonly string[]).includes(locale)
            ? entries(GUESS_CASE_OPTIONS[locale as GuessCaseLocale]).map(
                  (entry) => ({ value: entry[0], localizationId: entry[1] })
              )
            : []
    $: availableGuessGenderOptions =
        locale && (GUESS_GENDER_LOCALES as readonly string[]).includes(locale)
            ? entries(GUESS_GENDER_OPTIONS[locale as GuessGenderLocale]).map(
                  (entry) => ({ value: entry[0], localizationId: entry[1] })
              )
            : []

    $: top =
        containerBoundingRect !== null && anchorBoundingRect !== null
            ? Math.min(
                  containerBoundingRect.height,
                  Math.max(
                      32,
                      4 + anchorBoundingRect.bottom - containerBoundingRect.top
                  )
              )
            : null
    $: right =
        containerBoundingRect !== null && anchorBoundingRect !== null
            ? Math.min(
                  containerBoundingRect.width - 120,
                  Math.max(
                      0,
                      containerBoundingRect.right -
                          anchorBoundingRect.left -
                          120
                  )
              )
            : null

    let scrollHandlerTimeout: number | null = null
    function handleWindowScroll() {
        if (scrollHandlerTimeout !== null) {
            return
        }
        scrollHandlerTimeout = window.setTimeout(() => {
            dirtyPosition = true
            scrollHandlerTimeout = null
        }, 30)
    }
</script>

<svelte:window on:resize={handleWindowResize} on:scroll={handleWindowScroll} />

{#if top !== null && right !== null}
    <div {id} class="relative w-full">
        <div
            class="absolute flex items-center justify-center"
            style={`
        top: ${top}px;
        right: ${right}px;`}
        >
            <div
                class="bg-white shadow-lg border border-gray-light rounded-lg z-20 flex flex-col items-center"
                style="min-width: 148px;"
            >
                {#if gameType === PostGameType.GuessCase}
                    {#each availableGuessCaseOptions as option}
                        <ButtonSmall
                            tag="button"
                            variant="TEXT"
                            color={editedRange === null ||
                            editedRange.option === option.value
                                ? "PRIMARY"
                                : "SECONDARY"}
                            on:click={() =>
                                dispatch("guessCaseOptionPicked", { option })}
                            className="mb-1 w-full flex justify-center"
                        >
                            <Localized
                                id={`post-game-guess-case-${option.localizationId}`}
                            />
                        </ButtonSmall>
                    {/each}
                    {#if editedRange !== null}
                        <hr class="w-full" />
                    {/if}
                {:else if gameType === PostGameType.GuessGender}
                    {#each availableGuessGenderOptions as option}
                        <ButtonSmall
                            tag="button"
                            variant="TEXT"
                            color={editedRange === null ||
                            editedRange.option === option.value
                                ? "PRIMARY"
                                : "SECONDARY"}
                            on:click={() =>
                                dispatch("guessGenderOptionPicked", { option })}
                            className="mb-1 w-full flex justify-center"
                        >
                            <Localized
                                id={`post-game-guess-gender-${option.localizationId}`}
                            />
                        </ButtonSmall>
                    {/each}
                    {#if editedRange !== null}
                        <hr class="w-full" />
                    {/if}
                {:else if gameType === PostGameType.Cloze}
                    {#if editedRange === null}
                        <ButtonSmall
                            tag="button"
                            variant="TEXT"
                            on:click={() => dispatch("clozeEntryAdded")}
                            className="mb-1 w-full flex justify-center"
                        >
                            <Localized id="post-game-cloze-new-gap" />
                        </ButtonSmall>
                    {/if}
                {/if}
                {#if showRemove}
                    <ButtonSmall
                        tag="button"
                        variant="TEXT"
                        color="SECONDARY"
                        on:click={() => dispatch("remove")}
                        className="flex justify-center items-center w-full text-danger"
                    >
                        <TrashIcon
                            size="16"
                            strokeWidth={2}
                            class="mr-2"
                        /><Localized id={`post-game-selection-remove`} />
                    </ButtonSmall>
                {/if}
                <hr class="w-full" />
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    on:click={() => dispatch("cancel")}
                    className="flex justify-center items-center w-full text-sm"
                >
                    <XIcon size="16" strokeWidth={1} class="mr-1" /><Localized
                        id={`post-game-selection-cancel`}
                    />
                </ButtonSmall>
            </div>
        </div>
    </div>
{/if}
