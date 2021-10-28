<script lang="ts">
    import { scale, fade } from "svelte/transition"
</script>

<div
    class="wrapper fixed left-0 top-0 right-0 bottom-0 z-20 flex items-center justify-center"
    out:fade={{ duration: 100 }}
>
    <div
        class="inner relative px-2 py-2 mx-2"
        in:scale={{ duration: 100 }}
        out:scale={{ duration: 100 }}
    >
        <slot />
    </div>
</div>

<style>
    .wrapper {
        background: rgba(0, 0, 0, 0.4);
        height: 100vh;
        width: 100vw;
    }

    .inner {
        max-width: 100vw;
    }
</style>
