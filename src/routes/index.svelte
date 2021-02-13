<script lang="ts">
    import { goto } from "@sapper/app"
    import { username } from "../stores"

    import ButtonLarge from "../comp/util/ButtonLarge.svelte"

    import { ArrowRightIcon } from "svelte-feather-icons"

    function setUsername() {
        if (document.forms["set-username"].reportValidity()) {
            goto("/chat")
        }
    }
</script>

<svelte:head>
    <title>Everglot – Language Community</title>
</svelte:head>

<div class="container max-w-md py-24">
    <form
        name="set-username"
        action="/chat"
        class="bg-primary-lightest py-10 px-16"
        on:submit|preventDefault={setUsername}
    >
        <div class="form-control">
            <label for="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter username..."
                required
                bind:value={$username}
            />
        </div>
        <ButtonLarge
            tag="button"
            className="w-full justify-center"
            on:click={setUsername}
            >Next<ArrowRightIcon size="20" class="ml-2" /></ButtonLarge
        >
    </form>
</div>

<style>
    label {
        @apply flex font-bold text-gray-bitdark text-sm mb-1;
    }
    input {
        @apply shadow-md rounded-md px-4 py-3 mb-3 w-full border-none;
    }
</style>
