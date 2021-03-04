<script lang="ts">
    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    let submitting = false
    const handleSubmit = (_event: Event) => {
        if (submitting) {
            return
        }
        submitting = true
        submitting = false
    }
    let email = ""
    let password = ""
</script>

<svelte:head>
    <title>Login – Everglot</title>
</svelte:head>

<div class="container px-4 mx-auto mt-16 mb-32 max-w-sm">
    <PageTitle>Login to Everglot</PageTitle>

    <form
        on:submit|preventDefault={handleSubmit}
        method="post"
        class="bg-white my-8"
    >
        <div class="flex flex-col w-full mb-2">
            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                bind:value={email}
                placeholder="jane.doe@example.com"
            />
        </div>
        <div class="flex flex-col w-full mb-2">
            <label for="password">Password</label>
            <input id="password" type="password" bind:value={password} />
        </div>
        <button
            type="submit"
            class="mt-5 py-3 px-10 w-full mb-1 bg-primary hover:bg-primary-bitlight text-white rounded-xl font-bold"
            >Login</button
        >
        <ButtonLarge
            href="join"
            variant="OUTLINED"
            className="w-full justify-center"
            >I don't have an account</ButtonLarge
        >
        <div
            class="py-4 font-bold my-8 px-8 bg-primary-lightest"
            class:hidden={!submitting}
        >
            Sorry, login will be available soon!
        </div>
    </form>
</div>
