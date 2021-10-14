<script context="module" lang="ts">
    const DEFAULT_BACKGROUND_COLOR = "#e0e6ed" as const
    const BACKGROUND_COLORS = [
        "#CEE5D0",
        "#F3F0D7",
        "#FFBCBC",
        "#F0D9FF",
        "#DEEDF0",
        "#EFF8FF",
        "#E5EDB7",
        "#F8E2CF",
    ] as const
    async function calculateBackgroundColor(uuid: string): Promise<string> {
        if (
            typeof window === "undefined" ||
            !window.crypto ||
            !window.crypto.subtle
        ) {
            return DEFAULT_BACKGROUND_COLOR
        }
        const msgUint8 = new TextEncoder().encode(uuid)
        let idx: number | undefined
        try {
            const hashBuffer = await crypto.subtle.digest("sha256", msgUint8)
            const hashArray = Array.from(
                new Uint8Array(hashBuffer.slice(31, 1))
            )
            idx = Math.abs(hashArray[0] % BACKGROUND_COLORS.length)
        } catch {
            idx = Math.abs(fallbackHash(uuid) % BACKGROUND_COLORS.length)
        }
        return BACKGROUND_COLORS[idx].toLowerCase()
    }
    /**
     * Source: https://stackoverflow.com/a/8831937/9926795
     */
    function fallbackHash(msg: string): number {
        let hash: number = 0
        for (let i = 0; i < msg.length; ++i) {
            const char = msg.charCodeAt(i)
            hash = (hash << 5) - hash + char
            hash = hash & hash // Convert to 32bit integer
        }
        return hash
    }
</script>

<script lang="ts">
    export let uuid: string | null | undefined = ""
    export let username: string = ""
    export let url: string = ""
    export let size: number = 50
    export let showShadow: boolean = true
    export let id: string | undefined = undefined

    $: initial = username.charAt(0)
    $: showImage = url?.startsWith("https://") || url?.startsWith("/")
    let backgroundColor: string = DEFAULT_BACKGROUND_COLOR
    $: if (uuid) {
        calculateBackgroundColor(uuid).then(
            (color) => (backgroundColor = color)
        )
    }
</script>

<div
    {id}
    class={`wrapper ${showImage ? "image" : "initial"}${
        showShadow ? " shadow-md" : ""
    }`}
    on:click
    tabindex="0"
    style={`width: ${size}px; height: ${size}px; background-color: ${backgroundColor};`}
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
