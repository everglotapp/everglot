<script lang="ts" context="module">
    export type CreatePostCorrectionEvent = CustomEvent<{
        body: string
    }>
</script>

<script lang="ts">
    import { onDestroy, onMount, createEventDispatcher } from "svelte"
    import { XIcon, SendIcon } from "svelte-feather-icons"
    import { Localized } from "@nubolab-ffwd/svelte-fluent"
    import { svelteTime } from "svelte-time"

    import ButtonSmall from "../util/ButtonSmall.svelte"
    import Avatar from "../users/Avatar.svelte"
    import type { PostCorrectionRange } from "../../constants"
    import type { Maybe, PostCorrection } from "../../types/generated/graphql"
    import { rangesOverlapAnywhere } from "../../routes/_helpers/posts/selections"

    export let id: string
    export let locale: string
    interface ElementWithRect {
        getBoundingClientRect: Element["getBoundingClientRect"]
    }
    export let anchor: ElementWithRect | null
    export let container: ElementWithRect | null
    export let forceRecalculatePosition: boolean = false
    export let editedRange: PostCorrectionRange | null
    export let selectedText: string | null
    export let selectionStart: number | null
    export let selectionEnd: number | null
    export let corrections: (Pick<
        PostCorrection,
        "uuid" | "body" | "endIndex" | "startIndex"
    > & {
        user?: Maybe<
            Pick<
                NonNullable<PostCorrection["user"]>,
                "uuid" | "username" | "displayName" | "avatarUrl"
            >
        >
    })[] = []
    export let linkToCorrectionAuthorProfile: boolean = true

    let newBody: string | undefined

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

    const MIN_WIDTH = 280
    const MAX_WIDTH = 320
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
                  containerBoundingRect.width - MIN_WIDTH,
                  Math.max(
                      0,
                      containerBoundingRect.right -
                          anchorBoundingRect.left -
                          MIN_WIDTH
                  )
              )
            : null

    $: placeholder = selectedText
        ? `${selectedText.substr(0, 20)} …`
        : "Your correction …"

    function handleCreate() {
        if (!newBody || !newBody.length) {
            return
        }
        dispatch("create", {
            body: newBody,
        })
        newBody = undefined
    }
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
                class="bg-white shadow-lg border border-gray-light rounded-lg z-20 flex flex-col items-center w-full overflow-hidden"
                style={`max-width: ${MAX_WIDTH}px;`}
            >
                <div
                    class="flex relative px-2 py-2 w-full"
                    style={`min-width: ${MIN_WIDTH}px;`}
                >
                    <div
                        contenteditable
                        bind:textContent={newBody}
                        {placeholder}
                        aria-placeholder={placeholder}
                        on:focus={() => dispatch("correctionInputFocus")}
                        on:blur={() => dispatch("correctionInputBlur")}
                        class="border border-gray-bitlight rounded-lg py-1 pl-2 pr-12 w-full"
                    />
                    <div
                        class="absolute right-0 top-0 bottom-0 flex items-center origin-top-right"
                    >
                        <ButtonSmall
                            tag="button"
                            variant="TEXT"
                            className="correction-send-button"
                            on:click={handleCreate}
                            ><SendIcon size="16" /></ButtonSmall
                        >
                    </div>
                </div>
                <hr class="w-full" />
                {#if corrections.length}
                    <div
                        class="px-3 overflow-y-scroll overflow-x-hidden relative w-full max-w-full"
                        style="max-height: 20vh;"
                    >
                        {#each corrections as correction (correction.uuid)}
                            {#if correction.user}
                                <div
                                    class="flex flex-row py-2 w-full max-w-full"
                                >
                                    <div class="pr-2 sm:pr-3">
                                        {#if linkToCorrectionAuthorProfile}
                                            <a
                                                href={`/u/${correction.user.username}`}
                                                ><Avatar
                                                    username={correction.user
                                                        .username}
                                                    uuid={correction.user.uuid}
                                                    url={correction.user
                                                        .avatarUrl}
                                                    size={36}
                                                /></a
                                            >
                                        {:else}
                                            <Avatar
                                                username={correction.user
                                                    .username}
                                                uuid={correction.user.uuid}
                                                url={correction.user.avatarUrl}
                                                size={36}
                                            />
                                        {/if}
                                    </div>
                                    <div class="px-1 w-full max-w-full">
                                        <div
                                            class="flex items-center justify-between w-full text-sm"
                                        >
                                            {#if linkToCorrectionAuthorProfile}
                                                <a
                                                    href={`/u/${correction.user.username}`}
                                                    class="m-0"
                                                    ><span
                                                        class="text-gray-bitdark font-bold"
                                                        >{correction.user
                                                            .displayName ||
                                                            correction.user
                                                                .username}</span
                                                    ></a
                                                >
                                            {:else}
                                                <span
                                                    class="text-gray-bitdark font-bold m-0"
                                                    >{correction.user
                                                        .displayName ||
                                                        correction.user
                                                            .username}</span
                                                >
                                            {/if}
                                            <time
                                                use:svelteTime={{
                                                    timestamp:
                                                        correction.createdAt,
                                                    format:
                                                        new Date(
                                                            correction.createdAt
                                                        ).getDate() ===
                                                        new Date().getDate()
                                                            ? "h:mm A"
                                                            : new Date(
                                                                  correction.createdAt
                                                              ).getFullYear() ===
                                                              new Date().getFullYear()
                                                            ? "D MMM h:mm A"
                                                            : "D MMM YYYY h:mm A",
                                                }}
                                                title={correction.createdAt.toLocaleString()}
                                                class="text-sm text-gray-bitdark"
                                            />
                                        </div>
                                        <div>{correction.body}</div>
                                    </div>
                                </div>
                            {/if}{/each}
                    </div>
                    <hr class="w-full" />
                {/if}
                <div class="flex w-full items-center justify-end py-2 pr-2">
                    <ButtonSmall
                        tag="button"
                        variant="TEXT"
                        color="SECONDARY"
                        on:click={() => dispatch("cancel")}
                        className="flex justify-center items-center text-sm"
                    >
                        <XIcon
                            size="18"
                            strokeWidth={1}
                            class="mr-1"
                        /><Localized id={`post-correction-selection-cancel`} />
                    </ButtonSmall>
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    :global(.correction-send-button) {
        margin-right: 0.6rem;
        padding-left: 0.75rem;
        padding-right: 0.5rem;

        @apply rounded-tl-none !important;
        @apply rounded-bl-none !important;
    }

    :global(.correction-send-button:focus) {
        @apply border-transparent !important;
        @apply bg-transparent !important;
    }

    [placeholder]:empty::before {
        content: attr(placeholder);

        @apply text-gray;
    }

    [placeholder]:empty:focus::before {
        content: "";
    }
</style>
