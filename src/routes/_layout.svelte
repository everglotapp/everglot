<script lang="ts">
    import { scale } from "svelte/transition"
    import MainNav from "../comp/layout/MainNav.svelte"
    import Footer from "../comp/layout/Footer.svelte"

    export let segment: string | undefined
    const FULLSCREEN_SEGMENTS = ["chat"]

    const timeout = 150
    let show = true

    const change = () => {
        show = !show
    }

    $: segment, change()
    $: fullscreen = segment ? FULLSCREEN_SEGMENTS.includes(segment) : false
</script>

{#if !fullscreen}
    <MainNav {segment} />
{/if}

{#if show}
    <main
        in:scale={{ duration: timeout, delay: timeout }}
        out:scale={{ duration: timeout }}
        class:fullscreen
    >
        <slot />
    </main>
    {#if !fullscreen}
        <Footer />
    {/if}
{:else}
    <main
        in:scale={{ duration: timeout, delay: timeout }}
        out:scale={{ duration: timeout }}
        class:fullscreen
    >
        <slot />
    </main>
    {#if !fullscreen}
        <Footer />
    {/if}
{/if}

<style>
    main {
        position: relative;
        background-color: white;
        box-sizing: border-box;
    }

    main.fullscreen {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
