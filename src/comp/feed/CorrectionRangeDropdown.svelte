<script lang="ts">
    import { onDestroy, onMount, createEventDispatcher } from "svelte"
    import { XIcon } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import type { PostCorrectionRange } from "../../constants"

    export let id: string
    export let locale: string
    interface ElementWithRect {
        getBoundingClientRect: Element["getBoundingClientRect"]
    }
    export let anchor: ElementWithRect | null
    export let container: ElementWithRect | null
    export let forceRecalculatePosition: boolean = false
    export let editedRange: PostCorrectionRange | null

    const dispatch = createEventDispatcher()

    onMount(() => {
        recalculateBoundingRects()
        window.addEventListener("resize", handleWindowResize)
    })

    onDestroy(() => {
        window.removeEventListener("resize", handleWindowResize)
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
</script>

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
            >
                <hr class="w-full" />
                <ButtonSmall
                    tag="button"
                    variant="TEXT"
                    color="SECONDARY"
                    on:click={() => dispatch("cancel")}
                    className="flex justify-center items-center w-full text-sm"
                >
                    <XIcon size="18" strokeWidth={1} class="mr-1" /><Localized
                        id={`post-correction-selection-cancel`}
                    />
                </ButtonSmall>
            </div>
        </div>
    </div>
{/if}
