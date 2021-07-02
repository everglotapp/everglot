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

<div class="wrapper inline-flex relative" class:hideInput>
    <Select
        {items}
        selectedValue={selected}
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
        --placeholderColor: theme("colors.gray.bitdark");
        --itemColor: theme("colors.primary.DEFAULT");
        --multiItemBorderRadius: theme("borderRadius.lg");
        --multiItemMargin: 0 0.25rem 0 0;
        --itemHoverBG: theme("colors.primary.lightest");
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
        @apply pr-4;
    }

    .wrapper :global(.selectContainer.focused) {
        box-shadow: 0 0 0 calc(0px + theme("ringOffsetWidth.1"))
            theme("colors.primary.DEFAULT");
    }

    .wrapper :global(.selectContainer input) {
        @apply cursor-text;
        @apply font-secondary;
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
    }

    .wrapper:not(.hideInput)
        :global(.selectContainer .multiSelectItem + input) {
        border-left: 2px solid theme("colors.primary.DEFAULT");
        @apply rounded-none pl-2;
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
</style>
