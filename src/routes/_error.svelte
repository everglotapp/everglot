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
    p {
        margin: 1em auto;
    }
</style>
