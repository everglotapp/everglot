<script lang="ts">
    export let username = ""
    export let url = ""
</script>

<div class="wrapper" on:click on:keydown tabindex="0">
    {#if url.startsWith("https://")}
        <img src={url} alt={username} role="presentation" />
    {:else}
        <span class="initial" role="presentation">{username.charAt(0)}</span>
    {/if}
</div>

<style>
    .wrapper {
        width: 50px;
        height: 50px;
        border-radius: 50%;

        @apply flex;
        @apply justify-center;
        @apply items-center;
        @apply bg-gray-light;
        @apply shadow-md;
        @apply cursor-pointer;
        @apply overflow-hidden;
    }

    .wrapper > img {
        width: 50px;
        max-height: 50px;
    }

    .wrapper > .initial {
        height: 1.625rem;
    }
</style>
