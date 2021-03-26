<script lang="ts">
    export let username = ""
    export let url = ""
    export let size = 50

    $: initial = username.charAt(0)
</script>

<div
    class="wrapper"
    on:click
    tabindex="0"
    style={`width: ${size}px; height: ${size}px;`}
>
    {#if url.startsWith("https://")}
        <img
            src={url}
            alt={initial}
            role="presentation"
            aria-label={`Avatar of ${username}`}
            style={`width: ${size}px; max-height: ${size}px;`}
        />
    {:else}
        <span class="initial" role="presentation">
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
        @apply bg-gray-light;
        @apply shadow-md;
        @apply cursor-pointer;
        @apply overflow-hidden;
        @apply text-gray-dark;
        @apply font-bold;
    }

    .initial {
        height: 1.625rem;
    }
</style>
