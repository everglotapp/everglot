<script lang="ts">
    export let username: string = ""
    export let url: string = ""
    export let size: number = 50
    export let showShadow: boolean = true
    export let id: string | undefined = undefined

    $: initial = username.charAt(0)
    $: showImage = url?.startsWith("https://") || url?.startsWith("/")
</script>

<div
    {id}
    class={`wrapper ${showImage ? "image" : "initial"}${
        showShadow ? " shadow-md" : ""
    }`}
    on:click
    tabindex="0"
    style={`width: ${size}px; height: ${size}px;`}
>
    {#if showImage}
        <img
            src={url}
            alt={initial}
            role="presentation"
            aria-label={`Avatar of ${username}`}
            style={`max-height: ${size}px;`}
        />
    {:else}
        <span role="presentation">
            {initial}
        </span>
    {/if}
</div>

<style>
    .wrapper {
        border-radius: 50%;

        @apply flex;
        @apply justify-center;
        @apply items-center;
        @apply overflow-hidden;
    }

    .wrapper.initial {
        @apply text-gray-dark;
        @apply font-bold;
        @apply bg-gray-light;
    }

    .initial span {
        height: 1.625rem;
    }
</style>
