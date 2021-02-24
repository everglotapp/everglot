<script lang="ts">
    import { createEventDispatcher } from "svelte"
    import Select from "svelte-select"

    export let items: any[]
    export let selectedValue: any[]

    const dispatch = createEventDispatcher()

    function handleSelect(event: CustomEvent) {
        dispatch("select", event.detail)
    }
</script>

<div class="wrapper inline-flex">
    <Select {items} {selectedValue} on:select={handleSelect} isMulti={true} />
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
        --itemHoverBG: theme("colors.primary.lightest");
        --itemIsActiveBG: theme("colors.primary.DEFAULT");
        --itemActiveBackground: theme("colors.primary.DEFAULT");
        --inputPadding: theme("padding.3") theme("padding.10");
        @apply text-white font-bold;
    }

    .wrapper:focus {
        --border: theme("borderWidth.DEFAULT") solid
            theme("colors.primary.DEFAULT");
    }
</style>
