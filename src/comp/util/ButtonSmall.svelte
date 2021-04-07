<script context="module" lang="ts">
    export type Variant = "FILLED" | "OUTLINED" | "TEXT"
    export type Color = "PRIMARY" | "SECONDARY"
    const CLASSES: Record<Variant, Record<Color, string>> = {
        FILLED: {
            PRIMARY:
                "border border-primary bg-primary hover:bg-primary-bitlight text-white shadow-md focus:border-primary-light focus:bg-primary-light focus:ring-primary-dark",
            SECONDARY:
                "border border-primary bg-primary hover:bg-primary-bitlight text-white shadow-md focus:border-primary-light focus:bg-primary-light focus:ring-primary-dark",
        },
        OUTLINED: {
            PRIMARY:
                "border hover:bg-gray-lightest text-primary focus:border-white focus:bg-white focus:ring-white",
            SECONDARY:
                "border bg-transparent border-transparent hover:bg-gray-lightest text-gray-200 focus:text-primary focus:border-white focus:bg-white focus:ring-primary focus:border-primary hover:text-primary sm:bg-transparent sm:border-gray-400 sm:text-gray-200 sm:hover:text-primary sm:focus:text-primary",
        },
        TEXT: {
            PRIMARY:
                "border border-transparent hover:bg-gray-lightest text-primary focus:bg-white focus:border-primary",
            SECONDARY:
                "border border-transparent hover:bg-gray-lightest text-gray-bitdark focus:bg-white focus:border-bitdark",
        },
    }
</script>

<script lang="ts">
    export let variant: Variant = "FILLED"
    export let color: Color = "PRIMARY"
    export let tag: "a" | "button" = "a"
    export let href: string = ""
    export let type: string = "button"
    export let disabled: boolean = false
    $: computedClasses = CLASSES[variant][color]
    export let className: string = ""
</script>

{#if tag === "button"}
    <button
        class={`${computedClasses} ${className}`}
        {type}
        disabled={disabled ? true : undefined}
        on:click|preventDefault
    >
        <slot />
    </button>
{:else if tag === "a"}
    <a
        class={`${computedClasses} ${className}`}
        {href}
        disabled={disabled ? true : undefined}
        on:click
    >
        <slot />
    </a>
{/if}

<style>
    @layer components {
        button,
        a {
            @apply py-2 px-4 inline-flex rounded-xl font-bold cursor-pointer transition-colors;
        }

        button:focus,
        a:focus {
            @apply ring-primary border-primary;
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
