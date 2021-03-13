<script lang="ts">
    import { onMount } from "svelte"
    import { scale } from "svelte/transition"
    import MainNav from "../comp/layout/MainNav.svelte"
    import Footer from "../comp/layout/Footer.svelte"

    export let segment: string | undefined
    const FULLSCREEN_SEGMENTS = ["chat"]
    const SHOWNAV_SEGMENTS = ["login", "join"]

    const timeout = 150
    let transitionTriggeringSwitch = true

    const change = () => {
        transitionTriggeringSwitch = !transitionTriggeringSwitch
    }

    // @ts-ignore (left side of comma operator isn't ignored by svelte)
    $: segment, change()
    $: fullscreen = segment ? FULLSCREEN_SEGMENTS.includes(segment) : false
    $: showNav = segment ? SHOWNAV_SEGMENTS.includes(segment) : true

    onMount(() => {
        segment = window.location.pathname.split("/")[1]
    })
</script>

{#if showNav}
    <MainNav {segment} />
{/if}

{#if transitionTriggeringSwitch}
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
