<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import Select from "svelte-select"
    import { SearchIcon } from "svelte-feather-icons"

    export let items: unknown[]
    export let selected: unknown[] | null
    export let hideInput: boolean = false
    export let disabled: boolean = false
    export let placeholder: string = "Other …"

    const dispatch = createEventDispatcher()

    function handleSelect(event: CustomEvent) {
        dispatch("select", event.detail)
    }
</script>

<div
    class="wrapper inline-flex relative"
    class:hideInput
    class:hasItems={selected !== null && selected.length > 0}
>
    <Select
        {items}
        value={selected}
        on:select={handleSelect}
        isMulti={true}
        {placeholder}
        isDisabled={disabled}
    />
    {#if selected === null}
        <div
            class="absolute right-2 top-0 bottom-0 flex items-center text-gray"
        >
            <SearchIcon size="18" />
        </div>
    {/if}
</div>

<style>
    .wrapper {
        --border: theme("borderWidth.DEFAULT") solid theme("colors.gray.light");
        --borderFocusColor: theme("colors.primary.DEFAULT");
        --borderRadius: theme("borderRadius.lg");
        --multiItemBG: theme("colors.primary.DEFAULT");
        --multiItemActiveBG: theme("colors.primary.DEFAULT");
        --multiItemActiveColor: theme("colors.white");
        --multiItemPadding: 0 8px;
        --placeholderColor: theme("colors.gray.bitdark");
        --itemColor: theme("colors.primary.DEFAULT");
        --multiItemBorderRadius: theme("borderRadius.lg");
        --multiItemMargin: 0.25rem 0.25rem 0.25rem 0;
        --itemHoverBG: theme("colors.primary.lightest");
        --itemHoverColor: theme("colors.primary.DEFAULT");
        --itemIsActiveBG: theme("colors.primary.DEFAULT");
        --itemActiveBackground: theme("colors.primary.DEFAULT");
        --inputPadding: theme("padding.2") theme("padding.2");
        --multiSelectPadding: theme("padding.0") theme("padding.2");
        --inputFontSize: theme("fontSize.base");
        --inputLeft: theme("spacing.1");
        @apply text-white;
        @apply font-bold;
    }

    .wrapper :global(input) {
        max-width: 5rem;
    }

    .wrapper :global(.selectContainer) {
        row-gap: 4px;

        @apply pr-10;
    }

    .wrapper :global(.selectContainer.focused) {
        box-shadow: 0 0 0 calc(0px + theme("ringOffsetWidth.1"))
            theme("colors.primary.DEFAULT");
    }

    .wrapper :global(.selectContainer input) {
        @apply cursor-text;
        @apply font-secondary;

        min-width: 152px;
    }

    .wrapper :global(.selectContainer.disabled),
    .wrapper :global(.selectContainer.disabled input) {
        @apply cursor-not-allowed;
    }

    .wrapper :global(.selectContainer .multiSelectItem) {
        @apply self-center;
        @apply font-secondary;
    }

    .wrapper.hideInput :global(.selectContainer .multiSelectItem + input) {
        max-width: 1.5rem;
        min-width: inherit;
    }

    .wrapper.hideInput
        :global(.selectContainer .multiSelectItem + .multiSelectItem + input) {
        display: none;
    }

    .wrapper:not(.hideInput)
        :global(.selectContainer .multiSelectItem + input) {
        border-left: 2px solid theme("colors.primary.DEFAULT");
        min-width: 3rem;

        @apply pl-2;
        @apply rounded-none;
        @apply relative;
    }

    .wrapper.hasItems:not(.hideInput)
        :global(.multiSelect:not(.focused)::before) {
        animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s
            infinite;
        background: theme("colors.primary.DEFAULT");
        border-radius: 50%;
        content: "";
        position: absolute;
        right: 3.65rem;
        top: 16px;
        width: 10px;
        height: 10px;
    }

    .wrapper.hasItems:not(.hideInput)
        :global(.multiSelect:not(.focused)::after) {
        background: theme("colors.primary.DEFAULT");
        animation: pulse-ring 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s
            infinite;
        border-radius: 50%;
        content: "";
        position: absolute;
        right: 3rem;
        top: 6px;
        width: 30px;
        height: 30px;
    }

    .wrapper :global(.selectContainer.focused input),
    .wrapper :global(.selectContainer input:focus) {
        box-shadow: none !important;
    }

    .wrapper :global(.selectContainer .multiSelectItem .multiSelectItem_clear),
    .wrapper :global(.selectContainer .clearSelect),
    .wrapper :global(.listContainer .listItem),
    .wrapper :global(.listContainer .listItem .item) {
        @apply cursor-pointer;
        @apply font-secondary;
    }

    @keyframes pulse-ring {
        0% {
            transform: scale(0.33);
        }
        80%,
        100% {
            opacity: 0;
        }
    }

    @keyframes pulse-dot {
        0% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(0.8);
        }
    }
</style>
