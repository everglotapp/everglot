<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import Select from "svelte-select"

    export let items: any[]
    export let selected: any[] | null
    export let placeholder: string = "Other …"

    const dispatch = createEventDispatcher()

    function handleSelect(event: CustomEvent) {
        dispatch("select", event.detail)
    }
</script>

<div class="wrapper inline-flex">
    <Select
        {items}
        selectedValue={selected}
        on:select={handleSelect}
        isMulti={true}
        {placeholder}
    />
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
        --itemHoverBG: theme("colors.primary.lightest");
        --itemIsActiveBG: theme("colors.primary.DEFAULT");
        --itemActiveBackground: theme("colors.primary.DEFAULT");
        --inputPadding: theme("padding.2") theme("padding.2");
        --multiSelectPadding: theme("padding.0") theme("padding.2");
        --inputFontSize: theme("fontSize.base");
        --inputLeft: theme("spacing.1");
        @apply text-white font-bold;
    }

    .wrapper :global(input) {
        max-width: 5rem;
    }

    .wrapper :global(.selectContainer.focused) {
        box-shadow: 0 0 0 calc(0px + theme("ringOffsetWidth.1"))
            theme("colors.primary.DEFAULT");
    }

    .wrapper :global(.selectContainer input) {
        @apply cursor-text;
    }

    .wrapper :global(.selectContainer.focused input) {
        @apply shadow-none;
    }

    .wrapper :global(.selectContainer .multiSelectItem .multiSelectItem_clear),
    .wrapper :global(.listContainer .listItem),
    .wrapper :global(.listContainer .listItem .item) {
        @apply cursor-pointer;
    }
</style>
