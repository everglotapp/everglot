<script context="module" lang="ts">
    export type Variant = "FILLED" | "OUTLINED" | "TEXT"
    export type Color = "PRIMARY" | "SECONDARY"
    const CLASSES: Record<Variant, Record<Color, string>> = {
        FILLED: {
            PRIMARY:
                "border border-primary bg-primary hover:bg-primary-bitlight text-white shadow-md focus:border-primary-light focus:bg-primary-light focus:ring-primary-dark cursor-pointer",
            SECONDARY:
                "border border-primary bg-primary hover:bg-primary-bitlight text-white shadow-md focus:border-primary-light focus:bg-primary-light focus:ring-primary-dark cursor-pointer",
        },
        OUTLINED: {
            PRIMARY:
                "border hover:bg-gray-lightest text-primary focus:border-white focus:bg-white focus:ring-white cursor-pointer",
            SECONDARY:
                "border bg-transparent border-transparent hover:bg-gray-lightest text-gray-bitdark focus:text-primary focus:border-white focus:bg-white focus:ring-primary focus:border-primary hover:text-primary sm:bg-transparent sm:border-gray-400 sm:hover:text-primary sm:focus:text-primary cursor-pointer",
        },
        TEXT: {
            PRIMARY:
                "border border-transparent hover:bg-gray-lightest text-primary focus:bg-white focus:border-primary cursor-pointer",
            SECONDARY:
                "border border-transparent hover:bg-gray-lightest text-gray-bitdark focus:bg-white focus:border-bitdark cursor-pointer",
        },
    }
</script>

<script lang="ts">
    import type { ReferenceAction } from "svelte-popperjs"

    export let id: string | undefined = undefined
    export let variant: Variant = "FILLED"
    export let color: Color = "PRIMARY"
    export let tag: "a" | "button" | "label" = "a"
    export let target: string | undefined = undefined
    export let href: string = ""
    export let type: string = "button"
    export let disabled: boolean = false
    export let forId: string | undefined = undefined
    $: computedClasses = CLASSES[variant][color]
    export let className: string = ""
    export let popperRef: ReferenceAction | undefined = undefined
    export let ariaHidden: boolean = false
    function noop(_node: HTMLElement) {}
    $: popperRefOrNoop = popperRef || noop
</script>

{#if tag === "button"}
    {#if type === "submit"}
        <button
            {id}
            class={`${computedClasses} ${className}`}
            {type}
            disabled={disabled ? true : undefined}
            aria-hidden={ariaHidden}
            use:popperRefOrNoop
            on:click
        >
            <slot />
        </button>
    {:else}
        <button
            {id}
            class={`${computedClasses} ${className}`}
            {type}
            disabled={disabled ? true : undefined}
            use:popperRefOrNoop
            aria-hidden={ariaHidden}
            on:click|preventDefault
        >
            <slot />
        </button>
    {/if}
{:else if tag === "a"}
    <a
        {id}
        class={`${computedClasses} ${className}`}
        {href}
        {target}
        disabled={disabled ? true : undefined}
        aria-hidden={ariaHidden}
        on:click
    >
        <slot />
    </a>
{:else if tag === "label"}
    <label
        {id}
        class={`${computedClasses} ${className}`}
        {type}
        disabled={disabled ? true : undefined}
        use:popperRefOrNoop
        aria-hidden={ariaHidden}
        for={forId}
        on:click
    >
        <slot />
    </label>
{/if}

<style>
    @layer components {
        button,
        a {
            @apply py-1;
            @apply px-4;
            @apply inline-flex;
            @apply rounded-xl;
            @apply font-bold;
            @apply cursor-pointer;
            @apply transition-colors;
            @apply font-secondary;
        }

        button:focus,
        a:focus {
            @apply ring-primary;
            @apply border-primary;
        }

        button:disabled,
        button[disabled],
        a:disabled,
        a[disabled] {
            @apply cursor-not-allowed;
            @apply bg-gray;
            @apply border-gray;
            @apply text-gray-bitdark;
        }
    }
</style>
