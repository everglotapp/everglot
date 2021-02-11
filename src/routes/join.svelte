<script lang="ts">
    import PageTitle from "../comp/typography/PageTitle.svelte"
    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    let submitted = false
    const handleSubmit = (_event: Event) => {
        submitted = true
    }
    let email = ""
    let password = ""
</script>

<svelte:head>
    <title>Join – Everglot</title>
</svelte:head>

<div class="container px-4 mx-auto my-16 max-w-sm">
    <PageTitle>Join Everglot</PageTitle>

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
            >Create a new account</button
        >
        <ButtonLarge
            href="login"
            variant="TEXT"
            className="w-full justify-center"
            >I already have an account</ButtonLarge
        >
        <div
            class="py-4 font-bold my-8 px-8 bg-primary-lightest {submitted
                ? ''
                : 'hidden'}"
        >
            Sorry, signup will be available soon!
        </div>
    </form>
</div>

<style>
    label {
        @apply flex;
        @apply tracking-wide;
        @apply text-gray-bitdark;
        @apply text-sm;
        @apply mb-1;
        @apply pl-1;
    }
    input {
        @apply flex;
        @apply rounded-xl;
        @apply border-gray-300;
        @apply text-gray-600;
        @apply py-2;
        @apply px-3;
        @apply leading-relaxed;
        @apply focus:border-gray-300;
    }
    input:focus {
        @apply ring-2;
        @apply ring-gray-200;
        @apply ring-opacity-50;
    }
    input[type="email"]::placeholder {
        @apply text-gray-bitlight;
    }
</style>
