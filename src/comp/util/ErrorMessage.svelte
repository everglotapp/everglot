<script>
    import { scale } from "svelte/transition"
</script>

<div
    in:scale={{ duration: 150, delay: 150 }}
    out:scale={{ duration: 150 }}
    class="px-8 py-4 bg-red-200 text-gray-dark font-bold rounded-md"
>
    <slot />
</div>
