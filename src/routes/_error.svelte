<script lang="ts">
    import PageTitle from "../components/typography/PageTitle.svelte"
    import ErrorMessage from "../components/util/ErrorMessage.svelte"
    export let status: number
    export let error: Error

    const dev = process.env.NODE_ENV === "development"
</script>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<div class="container px-4 mx-auto mt-16 mb-32 max-w-sm">
    <PageTitle>{status}</PageTitle>

    <ErrorMessage
        >{typeof error.message === "undefined"
            ? error.message
            : "Something's not working. Maybe try refreshing?"}</ErrorMessage
    >

    {#if dev && error.stack}
        <pre>{error.stack}</pre>
    {/if}
</div>
