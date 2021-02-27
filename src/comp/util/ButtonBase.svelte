<script lang="ts">
    import clsx from "clsx"

    export let tag: "a" | "button" = "a"
    export let href: string = ""
    export let type: string = "button"
    export let disabled: boolean = false
    const baseClasses = [
        "inline-flex",
        "rounded-xl",
        "font-bold",
        "cursor-pointer",
        "transition-colors",
    ]
    export let className: string = ""
    $: computedClass = clsx(baseClasses, className.split(" ").filter(Boolean))
</script>

{#if tag === "button"}
    <button
        class={computedClass}
        {type}
        disabled={disabled ? true : undefined}
        on:click|preventDefault
    >
        <slot />
    </button>
{:else if tag === "a"}
    <a class={computedClass} {href} disabled={disabled ? true : undefined}>
        <slot />
    </a>
{/if}
