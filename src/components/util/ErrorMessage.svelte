<script>
    import { scale } from "svelte/transition"
</script>

<div
    in:scale={{ duration: 100, delay: 250 }}
    out:scale={{ duration: 150 }}
    class="wrapper px-8 py-4 bg-red-200 text-gray-dark font-bold rounded-md"
>
    <slot />
</div>

<style>
    .wrapper {
        height: min-content;
    }
</style>
