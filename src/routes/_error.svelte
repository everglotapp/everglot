<script lang="ts">
    import PageTitle from "../comp/typography/PageTitle.svelte"
    export let status: number
    export let error: Error

    const dev = process.env.NODE_ENV === "development"
</script>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<div class="container px-4 mx-auto mt-16 mb-32 max-w-sm">
    <PageTitle>{status}</PageTitle>

    <p>{error.message}</p>

    {#if dev && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</div>

<style>
    h1,
    p {
        margin: 0 auto;
    }

    h1 {
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    p {
        margin: 1em auto;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>
