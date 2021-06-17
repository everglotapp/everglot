<script lang="ts">
    import { scale } from "svelte/transition"
    export let url: string
</script>

<div class="message-preview" in:scale|local={{ duration: 200, delay: 200 }}>
    <img
        src={url}
        height="256"
        alt="Preview"
        role="presentation"
        class="cursor-pointer"
        on:click
        on:load
    />
</div>

<style>
    .message-preview {
        padding-left: 4.5rem;

        @apply mb-3;
    }

    .message-preview img {
        max-height: 256px;
    }
</style>
