<script context="module" lang="ts">
    export type Variant = "FILLED" | "OUTLINED" | "TEXT"
    export type Color = "PRIMARY" | "SECONDARY"
    const CLASSES: Record<Variant, Record<Color, string>> = {
        FILLED: {
            PRIMARY:
                "border border-primary bg-primary hover:bg-primary-bitlight text-white shadow-md focus:border-primary-light focus:bg-primary-light focus:ring-primary-dark",
            SECONDARY:
                "border border-gray-lightest bg-gray-lightest hover:bg-gray-light hover:border-gray-light text-gray-bitdark shadow-md focus:border-gray focus:bg-gray focus:ring-gray-dark focus:border-gray",
        },
        OUTLINED: {
            PRIMARY:
                "border hover:bg-gray-lightest text-primary focus:border-white focus:bg-white focus:ring-white",
            SECONDARY:
                "border bg-transparent border-gray-lightest text-gray-bitdark hover:bg-gray-lightest hover:border-gray-dark hover:text-gray-dark focus:bg-white focus:ring-primary focus:border-primary sm:bg-transparent sm:border-gray-light sm:text-gray-bitdark sm:focus:text-black",
        },
        TEXT: {
            PRIMARY:
                "border border-transparent hover:bg-gray-lightest text-primary focus:bg-white focus:border-primary",
            SECONDARY:
                "border border-transparent hover:bg-gray-lightest text-gray-bitdark focus:text-black focus:border-white focus:bg-white focus:ring-primary focus:border-primary hover:text-black sm:bg-transparent sm:text-gray-bitdark sm:hover:text-black sm:focus:text-black",
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
    {#if type === "submit"}
        <button
            class={`${computedClasses} ${className}`}
            {type}
            disabled={disabled ? true : undefined}
            on:click
        >
            <slot />
        </button>
    {:else}
        <button
            class={`${computedClasses} ${className}`}
            {type}
            disabled={disabled ? true : undefined}
            on:click|preventDefault
        >
            <slot />
        </button>
    {/if}
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
            @apply py-3;
            @apply px-10;
            @apply inline-flex;
            @apply rounded-xl;
            @apply font-bold;
            @apply font-secondary;
            @apply cursor-pointer;
            @apply transition-colors;
            @apply items-center;
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
